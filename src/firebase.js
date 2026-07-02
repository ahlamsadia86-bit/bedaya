import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXzlazuwhrtYO4zON5XHoqx2EN6NlqcVo",
  authDomain: "bedaya-9431d.firebaseapp.com",
  projectId: "bedaya-9431d",
  storageBucket: "bedaya-9431d.firebasestorage.app",
  messagingSenderId: "865063978427",
  appId: "1:865063978427:web:662e64c3aaaab581c5309e",
  measurementId: "G-VHF7R3R1T7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);