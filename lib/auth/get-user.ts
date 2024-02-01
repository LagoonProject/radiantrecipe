import { cookies } from "next/headers";
import { adminAuth } from "@/app/firebase/firebase-admin-config";

//Get the user from the session cookie
//if theres no session or its invalid, return null
export default async function getUser() {
  try {
    const session = cookies().get("radiant_recipe_session")?.value;

    if (!session) {
      return null;
    }

    const user = await adminAuth.verifySessionCookie(session, true);

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.log("getUser error", error);
  }
}
