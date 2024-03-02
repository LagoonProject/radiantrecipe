"use client";

import { useState } from "react";
import {
  CurrentUser,
  IButtonProps,
  SignInButton,
  SignOutButton,
} from "../AuthButtons";
import MainMenu from "./MainMenu";

export const NavBarMenuComponent = ({ user }: IButtonProps) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const closeUserMenu = () => {
    setUserMenuOpen(false);
  };

  return (
    <div className="flex flex-row items-center justify-between">
      {user?.email && (
        <div
          onClick={() => setUserMenuOpen((prev) => !prev)}
          className="cursor-pointer flex items-center justify-center rounded-full bg-primary w-8 h-8 text-xl"
        >
          {user.email[0]}
        </div>
      )}
      {userMenuOpen && (
        <div className="absolute  top-16 right-5 z-50">
          <MainMenu user={user} closeUserMenu={closeUserMenu} />
        </div>
      )}
      {!user && <SignInButton user={user} />}
    </div>
  );
};
