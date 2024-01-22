import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getAuthentication } from "./firebase/firebase-client-config";
import { signOut } from "firebase/auth";

const auth = getAuthentication();

async function signOutUser(router: AppRouterInstance) {
  //Sign out with the Firebase client
  await signOut(auth);

  //Clear the cookies in the server
  const response = await fetch("http://localhost:3000/api/auth/signOut", {
    method: "POST",
  });

  if (response.status === 200) {
    router.push("/");
  }
}
