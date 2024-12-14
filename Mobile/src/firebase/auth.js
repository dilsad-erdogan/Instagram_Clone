import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, firestore } from "./firebaseConfig.js";
import { arrayRemove, collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

export const login = async (email, password) => {
  try{
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  await signOut(auth);
  return true;
};

export const register = async (name, email, password) => {
  try{
    console.log("register")
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      if(user) {
          console.log('You have successfully registered!');
          
          const userDoc = {
            uid: user.uid,
            email: email,
            name: name,
            bio: "",
            profilePicUrl: "",
            followers: [],
            following: [],
            createdAt: Date.now()
          };
          console.log(userDoc);
          await setDoc(doc(firestore, "users", user.uid), userDoc);
      }
      return user;
  } catch (error) {
      toast.error(error.message);
  }
};

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
    console.error(error.message);
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
      console.log("Unfollowed!");
    } else {
      // Follow işlemi
      await updateDoc(userRefFollowing, {
        following: arrayUnion(userFollowing),
      });
      await updateDoc(userRefFollowers, {
        followers: arrayUnion(userFollowers),
      });
      console.log("Following!");
    }
  } catch (error) {
    console.error(error.message);
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
    console.error(error.message);
  }
};

export const updateUser = async (userId, name, bio, image) => {
  try {
    const formData = new FormData();
    formData.append("image", image.file);

    const response = await fetch(
      "https://api.imgbb.com/1/upload?key=3433368c4b8f4d7437f0e6c766d6659f", {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.success) {
      const userDoc = {
        name: name,
        bio: bio,
        profilePicUrl: data.data.url
      };

      const userRef = doc(firestore, "users", userId);
      await updateDoc(userRef, userDoc);
      console.log("Profile updated successfully!");
    } else {
      console.error("Image upload failed!");
    }
  } catch (error) {
    console.error("Failed to update profile: " + error.message);
  }
};