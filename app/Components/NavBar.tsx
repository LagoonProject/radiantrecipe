

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { SignOutComponent } from "./SignOutButton";

export const NavBar = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("session", session);
  return (
    <div className="w-full h-12 bg-slate-500 px-6 flex flex-row items-center justify-between">
      <p className="font-bold ">Radiant Recipe</p>
      <div className="flex flex-row items-center justify-between">
       {!session &&  <Link href="/auth/signIn"><button className="mx-4">Sign In</button></Link>}
       {session &&<div className="flex flex-row"><p className="mx-2">{session.user.email}</p><SignOutComponent /> </div>}
      </div>
    </div>
  );
};
