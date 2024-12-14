import { addDoc, arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
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

export const addCommentToPost = async (postId, userId, commentText) => {
    try {
        // Post belgesine referans oluştur
        const postRef = doc(firestore, "posts", postId);

        const comment = {
            createdBy: userId,
            comment: commentText,
            createdAt: Date.now()
        };

        // Yorum ekleme işlemi
        await updateDoc(postRef, {
            comments: arrayUnion(comment),
        });

        console.log("Comment added successfully!");
    } catch (error) {
        console.error(error.message);
    }
};

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
              likes: [],
              comments: [],
              createdAt: Date.now(),
              createdBy: userId,
            };
      
            await addDoc(collection(firestore, "posts"), postDoc);
            console.log("Post created successfully!");
        } else {
            console.error("Image upload failed!");
        }
    } catch (error) {
        console.error(error.message);
    }
};

export const fetchUserPosts = async (userId) => {
    try {
        const postsCollectionRef = collection(firestore, "posts");
        const q = query(postsCollectionRef, where("createdBy", "==", userId));
        const querySnapshot = await getDocs(q);
    
        const userPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
    
        return userPosts;
    } catch (error) {
        console.error(error.message);
        return [];
    }
};