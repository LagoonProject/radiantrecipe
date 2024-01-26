import { signOut } from "firebase/auth";
import { clientAuth } from "@/app/firebase/firebase-client-config";

export function signOutUser() {
  signOut(clientAuth)
    .then(() => {})
    .catch((error) => {
      // An error happened.
    });
}
