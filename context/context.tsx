import React, {Dispatch,SetStateAction } from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { clientAuth } from "@/app/firebase/firebase-client-config";
const auth = clientAuth

type TUser = User | null;

interface IAuthValue {
    getUser: [TUser, Dispatch<SetStateAction<TUser>>]
}

export const AuthContext = React.createContext<IAuthValue>(null!);




export const AuthContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = React.useState<TUser>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {

        console.log("user conntext", user)
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ getUser: [user, setUser] }}>
      {children}
    </AuthContext.Provider>
  );
};
