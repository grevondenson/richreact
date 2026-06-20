// Debug utilities for Firebase integration
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';

export const testFirestoreConnection = async () => {
  try {
    console.log('Testing Firestore connection...');
    console.log('Current user:', auth.currentUser);
    console.log('Database instance:', db);
    
    // Test writing to Firestore
    const testDoc = await addDoc(collection(db, 'test_collection'), {
      message: 'Test connection',
      timestamp: serverTimestamp(),
      userId: auth.currentUser?.uid || 'anonymous'
    });
    
    console.log('✅ Firestore connection successful! Test document ID:', testDoc.id);
    return { success: true, docId: testDoc.id };
  } catch (error) {
    console.error('❌ Firestore connection failed:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    return { success: false, error: error.message };
  }
};


export const debugBookingSubmission = async (formData, user) => {
  const activeUser = user || auth.currentUser;
  console.log('🔍 DEBUG: Starting booking submission');
  console.log('📝 Form data:', formData);
  console.log('👤 Current user:', activeUser);
  console.log('🔒 User authenticated:', !!activeUser);

  if (!activeUser) {
    console.error('❌ User not authenticated');
    return { success: false, error: 'User not authenticated' };
  }

  // Test Firestore connection first
  const connectionTest = await testFirestoreConnection();
  if (!connectionTest.success) {
    return connectionTest;
  }

  try {
    console.log('📤 Attempting to submit booking...');

    const bookingData = {
      ...formData,
      studentId: activeUser.uid,
      bookedAt: serverTimestamp(),
      status: 'pending',
      paymentStatus: 'unpaid',
      debugInfo: {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        userId: activeUser.uid
      }
    };

    console.log('📊 Final booking data:', bookingData);

    const docRef = await addDoc(collection(db, 'tutorial_bookings'), bookingData);

    console.log('✅ Booking submitted successfully! Document ID:', docRef.id);
    return { success: true, id: docRef.id };

  } catch (error) {
    console.error('❌ Booking submission failed:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    return { success: false, error: error.message };
  }
};
