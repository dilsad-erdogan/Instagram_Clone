
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { VITE_API_KEY, VITE_APP_ID, VITE_AUTH_DOMAIN, VITE_MEASUREMENT_ID, VITE_MESSAGING_SENDER_ID, VITE_PROJECT_ID, VITE_STORAGE_BUCKET } from "../configData";

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
const firestore = getFirestore(app);
const auth = getAuth();

export { auth, app, firestore };