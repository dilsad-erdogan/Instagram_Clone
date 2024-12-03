import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { auth, firestore } from "../firebase.js";
import store from '../../redux/store';
import { login as loginHandle, logout as logoutHandle } from "../../redux/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const login = async (email, password) => {
  try{
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toast.error(error.message);
  }
}

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    if (user) {
      const userDocRef = doc(firestore, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        const newUserDoc = {
          uid: user.uid,
          email: user.email,
          name: user.displayName || "Anonymous",
          bio: "",
          profilePicUrl: user.photoURL || "",
          followers: [],
          following: [],
          createdAt: Date.now(),
        };

        await setDoc(userDocRef, newUserDoc);
        console.log("Yeni kullanıcı eklendi:", newUserDoc);
      } else {
        console.log("Kullanıcı zaten mevcut:", userDocSnap.data());
      }
    }

    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(loginHandle(user));
  } else {
    store.dispatch(logoutHandle());
  }
});

export const logout = async () => {
  await signOut(auth);
  return true;
}