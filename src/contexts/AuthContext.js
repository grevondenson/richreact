import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('student'); // 'student' or 'teacher'
  const [userData, setUserData] = useState(null);
  const [userDataCache, setUserDataCache] = useState(new Map());

  // Sign up function with Firestore integration
  async function signup(email, password, displayName, role = 'student') {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
      
      // Store user data in Firestore
      const userData = {
        email,
        displayName,
        role,
        bio: '',
        loginStreak: 1, // Start with 1 since they're logging in for the first time
        lastLogin: new Date(),
        downloads: [],
        resourceUsage: { 
          totalDownloads: 0, 
          totalResourcesAccessed: 0 
        },
        createdAt: new Date()
      };

      await setDoc(doc(db, 'users', result.user.uid), userData);
      setUserRole(role);
      setUserData(userData);
      
      // Cache the user data
      setUserDataCache(prev => new Map(prev).set(result.user.uid, userData));
      
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Optimized login function with batched operations
  async function login(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Check cache first
      const cachedData = userDataCache.get(result.user.uid);
      if (cachedData) {
        setUserData(cachedData);
        setUserRole(cachedData.role);
      }
      
      // Update login streak in background (non-blocking)
      updateLoginStreakOptimized(result.user.uid);
      
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Optimized Google sign in
  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Check cache first
      const cachedData = userDataCache.get(result.user.uid);
      if (cachedData) {
        setUserData(cachedData);
        setUserRole(cachedData.role);
        // Update login streak in background
        updateLoginStreakOptimized(result.user.uid);
        return { success: true, user: result.user };
      }
      
      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      
      if (!userDoc.exists()) {
        // Create new user document for Google sign-in
        const userData = {
          email: result.user.email,
          displayName: result.user.displayName || result.user.email.split('@')[0],
          role: 'student', // Default role for Google sign-in
          bio: '',
          loginStreak: 1,
          lastLogin: new Date(),
          downloads: [],
          resourceUsage: { 
            totalDownloads: 0, 
            totalResourcesAccessed: 0 
          },
          createdAt: new Date()
        };
        
        await setDoc(doc(db, 'users', result.user.uid), userData);
        setUserData(userData);
        setUserRole('student');
        
        // Cache the user data
        setUserDataCache(prev => new Map(prev).set(result.user.uid, userData));
      } else {
        // Update login streak in background
        updateLoginStreakOptimized(result.user.uid);
        const data = userDoc.data();
        setUserData(data);
        setUserRole(data.role);
        
        // Cache the user data
        setUserDataCache(prev => new Map(prev).set(result.user.uid, data));
      }
      
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Optimized login streak update (non-blocking)
  async function updateLoginStreakOptimized(userId) {
    try {
      // Use cached data if available to avoid extra Firestore call
      const cachedData = userDataCache.get(userId);
      if (cachedData) {
        const lastLogin = cachedData.lastLogin?.toDate?.() || new Date(cachedData.lastLogin) || new Date();
        const today = new Date();
        
        // Check if it's the same day
        const isSameDay = lastLogin.toDateString() === today.toDateString();
        
        // Check if it's consecutive day
        const isConsecutiveDay = 
          lastLogin.getDate() + 1 === today.getDate() &&
          lastLogin.getMonth() === today.getMonth() &&
          lastLogin.getFullYear() === today.getFullYear();
        
        let newStreak = cachedData.loginStreak || 0;
        
        if (!isSameDay) {
          if (isConsecutiveDay) {
            newStreak += 1;
          } else {
            newStreak = 1; // Reset streak if more than 1 day gap
          }
        }
        
        // Update Firestore in background
        updateDoc(doc(db, 'users', userId), {
          loginStreak: newStreak,
          lastLogin: today
        });
        
        // Update local state and cache
        const updatedData = { ...cachedData, loginStreak: newStreak, lastLogin: today };
        setUserData(updatedData);
        setUserDataCache(prev => new Map(prev).set(userId, updatedData));
      } else {
        // Fallback to original method if no cache
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          const data = userDoc.data();
          const lastLogin = data.lastLogin?.toDate() || new Date();
          const today = new Date();
          
          const isSameDay = lastLogin.toDateString() === today.toDateString();
          const isConsecutiveDay = 
            lastLogin.getDate() + 1 === today.getDate() &&
            lastLogin.getMonth() === today.getMonth() &&
            lastLogin.getFullYear() === today.getFullYear();
          
          let newStreak = data.loginStreak || 0;
          
          if (!isSameDay) {
            if (isConsecutiveDay) {
              newStreak += 1;
            } else {
              newStreak = 1;
            }
          }
          
          await updateDoc(doc(db, 'users', userId), {
            loginStreak: newStreak,
            lastLogin: today
          });
          
          const updatedData = { ...data, loginStreak: newStreak, lastLogin: today };
          setUserData(updatedData);
          setUserDataCache(prev => new Map(prev).set(userId, updatedData));
        }
      }
    } catch (error) {
      console.error('Error updating login streak:', error);
    }
  }

  // Legacy function for backward compatibility
  // Removed unused variable updateLoginStreak

  // Logout function
  function logout() {
    return signOut(auth);
  }

  // Reset password
  async function resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Update user profile
  async function updateUserProfile(data) {
    try {
      await updateProfile(currentUser, data);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Update user data in Firestore
  async function updateUserData(userId, data) {
    try {
      await updateDoc(doc(db, 'users', userId), data);
      const updatedData = userData ? { ...userData, ...data } : null;
      setUserData(updatedData);
      
      // Update cache
      if (updatedData) {
        setUserDataCache(prev => new Map(prev).set(userId, updatedData));
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Optimized fetch user data with caching
  async function fetchUserData(userId) {
    try {
      // Check cache first
      const cachedData = userDataCache.get(userId);
      if (cachedData) {
        setUserData(cachedData);
        setUserRole(cachedData.role);
        return cachedData;
      }
      
      // Fetch from Firestore if not in cache
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData(data);
        setUserRole(data.role);
        
        // Cache the data
        setUserDataCache(prev => new Map(prev).set(userId, data));
        return data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Check cache first for immediate response
        const cachedData = userDataCache.get(user.uid);
        if (cachedData) {
          setUserData(cachedData);
          setUserRole(cachedData.role);
          setLoading(false);
        } else {
          // Fetch user data from Firestore
          await fetchUserData(user.uid);
        }
      } else {
        setUserData(null);
        setUserRole('student');
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, [fetchUserData, userDataCache]);

  const value = {
    currentUser,
    userRole,
    userData,
    setUserRole,
    signup,
    login,
    signInWithGoogle,
    logout,
    resetPassword,
    updateUserProfile,
    updateUserData,
    fetchUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 