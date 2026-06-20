// Firestore service for student community/forum
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  serverTimestamp
} from "firebase/firestore";

export const communityPostsCollection = collection(db, "community_posts");
export const communityCommentsCollection = collection(db, "community_comments");

export const createCommunityPost = async (postData) => {
  const docRef = await addDoc(communityPostsCollection, {
    ...postData,
    createdAt: serverTimestamp(),
  });
  return { success: true, id: docRef.id };
};

export const getCommunityPosts = async () => {
  const q = query(communityPostsCollection, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createCommunityComment = async (commentData) => {
  const docRef = await addDoc(communityCommentsCollection, {
    ...commentData,
    createdAt: serverTimestamp(),
  });
  return { success: true, id: docRef.id };
};

export const getCommunityComments = async (postId) => {
  const q = query(
    communityCommentsCollection,
    where("postId", "==", postId),
    orderBy("createdAt", "asc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
