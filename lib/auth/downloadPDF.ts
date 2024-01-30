import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { clientStorage } from "@/app/firebase/firebase-client-config";
import FileSaver from "file-saver";

export const downloadPDF = async () => {
  try {
    const request = new Request("/api/downloadPdf", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
          Accept: 'application/pdf'
        },
        // // @ts-ignore
        // duplex: 'half' // DIDN'T WORK
      })
      const res = await fetch(request)

      console.log("downloadPDF res", res)

      const blobRes = await res.blob()

      console.log("downloadPDF blob client", blobRes)
      const blob = new Blob([blobRes], { type: 'application/pdf' });

      const blobUrl = window.URL.createObjectURL(blob)
      const tempLink = document.createElement('a')
      tempLink.href = blobUrl
      tempLink.setAttribute('download', "RadiantRecipeGuide.pdf")
      tempLink.click()
  } catch (error) {
    console.log("downloadPDF error", error);
  }
};
