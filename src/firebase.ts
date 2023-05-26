import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCINlIxG9pYhXZ8dUuHJBM7xUd_Y0wkIBk",
  authDomain: "messanger-app-91b5b.firebaseapp.com",
  projectId: "messanger-app-91b5b",
  storageBucket: "messanger-app-91b5b.appspot.com",
  messagingSenderId: "185921757658",
  appId: "1:185921757658:web:7e61fd3087e540186c60e3",
  measurementId: "G-LZBNEDJ9V0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)