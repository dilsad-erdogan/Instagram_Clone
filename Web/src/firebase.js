
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "firebase/auth";

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
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user;
}

export const login = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

export const logout = async () => {
  await signOut(auth);
  return true;
}

export default app;