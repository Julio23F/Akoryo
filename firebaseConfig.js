// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getReactNativePersistence, initializeAuth} from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore, collection} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKdlXYGmq0FxFp00AGTp08V91-gsIJdjY",
  authDomain: "akory-6806c.firebaseapp.com",
  projectId: "akory-6806c",
  storageBucket: "akory-6806c.firebasestorage.app",
  messagingSenderId: "271731667185",
  appId: "1:271731667185:web:60692d3ab12d43a2d9b950",
  measurementId: "G-2HE190G3SX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");

export const roomRef = collection(db, "rooms");
