import {
  signInWithEmailAndPassword,
  getAuth,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { auth } from "../firebase-client-config";

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "http://localhost:3000/welcome",
  // This must be true.
  handleCodeInApp: true,
};

export default async function signIn(email: string) {
  let result = null,
    error = null;
  try {
    result = await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
  } catch (e) {
    console.log("Sign in error", e);
  }

  return { result, error };
}
