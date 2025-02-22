import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import React, { createContext, useEffect, useState } from "react";
import auth from "../Authentication/firebase.config";
//   import auth from "../firebase/firebase.config";
  export const AuthContext = createContext(null);
  
  const googleProvider = new GoogleAuthProvider();
  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
     const [theme, setTheme] = useState(
          localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
        );
  
    // login or register by google
    const logInByGoogle = () => {
      return signInWithPopup(auth, googleProvider);
    };
  
    //sign in by email and password
    const signInByEmailPassword = (email, password) => {
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    // Log In by Email and Password
    const logInByEmailPassword = (email, password) => {
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    // log out
    const logOut = () => {
      return signOut(auth);
    };
  
    //   update user profile
    const manageProfile = (name, photo) => {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
    };
  
    //   Get the current sign in user
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
    const info = {
      user,
      loading,
      logInByGoogle,
      signInByEmailPassword,
      logOut,
      logInByEmailPassword,
      manageProfile,
      theme,
      setTheme
    };
  
    return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
  };
  
  export default AuthProvider;
  