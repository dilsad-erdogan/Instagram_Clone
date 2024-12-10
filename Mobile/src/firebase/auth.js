import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, firestore } from "./firebaseConfig.js";
import { doc, setDoc } from 'firebase/firestore';

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