import { addDoc, collection, getDocs } from "firebase/firestore"
import { firestore } from "../firebase"
import toast from "react-hot-toast";

export const setPost = async (userId, caption, selectedImage) => {
    try{
        const formData = new FormData();
        formData.append("image", selectedImage.file);

        const response = await fetch("https://api.imgbb.com/1/upload?key=3433368c4b8f4d7437f0e6c766d6659f", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();

        console.log(data);

        if (data.success) {
            const postDoc = {
              caption,
              imgUrl: data.data.url,
              likes: 0,
              comments: [],
              createdAt: Date.now(),
              createdBy: userId,
            };
      
            await addDoc(collection(firestore, "posts"), postDoc);
            toast.success("Post created successfully!");
        } else {
            toast.error("Image upload failed!");
        }
    } catch (error) {
        toast.error(error.message);
    }
}

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
        toast.error(error.message);
    }
};