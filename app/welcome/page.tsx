"use client";

import { cookies } from "next/headers";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

import {
  isMagicLink,
  signInWithMagicLink,
} from "@/lib/firebase/firebase-client-config";

import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { clearMagicEmail, getMagicEmail } from "@/lib/localStorage/magicEmail";

export default function Welcome() {
  console.log("welcome");

  const login = async (magicEmail: string) => {
    const email = magicEmail;

    console.log("login email", email);

    try {
      const credential = await signInWithMagicLink(email, window.location.href);
      const token = await credential.user.getIdToken();
      const user = await fetch("/auth/session", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          return (async () => {
            const response = await res.json();
            console.log("response ds login", response);
          })();
        })
        .catch((e) => console.log("error ds le Welcome", e));


      clearMagicEmail();
    } catch (error) {
      console.log("try catch welcome error", error);
    }
  };

  useEffect(() => {
    console.log("useEffect ");

    (async () => {
      const magicEmail = getMagicEmail();

      if (!magicEmail) {
        return;
      }

      try {
        await login(magicEmail);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  // if (isMagicLink(window.location.href)) {
  //   let email = window.localStorage.getItem("emailForSignIn");

  //   console.log("email", email);
  //   console.log("window.location.href", window.location.href);

  //   signInWithMagicLink(email!, window.location.href)
  //     .then((result) => {
  //       console.log("result", result);
  //       window.localStorage.removeItem("emailForSignIn");
  //     })
  //     .catch((error) => {
  //       console.log("error welcome", error);
  //       console.log("error welcome error.email", error.email);
  //     });
  // }

  const { getUser } = useContext(AuthContext);

  const [user, setUser] = getUser;
  const router = useRouter();

  console.log("welcome user", user);

  // React.useEffect(() => {
  //   if (user == null) router.push("/unauthenticated");

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1>Thanks for creating your account!</h1>

      <h2 className="text-xl font-normal leading-relaxed">
        Download our PDF Guide for losing weight for FREE
      </h2>
      <h2 className="text-xl font-normal leading-relaxed">
        and get on your way to your ideal body!
      </h2>
    </main>
  );
}
