import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import getUser from "@/lib/auth/get-user";
import { getUserFromDb } from "../actions/getUserFromDb";

export async function GET() {
  const user = await getUser();


  if (!user) {
    throw new Error("Not authenticated");
  }

  const currentUser = await getUserFromDb(user?.user_id);

  console.log("getUser from db route currentUser ", currentUser);


  return NextResponse.json(currentUser);
}
