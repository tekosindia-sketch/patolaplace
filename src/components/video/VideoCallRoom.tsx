'use client';

import React, { useEffect, useRef } from 'react';
import { useVideoCall } from '@/context/VideoCallContext';
import styles from './VideoCallRoom.module.css';

export default function VideoCallRoom() {
    const { isCalling, localStream, remoteStream, roomId, endCall } = useVideoCall();
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    useEffect(() => {
        if (remoteVideoRef.current && remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    if (!isCalling) {
        return null;
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.header}>
                <div>
                    <h2 className={styles.title}>Live Shopping Assistance</h2>
                    {roomId && <p className={styles.roomId}>Room: {roomId}</p>}
                </div>
            </div>

            <div className={styles.videoContainer}>
                {!remoteStream && (
                    <div className={styles.loading}>
                        <div className={styles.spinner}></div>
                        <p>Connecting to associate...</p>
                    </div>
                )}
                <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className={styles.remoteVideo}
                />
                <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className={styles.localVideo}
                />
            </div>

            <div className={styles.controls}>
                <button className={styles.endButton} onClick={endCall}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path>
                        <line x1="23" y1="1" x2="1" y2="23"></line>
                    </svg>
                    End Call
                </button>
            </div>
        </div>
    );
}
