"use client"

import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

import {
  onAuthStateChanged,
  getAuth,
  User as FirebaseUser,
  onIdTokenChanged,
  IdTokenResult,
} from "firebase/auth";



import { Claims } from "next-firebase-auth-edge/lib/auth/claims";

import { UserInfo } from "firebase/auth";
import { getAuthentication } from "@/lib/firebase/firebase-client-config";

import { filterStandardClaims } from "next-firebase-auth-edge/lib/auth/claims";

export interface User extends Omit<UserInfo, "providerId"> {
  emailVerified: boolean;
  customClaims: Claims;
}

interface AuthContextValue {
  getUser: [User | null, Dispatch<SetStateAction<User | null>>];
}

export interface AuthProviderProps {
  serverUser: User | null;
  children: React.ReactNode;
}

function toUser(user: FirebaseUser, idTokenResult: IdTokenResult): User {
  return {
    ...user,
    customClaims: filterStandardClaims(idTokenResult.claims),
  };
}

export const AuthContext = createContext<AuthContextValue>(null!);

const auth = getAuthentication()

export const AuthContextProvider: React.FunctionComponent<AuthProviderProps> = ({
  serverUser,
  children,
}) => {
  const [user, setUser] = React.useState(serverUser);
 
  const handleIdTokenChanged = async (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      const idTokenResult = await firebaseUser.getIdTokenResult();
 
      // Sets authenticated user cookies
      await fetch("/api/login", {
        headers: {
          Authorization: `Bearer ${idTokenResult.token}`,
        },
      });
 
      setUser(toUser(firebaseUser, idTokenResult));
      return;
    }
 
    // Removes authenticated user cookies
    await fetch("/api/logout");
 
    setUser(null);
  };
 
  React.useEffect(() => {
    return onIdTokenChanged(auth, handleIdTokenChanged);
  }, []);
 
  return (
    <AuthContext.Provider
      value={{
       getUser: [user, setUser],
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};