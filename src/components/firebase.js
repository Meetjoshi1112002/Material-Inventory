// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyVC0xdSzX2QtMctGMORnRGR5V2C_ez6o",
  authDomain: "uplaodfile-749db.firebaseapp.com",
  projectId: "uplaodfile-749db",
  storageBucket: "uplaodfile-749db.appspot.com",
  messagingSenderId: "1061153642373",
  appId: "1:1061153642373:web:18224ad52e8df9794c16ec",
  measurementId: "G-B4LDGPT40Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage =  getStorage(app);