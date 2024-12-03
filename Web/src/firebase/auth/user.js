import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import toast from "react-hot-toast";

export const fetchUserById = async (userId) => {
    try {
        const userDoc = doc(firestore, "users", userId);
        const userSnapshot = await getDoc(userDoc);
    
        if (userSnapshot.exists()) {
            return { id: userSnapshot.id, ...userSnapshot.data() };
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        toast.error(error.message);
    }
};