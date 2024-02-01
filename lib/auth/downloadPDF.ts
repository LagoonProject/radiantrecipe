import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { clientStorage } from "@/app/firebase/firebase-client-config";
import FileSaver from "file-saver";
import { Dispatch, SetStateAction } from "react";
import { TIsPDFDownloaded } from "@/context/context";

export const downloadPDF = async (
  setIsPDFDownloaded: Dispatch<SetStateAction<TIsPDFDownloaded>>
) => {
  const fileRef = ref(clientStorage, "RadiantRecipeGuide.pdf");
  const downloadURL = await getDownloadURL(fileRef);

  console.log("client url downloadURL", downloadURL);

  try {
    const fetchFile = async () => {
      const response = await fetch(downloadURL);

      console.log("client url response", response);

      const blob = await response.blob();
      return blob;
    };

    const download = async () => {
      const blob = await fetchFile();
      FileSaver.saveAs(blob, "RadiantRecipeGuide.pdf");
    };

    await download().then(() => {
      (async () => {
        const json = await fetch("/api/pdf/pdfDownloaded");
        const res = await json.json();
        const pdfDownloaded = res.pdf_guide_downloaded;
        setIsPDFDownloaded(pdfDownloaded);
      })();
    });
  } catch (error) {
    console.log("downloadPDF error", error);
  }
};
