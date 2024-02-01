import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import getUser from "@/lib/auth/get-user";

export async function GET() {

    const user = await getUser()

    console.log("pdfDownloaded user ", user)

    if(!user) {
        throw new Error('Not authenticated')
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.user_id,
      },
      data: {
        pdf_guide_downloaded: true, 
      },
    });
    console.log("Updated user:", updatedUser);


    return NextResponse.json(updatedUser)
}
