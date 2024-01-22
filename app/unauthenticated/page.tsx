"use client";
import { useContext } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";

import { useRouter } from "next/navigation";
import React from "react";
import { Spinner } from "@nextui-org/react";
import { AuthContext } from "@/context/AuthContext";

export default function Unauthenticated() {
  // const { getUser } = useContext(AuthContext);

  // const [user, setUser] = getUser;

  // const router = useRouter();

  // React.useEffect(() => {
  //   if (user !== null) router.push("/protected/welcome");

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user]);


    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <Spinner />
      </main>
    );
  
}
