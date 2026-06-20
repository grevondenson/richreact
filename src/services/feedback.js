import { db } from '../firebase';
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
  limit
} from 'firebase/firestore';

const feedbackCollection = collection(db, 'feedback');

export const submitFeedback = async (feedbackData) => {
  return await addDoc(feedbackCollection, {
    ...feedbackData,
    createdAt: serverTimestamp(),
  });
};

export const getRecentFeedback = async (max = 5) => {
  const q = query(feedbackCollection, orderBy('createdAt', 'desc'), limit(max));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
