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
    localStorage.setItem("userId", userId);
    const userRef = doc(db, "users", userId);
    onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) setUser({ id: userId, ...docSnap.data() });
    });
  };

  const logout = () => {
    localStorage.removeItem("userId");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
