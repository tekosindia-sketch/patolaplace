'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { generateRoomId, getUserMediaStream, createPeer, writeSignal, listenSignal, writeCandidate, listenCandidates, cleanRoom } from '@/lib/webrtc';

interface VideoCallContextProps {
    roomId: string | null;
    isCalling: boolean;
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    startCall: (isInitiator: boolean) => Promise<void>;
    endCall: () => Promise<void>;
}

const VideoCallContext = createContext<VideoCallContextProps | undefined>(undefined);

export const VideoCallProvider = ({ children }: { children: ReactNode }) => {
    const [roomId, setRoomId] = useState<string | null>(null);
    const [isCalling, setIsCalling] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [peer, setPeer] = useState<any>(null);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

    const startCall = async (isInitiator: boolean) => {
        setIsCalling(true);
        const newRoomId = generateRoomId();
        setRoomId(newRoomId);
        const stream = await getUserMediaStream();
        setLocalStream(stream);
        const p = createPeer(isInitiator, stream);
        setPeer(p);

        p.on('stream', (rStream: MediaStream) => {
            setRemoteStream(rStream);
        });

        // Handle signaling
        p.on('signal', async (data: unknown) => {
            if (isInitiator) {
                await writeSignal(newRoomId, 'offer', data);
            } else {
                await writeSignal(newRoomId, 'answer', data);
            }
        });

        if (!isInitiator) {
            // Listen for offer
            const unsubscribe = listenSignal(newRoomId, 'offer', (offer) => {
                p.signal(offer);
                unsubscribe();
            });
        } else {
            // Listen for answer
            const unsubscribe = listenSignal(newRoomId, 'answer', (answer) => {
                p.signal(answer);
                unsubscribe();
            });
        }

        // ICE candidates
        p.on('icecandidate', async (event: RTCPeerConnectionIceEvent) => {
            if (event.candidate) {
                await writeCandidate(newRoomId, event.candidate);
            }
        });
        const candUnsub = listenCandidates(newRoomId, (candidate) => {
            p.addIceCandidate(new RTCIceCandidate(candidate));
        });

        // Cleanup on end
        p.on('close', async () => {
            await cleanRoom(newRoomId);
            setIsCalling(false);
            setRoomId(null);
            setPeer(null);
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            setLocalStream(null);
            setRemoteStream(null);
            candUnsub();
        });
    };

    const endCall = async () => {
        if (peer) {
            peer.destroy();
        }
        if (roomId) {
            await cleanRoom(roomId);
        }
        setIsCalling(false);
        setRoomId(null);
        setPeer(null);
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        setLocalStream(null);
        setRemoteStream(null);
    };

    return (
        <VideoCallContext.Provider value={{ roomId, isCalling, localStream, remoteStream, startCall, endCall }}>
            {children}
        </VideoCallContext.Provider>
    );
};

export const useVideoCall = () => {
    const context = useContext(VideoCallContext);
    if (!context) {
        throw new Error('useVideoCall must be used within a VideoCallProvider');
    }
    return context;
};
