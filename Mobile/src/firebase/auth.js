import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "./firebaseConfig.js";

export const login = async (email, password) => {
    try{
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (error) {
      toast.error(error.message);
    }
}