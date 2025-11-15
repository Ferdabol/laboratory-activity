import { createContext, useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../../backend/firebase';

// ✅ Create context
export const AuthContext = createContext();

// ✅ Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const userRef = doc(db, "users", userId);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) setUser({ id: userId, ...docSnap.data() });
      else setUser(null);
    });

    return () => unsubscribe();
  }, []);

    const login = (userId) => {
    const userRef = doc(db, "users", userId);

    // Listen to Firestore document
    onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUser({ id: userId, ...userData });

        // Store in localStorage
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", userData.name || "Anonymous");
      }
    });
  };


  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
