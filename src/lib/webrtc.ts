import SimplePeer from 'simple-peer';
import { rtdb } from '@/lib/firebase';
import { ref, set, onValue, remove } from 'firebase/database';

/**
 * Generate a unique room ID. Simple implementation using timestamp and random.
 */
export const generateRoomId = (): string => {
    return `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get user media (camera + audio).
 */
export const getUserMediaStream = async (): Promise<MediaStream> => {
    return await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
};

/**
 * Create a SimplePeer instance.
 * @param initiator - true if this peer initiates the connection.
 * @param stream - local media stream.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPeer = (initiator: boolean, stream: MediaStream): any => {
    const peer = new SimplePeer({
        initiator,
        trickle: false,
        stream,
        config: {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                // Add TURN servers here if needed.
            ],
        },
    });
    return peer;
};

/**
 * Write signaling data (offer/answer) to Firebase Realtime Database.
 */
export const writeSignal = async (roomId: string, type: 'offer' | 'answer', data: unknown) => {
    const signalRef = ref(rtdb, `calls/${roomId}/${type}`);
    await set(signalRef, data);
};

/**
 * Listen for signaling data from Firebase.
 */
export const listenSignal = (roomId: string, type: 'offer' | 'answer', callback: (data: unknown) => void) => {
    const signalRef = ref(rtdb, `calls/${roomId}/${type}`);
    const unsubscribe = onValue(signalRef, (snapshot) => {
        const val = snapshot.val();
        if (val) callback(val);
    });
    return unsubscribe;
};

/**
 * Write ICE candidate to Firebase.
 */
export const writeCandidate = async (roomId: string, candidate: unknown) => {
    const newKey = `${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    await set(ref(rtdb, `calls/${roomId}/candidates/${newKey}`), candidate);
};

/**
 * Listen for ICE candidates.
 */
export const listenCandidates = (roomId: string, callback: (candidate: RTCIceCandidateInit) => void) => {
    const candidatesRef = ref(rtdb, `calls/${roomId}/candidates`);
    const unsubscribe = onValue(candidatesRef, (snapshot) => {
        const val = snapshot.val();
        if (val) {
            Object.values(val).forEach((c) => callback(c as RTCIceCandidateInit));
        }
    });
    return unsubscribe;
};

/**
 * Clean up Firebase data for a room.
 */
export const cleanRoom = async (roomId: string) => {
    const roomRef = ref(rtdb, `calls/${roomId}`);
    await remove(roomRef);
};
