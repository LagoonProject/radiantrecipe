import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { clientStorage } from "@/app/firebase/firebase-client-config";
import FileSaver from "file-saver";

export const downloadPDF = async () => {
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

    await download();
  } catch (error) {
    console.log("downloadPDF error", error);
  }
};
