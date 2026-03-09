import React from 'react';
import { useVideoCall } from '@/context/VideoCallContext';
import styles from './CallButton.module.css';

export default function CallButton() {
    const { startCall, isCalling } = useVideoCall();

    if (isCalling) {
        return null; // Don't show button if already in a call
    }

    return (
        <button
            className={styles.callButton}
            onClick={() => startCall(true)}
            aria-label="Start Live Video Shopping"
        >
            <div className={styles.pulseRing}></div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 7l-7 5 7 5V7z"></path>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
            <span>Live Video Assistance</span>
        </button>
    );
}
