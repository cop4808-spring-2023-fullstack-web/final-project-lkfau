import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup, sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../Firebase/Firebase";

export const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true)

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function forgotPassword(email){
    return sendPasswordResetEmail(auth, email)
  }

  function logInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function logOut() {
    setLoading(true)
    signOut(auth)
    setUser(null);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        logIn,
        signUp,
        logInWithGoogle,
        logOut,
        loading,
        setLoading,
        forgotPassword
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}
