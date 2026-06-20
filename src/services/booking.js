// Firebase service for booking and contact form management
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
  serverTimestamp,
  onSnapshot
} from "firebase/firestore";

// Collection references
export const contactSubmissionsCollection = collection(db, "contact_submissions");
export const tutorialBookingsCollection = collection(db, "tutorial_bookings");
export const bookingNotificationsCollection = collection(db, "booking_notifications");

// Schema references for documentation
export const contactSubmissionSchema = {
  fullName: "string",
  email: "string", 
  subject: "string",
  message: "string",
  submittedAt: "timestamp",
  status: "string", // new, read, replied
  source: "string", // contact_form, booking_form
  respondedAt: "timestamp", // optional
  responseMessage: "string" // optional
};

export const tutorialBookingSchema = {
  studentName: "string",
  email: "string",
  phone: "string",
  subject: "string",
  level: "string",
  sessionType: "string",
  preferredDate: "date",
  preferredTime: "date", 
  duration: "number", // in minutes
  notes: "string",
  urgency: "string", // normal, urgent, flexible
  tutorId: "string",
  tutorName: "string",
  studentId: "string", // optional if guest booking
  status: "string", // pending, confirmed, cancelled, completed
  paymentStatus: "string", // unpaid, paid, refunded
  bookedAt: "timestamp",
  confirmedAt: "timestamp", // optional
  sessionDetails: {
    subject: "string",
    level: "string",
    type: "string",
    duration: "number",
    urgency: "string",
    groupName: "string", // for group lessons
    groupSize: "number", // for group lessons
    participantEmails: "string" // comma-separated emails for group lessons
  },
  estimatedCost: "number",
  actualCost: "number", // optional
  cancellationReason: "string", // optional
  rating: "number", // optional, 1-5 stars
  feedback: "string" // optional
};

