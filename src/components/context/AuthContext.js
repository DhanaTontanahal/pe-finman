import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, get, update, set } from "firebase/database";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
} from "firebase/auth";

import { toast } from "react-toastify";
import { auth, database } from "../../firebase";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const extractUsername = (email) => {
    return email.substring(0, email.indexOf("@"));
  };

  const signInWithEmail = async (email, password) => {
    try {
      const usersRef = ref(database, "users/registered");
      const snapshot = await get(usersRef);

      if (snapshot.exists()) {
        const users = snapshot.val();
        let userFound = false;

        for (let userKey in users) {
          const user = users[userKey];
          if (user.email === email && user.password === password) {
            const updates = {};
            updates[`users/registered/${userKey}/lastLoggedIn`] =
              new Date().toISOString();
            await update(ref(database), updates);

            localStorage.setItem("authUser", JSON.stringify(user));
            const currentUserName = extractUsername(email);
            localStorage.setItem("currentUserName", currentUserName);

            setCurrentUser(user);
            userFound = true;
            navigate("/dashboard");
            break;
          }
        }

        if (!userFound) {
          toast.error("Invalid email or password");
        }
      } else {
        toast.error("No users registered");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error("Error signing in. Please try again later.");
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const usersRef = ref(database, `users/registered/${user.uid}`);
      const snapshot = await get(usersRef);

      if (!snapshot.exists()) {
        const newUser = {
          email: user.email,
          displayName: user.displayName,
          lastLoggedIn: new Date().toISOString(),
        };
        await set(usersRef, newUser);
        localStorage.setItem("authUser", JSON.stringify(newUser));
        const currentUserName = extractUsername(user.email);
        localStorage.setItem("currentUserName", currentUserName);
        setCurrentUser(newUser);
      } else {
        const existingUser = snapshot.val();
        const updates = { lastLoggedIn: new Date().toISOString() };
        await update(usersRef, updates);
        localStorage.setItem("authUser", JSON.stringify(existingUser));
        const currentUserName = extractUsername(existingUser.email);
        localStorage.setItem("currentUserName", currentUserName);
        setCurrentUser(existingUser);
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Error signing in with Google. Please try again later.");
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      localStorage.removeItem("authUser");
      localStorage.removeItem("currentUserName");
      setCurrentUser(null);
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out. Please try again later.");
    }
  };

  const value = {
    currentUser,
    signInWithEmail,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
