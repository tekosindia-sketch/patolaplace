import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth"; // Fixed import name
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAxayhfRp_xRRNGkVA5gm2ACP9QKuVbsV8",
    authDomain: "patolaplace-de35c.firebaseapp.com",
    projectId: "patolaplace-de35c",
    storageBucket: "patolaplace-de35c.firebasestorage.app",
    messagingSenderId: "10014306328",
    appId: "1:10014306328:web:064c34fe548de2076a136d",
};

// ✅ app init safe
const app = !getApps().length
    ? initializeApp(firebaseConfig)
    : getApp();

// ✅ All exports are here
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);

// Fixed function name and implementation
export async function ensureAnonymousAuth() {
    if (!auth.currentUser) {
        try {
            await signInAnonymously(auth); // Fixed: using signInAnonymously with auth parameter
            console.log("Anonymous login success");
        } catch (err) {
            console.error("Anonymous login failed", err);
        }
    }
}

export default app;