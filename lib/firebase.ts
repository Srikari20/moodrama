import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyT3Qll7rBBGM3AK5TqW5lnaSB6eZb404",
  authDomain: "moodrama-1117d.firebaseapp.com",
  projectId: "moodrama-1117d",
  storageBucket: "moodrama-1117d.firebasestorage.app",
  messagingSenderId: "896934672177",
  appId: "1:896934672177:web:cc422fb2c02c17f2426210",
  measurementId: "G-H4B5FQMYE9",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);