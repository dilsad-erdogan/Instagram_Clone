import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDXFue_j7r9zA1orXi-q7aDZlxiQtubkQI',
  authDomain: 'instagram-clone-e68fa.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'instagram-clone-e68fa',
  storageBucket: 'instagram-clone-e68fa.firebasestorage.app',
  messagingSenderId: '110389052041',
  appId: '1:110389052041:web:1a8cf2fddf1a684aaebc58',
  measurementId: 'G-6EJLNKSSZ9',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, app, firestore, storage };