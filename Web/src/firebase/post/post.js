import { addDoc, collection } from "firebase/firestore"
import { firestore } from "../firebase"
import toast from "react-hot-toast";

export const setPost = async (userId, caption, selectedImage) => {
    try{
        const postDoc = {
            caption: caption,
            imgUrl: selectedImage,
            likes: 0,
            comments: [],
            createdAt: Date.now(),
            createdBy: userId
        };

        await addDoc(collection(firestore, "posts"), postDoc);
        toast.success("Post created successfully!");
    } catch (error) {
        toast.error(error.message);
    }
}