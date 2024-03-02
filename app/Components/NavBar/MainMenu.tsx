import { User } from "@prisma/client";
import { userConstants } from "./userConstants";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CurrentUser, SignOutButton } from "../AuthButtons";
import { user } from "@nextui-org/react";

interface UserMenuProps {
  user: CurrentUser ;
  closeUserMenu: () => void;
}
export default function MainMenu({ user, closeUserMenu }: UserMenuProps) {
  const router = useRouter();

  if (!user) return;

  return (
    <div
      className={"flex flex-col  shadow-lg rounded-xl px-4 py-4 gap-4 border-4 z-200 bg-zinc-800"}
    >
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-green-500">{user?.email}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 font-light">
        {userConstants.map((item) => (
          <div key={item.name} onClick={closeUserMenu}>
            <Link className="hover:text-gray-300" href={item.link}>{item.name}</Link>
          </div>
        ))}
      </div>

      <SignOutButton />
    </div>
  );
}
