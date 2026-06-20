import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  // 🔥 REPLACE THESE VALUES WITH YOUR NEW FIREBASE PROJECT CONFIG
  apiKey: "AIzaSyClzNHbZnUVSxCA3DRaSkLUgGPuISgZHmI" ,
  authDomain: "richreact-tutorial-hub.firebaseapp.com",
  projectId: "richreact-tutorial-hub",
  storageBucket: "richreact-tutorial-hub.firebasestorage.app",
  messagingSenderId: "691657601903",
  appId: "1:691657601903:web:3885f8fdd73a1f47fbee9a",
  measurementId: "G-ED0RG0DWYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app); 
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only in production)
let analytics = null;
if (process.env.NODE_ENV === 'production') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.log('Analytics not available:', error);
  }
}

export { analytics }; 