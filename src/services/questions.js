// Firestore service for admin panel questions tab
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";

export const questionsCollection = collection(db, "questions");

export const getQuestions = async () => {
  const q = query(questionsCollection, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
