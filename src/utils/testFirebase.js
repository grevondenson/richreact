// Test Firebase configuration
import { storage, db } from '../firebase';
import { ref } from 'firebase/storage';
import { collection } from 'firebase/firestore';

export const testFirebaseConfig = () => {
  console.log('Testing Firebase configuration...');
  
  try {
    // Test Storage
    const storageRef = ref(storage, 'test');
    console.log('✅ Firebase Storage initialized successfully');
    console.log('Storage bucket:', storage.app.options.storageBucket);
    
    // Test Firestore
    const lessonsRef = collection(db, 'lessons');
    console.log('✅ Firestore initialized successfully');
    console.log('Project ID:', db.app.options.projectId);
    
    return {
      storage: true,
      firestore: true,
      storageBucket: storage.app.options.storageBucket,
      projectId: db.app.options.projectId
    };
  } catch (error) {
    console.error('❌ Firebase configuration error:', error);
    return {
      storage: false,
      firestore: false,
      error: error.message
    };
  }
};