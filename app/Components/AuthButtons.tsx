"use client";

import Link from "next/link";
import { DecodedIdToken } from "firebase-admin/auth";
import { usePathname } from "next/navigation";
import { signOutUser } from "@/lib/auth/signOut";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export type CurrentUser = DecodedIdToken | null | undefined;

export interface IButtonProps {
  user: CurrentUser;
}

export const SignInButton = ({ user }: IButtonProps) => {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/auth/signInWithMagicEmail" && (
        <Link href="/auth/signInWithMagicEmail">
          <button className="mx-4  bg-slate-800 px-4 py-2 rounded-lg">
            Sign In
          </button>
        </Link>
      )}
    </>
  );
};

export const SignOutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      router.refresh();
    }
  };
  return (
    <>
      <Button
        className="bg-transparent px-0  border-t-1 border-zinc-600 flex flex-col items-start text-gray-400"
        onClick={handleLogout}
      >
        Sign out
      </Button>
    </>
  );
};
