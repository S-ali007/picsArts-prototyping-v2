// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyA-ec5iWV1lI7drrBf9R2yliG_Z__HVvF8",
//   authDomain: "techart-f13ea.firebaseapp.com",
//   projectId: "techart-f13ea",
//   storageBucket: "techart-f13ea.firebasestorage.app",
//   messagingSenderId: "31861485972",
//   appId: "1:31861485972:web:55d793173c7597a82a9f81",
//   measurementId: "G-F95XMDCHWP",
// };
const firebaseConfig = {
  apiKey: "AIzaSyB09-xmV1CoY7LqvXV88DatCHDsFAWgoLI",
  authDomain: "genart-1b140.firebaseapp.com",
  projectId: "genart-1b140",
  storageBucket: "genart-1b140.firebasestorage.app",
  messagingSenderId: "389285846949",
  appId: "1:389285846949:web:2723a53206d38a69aed24c",
  measurementId: "G-4TYETWZ75B"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
