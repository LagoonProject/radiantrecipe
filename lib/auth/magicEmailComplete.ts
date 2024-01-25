import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

import { clientAuth } from "@/app/firebase/firebase-client-config";

if (isSignInWithEmailLink(clientAuth, window.location.href)) {
  let email = window.localStorage.getItem("magicEmailForSignIn") as string
  if (!email) {
    email = window.prompt("Please provide your email for confirmation") as string
  }

  signInWithEmailLink(clientAuth, email, window.location.href)
    .then((result) => {
      window.localStorage.removeItem("magicEmailForSignIn");
    })
    .catch((error) => {});
}
