
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import store from './redux/store';
import { login as loginHandle, logout as logoutHandle } from "./redux/auth";
import toast from 'react-hot-toast';

const firebaseConfig = {
  apiKey: "AIzaSyDXFue_j7r9zA1orXi-q7aDZlxiQtubkQI",
  authDomain: "instagram-clone-e68fa.firebaseapp.com",
  projectId: "instagram-clone-e68fa",
  storageBucket: "instagram-clone-e68fa.firebasestorage.app",
  messagingSenderId: "110389052041",
  appId: "1:110389052041:web:1a8cf2fddf1a684aaebc58",
  measurementId: "G-6EJLNKSSZ9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const register = async (email, password) => {
  try{
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    if(user) {
      toast.success('You have successfully registered!');
    }
    return user;
  } catch (error) {
    toast.error(error.message);
  }
}

export const login = async (email, password) => {
  try{
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toast.error(error.message);
  }
}

export const loginWithGoogle = async () => {
  try{
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    return user;
  } catch (error) {
    toast.error(error.message);
  }
}

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

export default app;