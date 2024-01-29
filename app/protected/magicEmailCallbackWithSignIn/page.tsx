"use client";

import { cookies } from "next/headers";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { clientAuth } from "@/app/firebase/firebase-client-config";
import { useSignInWithEmailLink } from "react-firebase-hooks/auth";
import { Spinner } from "@nextui-org/react";
import postToken from "@/lib/auth/post-token";
import React, { useContext, useEffect } from "react";
import { getMagicEmailFromLocalStorage } from "@/lib/auth/getMagicEmailFromLocalStorage";

export default function MagicEmailCallbackWithSignIn() {
  const [signInWithEmailLink, user, loading, error] =
    useSignInWithEmailLink(clientAuth);

  useEffect(() => {
    const email = getMagicEmailFromLocalStorage();

    (async () => {
      await signInWithEmailLink(email, window.location.href);
    })();
  }, []);

  const router = useRouter();

  if (user) {
    postToken(user.user);

    router.push("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Spinner />
    </main>
  );
}
