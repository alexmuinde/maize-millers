
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "maize-miller.firebaseapp.com",
  projectId: "maize-miller",
  storageBucket: "maize-miller.appspot.com",
  messagingSenderId: "237175258057",
  appId: "1:237175258057:web:c89cd665305eec3a8ac618"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);