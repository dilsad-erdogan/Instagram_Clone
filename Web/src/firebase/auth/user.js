import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
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

export const fetchAllUsers = async () => {
    try {
        const usersCollection = collection(firestore, "users");
        const querySnapshot = await getDocs(usersCollection);

        const users = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return users;
    } catch (error) {
        toast.error(error.message);
    }
};

export const followingUser = async (userId, followingId, isUnfollow = false) => {
    try{
        const userRefFollowing = doc(firestore, "users", userId);
        const userRefFollowers = doc(firestore, "users", followingId);

        const userFollowing = { uid: followingId };
        const userFollowers = { uid: userId };

        if (isUnfollow) {
            // Unfollow işlemi
            await updateDoc(userRefFollowing, {
                following: arrayRemove(userFollowing),
            });
            await updateDoc(userRefFollowers, {
                followers: arrayRemove(userFollowers),
            });
            toast.success("Unfollowed!");
        } else {
            // Follow işlemi
            await updateDoc(userRefFollowing, {
                following: arrayUnion(userFollowing),
            });
            await updateDoc(userRefFollowers, {
                followers: arrayUnion(userFollowers),
            });
            toast.success("Following!");
        }
    } catch (error) {
        toast.error(error.message);
    }
};