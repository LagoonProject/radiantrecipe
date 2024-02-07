"use client";

import Link from "next/link";
import { DecodedIdToken } from "firebase-admin/auth";
import { usePathname } from "next/navigation";
import { signOutUser } from "@/lib/auth/signOut";
import { useRouter } from "next/navigation";

export interface IAuthButtons {
  user: DecodedIdToken | null | undefined;
}

export const SignInButton = ({ user }: IAuthButtons) => {
  const pathname = usePathname();

  return (
    <>
      {!user && pathname !== "/auth/signInWithMagicEmail" && (
        <Link href="/auth/signInWithMagicEmail">
          <button className="mx-4  bg-slate-800 px-4 py-2 rounded-lg">
            Sign In
          </button>
        </Link>
      )}
    </>
  );
};

export const SignOutButton = ({ user }: IAuthButtons) => {
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
      {user && (
        <div className="flex flex-row items-center justify-between">
          <p>{user.email}</p>

          <button
            className="mx-4 bg-slate-600 px-4 py-2 rounded-lg"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      )}
    </>
  );
};
