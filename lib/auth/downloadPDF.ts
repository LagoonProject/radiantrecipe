import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { clientStorage } from "@/app/firebase/firebase-client-config";

export const downloadPDF = () => {
  getDownloadURL(ref(clientStorage, "RadiantRecipeGuide.pdf"))
    .then((url) => {
      // Use fetch to download the file
      fetch("/api/downloadPdf").then((blob) => {

            console.log("response 2")


          // Create a new URL for the blob
          console.log("blob", blob);

          const blobUrl = window.URL.createObjectURL(new Blob([blob]));

          console.log("blobUrl", blobUrl);

          // Create an anchor element and trigger the download
          const downloadLink = document.createElement("a");
          downloadLink.href = blobUrl;
          downloadLink.setAttribute("download", `RadiantRecipeGuide.pdf`);
          document.body.appendChild(downloadLink);
          downloadLink.click();

          // Clean up to avoid memory leaks
          document.body.removeChild(downloadLink);
          URL.revokeObjectURL(blobUrl);
        })
        .catch((error) => {
          console.log("Fetch error:", error);
        });
    })
    .catch((error) => {
      console.log("download error", error);
    });
};
