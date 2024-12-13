import { arrayRemove, arrayUnion, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "./firebaseConfig";

export const fetchPosts = async () => {
    try {
        const postsCollection = collection(firestore, "posts");
        const querySnapshot = await getDocs(postsCollection);
        const posts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return posts;
    } catch (error) {
        console.error(error.message);
    }
};

export const setLiked = async (postId, userId, isUnLiked = false) => {
    try{
        const postRef = doc(firestore, "posts", postId);
        const userLiked = { uid: userId };

        if(isUnLiked) {
            // Unliked işlemi
            await updateDoc(postRef, {
                likes: arrayRemove(userLiked),
            });
            console.log("Unliked!");
        } else {
            // Liked işlemi
            await updateDoc(postRef, {
                likes: arrayUnion(userLiked),
            });
            console.log("Liked!");
        }
    } catch (error) {
        console.error(error.message);
    }
};