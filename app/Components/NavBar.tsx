import { cookies } from "next/headers";
import Link from "next/link";

export const NavBar = async () => {
  return (
    <div className="w-full h-12 bg-slate-500 px-6 flex flex-row items-center justify-between">
      <p className="font-bold ">Radiant Recipe</p>
      <div className="flex flex-row items-center justify-between">
        <Link href="/auth/signIn">
          <button className="mx-4">Sign In</button>
        </Link>
      </div>
    </div>
  );
};
