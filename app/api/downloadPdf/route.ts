import { NextResponse } from "next/server";
import { adminStorage } from "@/app/firebase/firebase-admin-config";
import { getDownloadURL } from "firebase-admin/storage";
import { Readable } from 'node:stream';

export async function GET() {

    console.log("get")
    const fileRef = adminStorage.bucket("radiantrecipe-ca4c6.appspot.com").file("RadiantRecipeGuide.pdf");
    // console.log("fileRef", fileRef)

    const downloadURL = await getDownloadURL(fileRef);
    console.log("downloadURL", downloadURL)


  try {

    const response = await fetch(downloadURL, { cache: 'no-store' });


    console.log("response fetch(downloadURL)", response.headers)

    if (!response.ok) {
      throw new Error("Failed to fetch PDF from Firebase");
    }

    const blob = await response.blob();

    console.log("blobito server", blob)

    const headers = new Headers();

    headers.set("Content-Type", "application/pdf");
    headers.set('Content-Disposition', "inline; filename*=utf-8''RadiantRecipeGuide.pdf");
    headers.set('Accept-Ranges', 'bytes');
    // headers.set('Content-Length', '4958476');



    return NextResponse.json(response, { status: 200, statusText: "OK", headers });

    // blob.stream().pipe(response);

    // return new NextResponse(blob, { status: 200, statusText: "OK", headers });
  } catch (error) {
    return new Response(null, {
      status: 500,
      statusText: "Server error pat",
    });
  }
}
