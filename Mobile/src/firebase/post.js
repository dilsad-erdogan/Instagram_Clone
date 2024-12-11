import { collection, getDocs } from "firebase/firestore";
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