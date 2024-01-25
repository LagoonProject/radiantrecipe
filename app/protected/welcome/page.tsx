"use client";

import { AuthContext } from "@/context/context";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import usePostToken from "@/lib/auth/post-token";
import { clientAuth } from "@/app/firebase/firebase-client-config";
import { signInWithMagicEmail } from "@/lib/auth/signinWithMagicEmail";
import { useSignInWithEmailLink } from "react-firebase-hooks/auth";


import React, { useContext, useEffect } from "react";
import { getMagicEmailFromLocalStorage } from "@/lib/auth/getMagicEmailFromLocalStorage";

export default function Welcome() {
  const [signInWithEmailLink, user, loading, error] =
    useSignInWithEmailLink(clientAuth);

  useEffect(() => {
    const email = getMagicEmailFromLocalStorage();
    console.log("email Welcome", email);
    (async () => {
      await signInWithEmailLink(email, window.location.href);

    })()

  }, []);

  console.log("welcome user", user);

  console.log("error welcome", error)

 if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-start p-24">
        <h1>Thanks for creating your account!</h1>
        <div>
          <p>Signed In User: {user.user.email}</p>
        </div>
        <h2 className="text-xl font-normal leading-relaxed">
          Download our PDF Guide for losing weight for FREE
        </h2>
        <h2 className="text-xl font-normal leading-relaxed">
          and get on your way to your ideal body!
        </h2>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1>Thanks for creating your account!</h1>
    </main>
  );
}
