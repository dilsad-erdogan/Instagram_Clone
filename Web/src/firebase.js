
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import store from './redux/store';
import { login as loginHandle, logout as logoutHandle } from "./redux/auth";
import toast from 'react-hot-toast';
import { VITE_API_KEY, VITE_APP_ID, VITE_AUTH_DOMAIN, VITE_MEASUREMENT_ID, VITE_MESSAGING_SENDER_ID, VITE_PROJECT_ID, VITE_STORAGE_BUCKET } from "./configData";

const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID,
  measurementId: VITE_MEASUREMENT_ID
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