import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import getUser from "@/lib/auth/get-user";
import { getUserFromDb } from "../actions/getUserFromDb";
import { getTdeeInfoFromDb } from "../actions/getTdeeInfoFromDb";

export async function GET() {
  const user = await getUser();

    if (!user) {
    throw new Error("Not authenticated");
  }

  const bmrInfo = await getTdeeInfoFromDb(user.user_id);

  return NextResponse.json(bmrInfo);
}
