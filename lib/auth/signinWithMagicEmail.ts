"use client";

import {
  sendSignInLinkToEmail,
  getAuth,
  signInWithEmailLink,
  isSignInWithEmailLink,
  Auth,
  UserCredential,
} from "firebase/auth";
import { clientAuth } from "@/app/firebase/firebase-client-config";
import React, { useState } from "react";

export async function signInWithMagicEmail() {
  if (isSignInWithEmailLink(clientAuth, window.location.href)) {
    let email = window.localStorage.getItem("magicEmailForSignIn") as string;
    if (!email) {
      email = window.prompt(
        "Please provide your email for confirmation"
      ) as string;
    }

    signInWithEmailLink(clientAuth, email, window.location.href)
      .then((result) => {
        console.log("result ds le sign in", result);
        return result.user;
        // window.localStorage.removeItem("magicEmailForSignIn");
      })
      .catch((error) => {});
  }
}