// Contact form functions
export const submitContactForm = async (formData) => {
  try {
    const docRef = await addDoc(contactSubmissionsCollection, {
      ...formData,
      submittedAt: serverTimestamp(),
      status: 'new',
      source: 'contact_form'
    });
    console.log('Contact form submitted with ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

export const getContactSubmissions = async (status = null) => {
  try {
    let q;
    if (status) {
      q = query(
        contactSubmissionsCollection, 
        where("status", "==", status),
        orderBy("submittedAt", "desc")
      );
    } else {
      q = query(contactSubmissionsCollection, orderBy("submittedAt", "desc"));
    }
    
    const querySnapshot = await getDocs(q);
    const submissions = querySnapshot.docs.map((doc) => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
    
    console.log(`Fetched ${submissions.length} contact submissions`);
    return submissions;
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    throw error;
  }
};

export const updateContactSubmissionStatus = async (submissionId, status, responseMessage = null) => {
  try {
    const updateData = {
      status,
      respondedAt: serverTimestamp()
    };
    
    if (responseMessage) {
      updateData.responseMessage = responseMessage;
    }
    
    await updateDoc(doc(db, 'contact_submissions', submissionId), updateData);
    console.log('Contact submission status updated:', submissionId);
    return { success: true };
  } catch (error) {
    console.error('Error updating contact submission:', error);
    throw error;
  }
};

// Tutorial booking functions
export const submitTutorialBooking = async (bookingData) => {
  try {
    console.log('Submitting booking data:', bookingData);
    
    const docRef = await addDoc(tutorialBookingsCollection, {
      ...bookingData,
      bookedAt: serverTimestamp(),
      status: 'pending',
      paymentStatus: 'unpaid'
    });
    
    console.log('Booking submitted successfully with ID:', docRef.id);
    
    // Create notification for admin/tutor
    try {
      await addDoc(bookingNotificationsCollection, {
        type: 'new_booking',
        bookingId: docRef.id,
        message: `New booking request from ${bookingData.studentName}`,
        createdAt: serverTimestamp(),
        read: false,
        recipientRole: 'teacher'
      });
      console.log('Notification created successfully');
    } catch (notifError) {
      console.warn('Failed to create notification:', notifError);
      // Don't fail the booking if notification fails
    }
    
    console.log('Tutorial booking submitted with ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting tutorial booking:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    return { success: false, error: error.message };
  }
};

export const getTutorialBookings = async (filters = {}) => {
  try {
    let q = tutorialBookingsCollection;
    
    // Apply filters
    if (filters.status) {
      q = query(q, where("status", "==", filters.status));
    }
    if (filters.studentId) {
      q = query(q, where("studentId", "==", filters.studentId));
    }
    if (filters.tutorId) {
      q = query(q, where("tutorId", "==", filters.tutorId));
    }
    
    // Always order by booking date
    q = query(q, orderBy("bookedAt", "desc"));
    
    const querySnapshot = await getDocs(q);
    const bookings = querySnapshot.docs.map((doc) => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
    
    console.log(`Fetched ${bookings.length} tutorial bookings`);
    return bookings;
  } catch (error) {
    console.error('Error fetching tutorial bookings:', error);
    throw error;
  }
};

export const updateBookingStatus = async (bookingId, status, additionalData = {}) => {
  try {
    const updateData = {
      status,
      ...additionalData
    };
    
    // Add timestamp for specific status changes
    if (status === 'confirmed') {
      updateData.confirmedAt = serverTimestamp();
    }
    
    await updateDoc(doc(db, 'tutorial_bookings', bookingId), updateData);
    
    // Create notification for student
    const booking = await getBookingById(bookingId);
    if (booking) {
      await addDoc(bookingNotificationsCollection, {
        type: 'booking_status_update',
        bookingId: bookingId,
        message: `Your booking has been ${status}`,
        createdAt: serverTimestamp(),
        read: false,
        recipientId: booking.studentId,
        recipientRole: 'student'
      });
    }
    
    console.log('Booking status updated:', bookingId, status);
    return { success: true };
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
};

export const getBookingById = async (bookingId) => {
  try {
    const docRef = doc(db, 'tutorial_bookings', bookingId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw error;
  }
};

export const cancelBooking = async (bookingId, cancellationReason) => {
  try {
    await updateBookingStatus(bookingId, 'cancelled', {
      cancellationReason,
      cancelledAt: serverTimestamp()
    });
    
    console.log('Booking cancelled:', bookingId);
    return { success: true };
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw error;
  }
};

export const completeBooking = async (bookingId, rating = null, feedback = null, actualCost = null) => {
  try {
    const updateData = {
      status: 'completed',
      completedAt: serverTimestamp()
    };
    
    if (rating) updateData.rating = rating;
    if (feedback) updateData.feedback = feedback;
    if (actualCost) updateData.actualCost = actualCost;
    
    await updateDoc(doc(db, 'tutorial_bookings', bookingId), updateData);
    
    console.log('Booking completed:', bookingId);
    return { success: true };
  } catch (error) {
    console.error('Error completing booking:', error);
    throw error;
  }
};

// Real-time listeners
export const subscribeToBookings = (callback, filters = {}) => {
  try {
    let q = tutorialBookingsCollection;
    
    if (filters.studentId) {
      q = query(q, where("studentId", "==", filters.studentId));
    }
    if (filters.tutorId) {
      q = query(q, where("tutorId", "==", filters.tutorId));
    }
    
    q = query(q, orderBy("bookedAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(bookings);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error('Error setting up bookings listener:', error);
    throw error;
  }
};

export const subscribeToNotifications = (callback, recipientId, recipientRole) => {
  try {
    const q = query(
      bookingNotificationsCollection,
      where("recipientId", "==", recipientId),
      where("recipientRole", "==", recipientRole),
      where("read", "==", false),
      orderBy("createdAt", "desc")
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(notifications);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error('Error setting up notifications listener:', error);
    throw error;
  }
};

// Statistics functions
export const getBookingStats = async (tutorId = null) => {
  try {
    let bookings;
    if (tutorId) {
      bookings = await getTutorialBookings({ tutorId });
    } else {
      bookings = await getTutorialBookings();
    }
    
    const stats = {
      total: bookings.length,
      pending: bookings.filter(b => b.status === 'pending').length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
      revenue: bookings
        .filter(b => b.status === 'completed')
        .reduce((sum, b) => sum + (b.actualCost || b.estimatedCost || 0), 0),
      averageRating: calculateAverageRating(bookings.filter(b => b.rating))
    };
    
    return stats;
  } catch (error) {
    console.error('Error calculating booking stats:', error);
    throw error;
  }
};

const calculateAverageRating = (ratedBookings) => {
  if (ratedBookings.length === 0) return 0;
  const sum = ratedBookings.reduce((total, booking) => total + booking.rating, 0);
  return (sum / ratedBookings.length).toFixed(1);
};
