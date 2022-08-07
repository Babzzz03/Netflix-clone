
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0oFZsTkOu6DsB_KhhUOGs29FUA9WMj48",
  authDomain: "react-netflix-clone-6ecd2.firebaseapp.com",
  projectId: "react-netflix-clone-6ecd2",
  storageBucket: "react-netflix-clone-6ecd2.appspot.com",
  messagingSenderId: "1015567221549",
  appId: "1:1015567221549:web:e4532307c2f729048409a4",
  measurementId: "G-LHZX8V3MW2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);