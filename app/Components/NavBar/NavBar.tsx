import Link from "next/link";
import Image from "next/image";
import { CurrentUser, SignInButton, SignOutButton } from "../AuthButtons";
import getUser from "@/lib/auth/get-user";
import { NavBarMenuComponent } from "./NavBarMenuComponent";

export const NavBar = async () => {
  const user : CurrentUser  = await getUser();

  return (
    <div className="w-full h-16 bg-zinc-900 px-6 flex flex-row items-center justify-between">
      <Link href="/">
        <p className="font-bold ">Radiant Recipe</p>
      </Link>

      <NavBarMenuComponent user={user} />
    </div>
  );
};
