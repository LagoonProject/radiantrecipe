// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  setPersistence,
  signInWithEmailLink,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const getClientApp: () => FirebaseApp = () => {
  if (getApps().length) return getApp();

  const clientApp = initializeApp(firebaseConfig);
  const auth = getAuth(clientApp);
  setPersistence(auth, browserLocalPersistence);

  return clientApp;
};

export const getAuthentication = () => {
  const auth = getAuth(getClientApp());

  return auth;
};

export const isMagicLink = (link: string) => {
  const auth = getAuth(getClientApp());

  return isSignInWithEmailLink(auth, link);
};

export const signInWithMagicLink = (email: string, link: string) => {
  const auth = getAuth(getClientApp());

  return signInWithEmailLink(auth, email, link);
};

export const sendMagicLink = (email: string, redirectUrl: string) => {
  const auth = getAuth(getClientApp());
  const actionCodeSettings = {
    url: redirectUrl,
    handleCodeInApp: true,
  };
  return sendSignInLinkToEmail(auth, email, actionCodeSettings);
};
