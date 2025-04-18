import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDykbbpt6fZlPBB6ay3N_KpiwAo2DqqVSI",
  authDomain: "trivia-755c1.firebaseapp.com",
  projectId: "trivia-755c1",
  storageBucket: "trivia-755c1.firebasestorage.app",
  messagingSenderId: "744329607847",
  appId: "1:744329607847:web:360440198dcde59cb73982",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Check if we should use emulators (development environment)
console.log(process.env.USE_FIREBASE_EMULATORS);
const useEmulators = true;

if (useEmulators) {
  // Connect to Firebase Emulators
  const authEmulatorHost = process.env.FIREBASE_AUTH_EMULATOR_HOST || "localhost";
  const authEmulatorPort = process.env.FIREBASE_AUTH_EMULATOR_PORT || 9099;
  connectAuthEmulator(auth, `http://${authEmulatorHost}:${authEmulatorPort}`);
  console.log(`Auth emulator connected at ${authEmulatorHost}:${authEmulatorPort}`);

  const firestoreEmulatorHost = process.env.FIREBASE_FIRESTORE_EMULATOR_HOST || "localhost";
  const firestoreEmulatorPort = process.env.FIREBASE_FIRESTORE_EMULATOR_PORT || 8080;
  connectFirestoreEmulator(db, firestoreEmulatorHost, Number(firestoreEmulatorPort));
  console.log(`Firestore emulator connected at ${firestoreEmulatorHost}:${firestoreEmulatorPort}`);
}

// Export initialized Firebase instances
export { app, auth, db };

// Helper function to get current environment
export const isEmulating = () => useEmulators;
