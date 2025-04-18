import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDKdlXYGmq0FxFp00AGTp08V91-gsIJdjY",
  authDomain: "akory-6806c.firebaseapp.com",
  projectId: "akory-6806c",
  storageBucket: "akory-6806c.firebasestorage.app",
  messagingSenderId: "271731667185",
  appId: "1:271731667185:web:60692d3ab12d43a2d9b950",
  measurementId: "G-2HE190G3SX"
};


// Initialize app
const app = initializeApp(firebaseConfig);

// Auth
let auth;
if (Constants?.platform?.android || Constants?.platform?.ios) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  auth = getAuth(app);
}

// Firestore
const db = getFirestore(app);
const usersRef = collection(db, "users");
const roomRef = collection(db, "rooms");

// Storage
const storage = getStorage(app);

// Exports
export { auth, db, usersRef, roomRef, storage };
