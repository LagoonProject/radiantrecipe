import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { clientStorage } from "@/app/firebase/firebase-client-config";

export const downloadPDF = async () => {
  try {
    // Use fetch to download the file
    const response = await fetch("/api/downloadPdf");

    console.log("response client", response.body)

    const blob = await response.blob();

    console.log("blobito client", blob)

    const blobUrl = window.URL.createObjectURL(new Blob([response.body]));

    // Create an anchor element and trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = blobUrl;
    downloadLink.setAttribute("download", `RadiantRecipeGuide.pdf`);
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up to avoid memory leaks
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.log("downloadPDF error", error);
  }

  // .then((response) => {
  //   console.log("response 1", response.type);
  //   console.log("response ok", response.ok);
  //   console.log("response ", response.body);

  //   //   if (!response.ok) {
  //   //     throw new Error("Network response was not ok");
  //   //   }

  //   return response.blob();
  // })
  // .then((blob) => {
  //   console.log("response 2");

  //   // Create a new URL for the blob
  //   console.log("blob", blob);

  //   const blobUrl = window.URL.createObjectURL(new Blob([blob]));

  //   console.log("blobUrl", blobUrl);

  //   // Create an anchor element and trigger the download
  //   const downloadLink = document.createElement("a");
  //   downloadLink.href = blobUrl;
  //   downloadLink.setAttribute("download", `RadiantRecipeGuide.pdf`);
  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();

  //   // Clean up to avoid memory leaks
  //   document.body.removeChild(downloadLink);
  //   URL.revokeObjectURL(blobUrl);
  // })
};
