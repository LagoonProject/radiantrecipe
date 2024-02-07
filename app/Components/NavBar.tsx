import { cookies } from "next/headers";
import Link from "next/link";

import { SignInButton, SignOutButton } from "./AuthButtons";
import getUser from "@/lib/auth/get-user";

export const NavBar = async () => {
  const user = await getUser();

  return (
    <div className="w-full h-16 bg-zinc-900 px-6 flex flex-row items-center justify-between">
      <Link href="/">
        <p className="font-bold ">Radiant Recipe</p>
      </Link>

      <div className="flex flex-row items-center justify-between">
        <SignOutButton user={user} />
        <SignInButton user={user} />
      </div>
    </div>
  );
};
