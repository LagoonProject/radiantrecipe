import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";

export async function getUserFromDb(userId: string) {
  const currentUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return currentUser;
}
