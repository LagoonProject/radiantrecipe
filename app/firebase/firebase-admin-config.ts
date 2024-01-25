import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
//Go to your firebase project console ie the firebase site > project settings > service accounts tab > generate new private key button
//save the file > rename it service_account.json > put in the root of this project


const firebaseAdminConfig = {
  credential: cert({
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  }),
};

const app =
  getApps().length <= 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];

export const adminAuth = getAuth(app);