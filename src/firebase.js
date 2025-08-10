import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
// Replace with your actual Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBlEysid-I6NBeGhq1TlAnLxWO5H6PHhDs",
  authDomain: "subscription-tracker-app-c4586.firebaseapp.com",
  projectId: "subscription-tracker-app-c4586",
  storageBucket: "subscription-tracker-app-c4586.firebasestorage.app",
  messagingSenderId: "385751620156",
  appId: "1:385751620156:web:3bc27bd5e37b43bf32c139"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app; 