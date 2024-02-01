import { clientAuth } from "@/app/firebase/firebase-client-config";
import { useRouter } from "next/navigation";
import { signOut, User } from "firebase/auth";


//Post client ID token to server
//then sign out of client side auth
//finally refresh the page to get the new session cookie
export default async function postToken(user : User) {

  console.log("post token")

  const router = useRouter();// eslint-disable-line
  const token = await user.getIdToken();
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status === 200) {
    //logging out of client side auth is very important as if you didnt you could just log back into the server
    signOut(clientAuth);
    router.refresh();
  }
}