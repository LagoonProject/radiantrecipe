"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import sendMagicEmail from "@/lib/auth/sendMagicEmail";
import { Input } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { downloadPDF } from "@/lib/auth/downloadPDF";
import { AppContext } from "@/context/context";

export const DownloadPDFButton = () => {
  const [signInButtonClicked, setSignInButtonClicked] = useState(false);
  const { getIsPDFDownloaded } = useContext(AppContext);
  const [isPDFDownloaded, setIsPDFDownloaded] = getIsPDFDownloaded;

  const pdfNotDownloaded = isPDFDownloaded === false;

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const json = await fetch("/api/getUserFromDb");
      const res = await json.json();
      console.log("useEffect res ", res)
      setIsPDFDownloaded(res.pdf_guide_downloaded);
    })();
  }, []);

  return (
    <>
      {pdfNotDownloaded && (
        <div className="flex flex-col justify-center items-center w-full my-8">
          <p className="text-xl font-normal leading-relaxed my-4">
            Download your Radiant Recipe PDF guide.
          </p>

          <button
            className="text-xl font-semibold py-4 px-6 m-4 bg-slate-700 w-2/6 rounded-2xl"
            disabled={signInButtonClicked}
            onClick={() => downloadPDF(setIsPDFDownloaded)}
          >
            {signInButtonClicked ? <Spinner /> : "Download PDF"}
          </button>
        </div>
      )}
    </>
  );
};
