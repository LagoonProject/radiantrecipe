import { sendSignInLinkToEmail, getAuth } from "firebase/auth";
import { clientAuth } from "@/app/firebase/firebase-client-config";

const auth = clientAuth;

export default async function sendMagicEmail(email: string) {
  const actionCodeSettings = {
    url: "http://localhost:3000/protected/magicEmailCallbackWithSignIn",
    handleCodeInApp: true,
  };

  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then((result) => {
      window.localStorage.setItem("magicEmailForSignIn", email);
    })
    .catch((error) => {
      console.log("error sign up", error);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
