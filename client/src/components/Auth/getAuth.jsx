import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRGor1dOfIO1TnFqZnGBKhMVPM1ytqLGI",
    authDomain: "chat-room-v1-e3a65.firebaseapp.com",
    projectId: "chat-room-v1-e3a65",
    storageBucket: "chat-room-v1-e3a65.appspot.com",
    messagingSenderId: "599244428915",
    appId: "1:599244428915:web:ea8aa5f8526665a6257c06",
    measurementId: "G-BYE8TNYB7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
export const db = getFirestore(app);
export default app;

