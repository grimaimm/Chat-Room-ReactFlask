import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

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

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyAe5z16qc9u5bXMlcBmwums3-FQ_lbbVCA",
//     authDomain: "chatroom-v2-f6a15.firebaseapp.com",
//     projectId: "chatroom-v2-f6a15",
//     storageBucket: "chatroom-v2-f6a15.appspot.com",
//     messagingSenderId: "770907871131",
//     appId: "1:770907871131:web:29fc3f7d5d59d6345d733e",
//     measurementId: "G-R7JXVS3CBN"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); // Initialize Firestore

const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
export { auth, googleProvider, db };
export default app;

// Initialize Firebase
// const app = initializeApp(firebaseConfig)

// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// export { auth, googleProvider };
// export const db = getFirestore(app);
// export default app;

export const requestNotificationPermission = () =>
    new Promise((resolve, reject) => {
        Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            resolve(true);
        } else {
            reject('Permission not granted');
        }
        });
    });

export const showNotification = (title, body) => {
    if (Notification.permission === 'granted') {
        new Notification(title, { body });
    }
};
