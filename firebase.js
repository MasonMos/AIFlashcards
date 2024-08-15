// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA9XGzBKBxXdNt9eylvTq0r6nfKELt5sI",
  authDomain: "ai-flashcards-c8f53.firebaseapp.com",
  projectId: "ai-flashcards-c8f53",
  storageBucket: "ai-flashcards-c8f53.appspot.com",
  messagingSenderId: "992855292411",
  appId: "1:992855292411:web:9aadc52b6529cf1329f35e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
