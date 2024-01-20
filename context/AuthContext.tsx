import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";

import { User } from "firebase/auth";
import { getAuthentication } from "@/lib/firebase/firebase-client-config";

interface AuthContextValue {
  getUser: [User | null, Dispatch<SetStateAction<User | null>>];
}

export const AuthContext = createContext<AuthContextValue>(null!);

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuthentication();

  console.log("user auth context", user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();


  }, []);

  return (
    <AuthContext.Provider value={{ getUser: [user, setUser] }}>
      {children}
    </AuthContext.Provider>
  );
};
