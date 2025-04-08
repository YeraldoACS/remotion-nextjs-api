import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS3gOx14lmMG4W7OHYTjOxKI_EfZ_b-1M",
  authDomain: "bravanna-project.firebaseapp.com",
  projectId: "bravanna-project",
  storageBucket: "bravanna-project.firebasestorage.app",
  messagingSenderId: "902475947961",
  appId: "1:902475947961:web:f0673a3e2179fe22ca6068",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Check if we should use emulators (development environment)
const useEmulators = process.env.VITE_USE_FIREBASE_EMULATORS === "true";

if (useEmulators) {
  // Connect to Firebase Emulators
  const authEmulatorHost = process.env.VITE_FIREBASE_AUTH_EMULATOR_HOST || "localhost";
  const authEmulatorPort = process.env.VITE_FIREBASE_AUTH_EMULATOR_PORT || 9099;
  connectAuthEmulator(auth, `http://${authEmulatorHost}:${authEmulatorPort}`);
  console.log(`Auth emulator connected at ${authEmulatorHost}:${authEmulatorPort}`);

  const firestoreEmulatorHost = process.env.VITE_FIREBASE_FIRESTORE_EMULATOR_HOST || "localhost";
  const firestoreEmulatorPort = process.env.VITE_FIREBASE_FIRESTORE_EMULATOR_PORT || 8080;
  connectFirestoreEmulator(db, firestoreEmulatorHost, Number(firestoreEmulatorPort));
  console.log(`Firestore emulator connected at ${firestoreEmulatorHost}:${firestoreEmulatorPort}`);
}

// Export initialized Firebase instances
export { app, auth, db };

// Helper function to get current environment
export const isEmulating = () => useEmulators;
