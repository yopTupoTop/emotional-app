import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3fMM0KmMn3hp1uJNVatMhGdkjSl3clSk",
  authDomain: "emotional-app-bd93b.firebaseapp.com",
  projectId: "emotional-app-bd93b",
  storageBucket: "emotional-app-bd93b.firebasestorage.app",
  messagingSenderId: "461580120445",
  appId: "1:461580120445:web:8fb7c6e5ed58a5d8f59c14",
  measurementId: "G-HLGXJ7C3MZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Log initialization for debugging
console.log('Firebase initialized with project:', firebaseConfig.projectId);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;
