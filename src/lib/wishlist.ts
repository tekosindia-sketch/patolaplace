import { db, auth } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const addToWishlist = async (productId: string) => {
    const user = auth.currentUser;

    if (!user) {
        alert("Please login first");
        return;
    }

    try {
        await addDoc(collection(db, "wishlist"), {
            userId: user.uid,
            productId: productId,
            createdAt: serverTimestamp(),
        });

        console.log("Added to wishlist");
    } catch (error) {
        console.error(error);
    }
};