"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import sendMagicEmail from "@/lib/auth/sendMagicEmail";
import { Input } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { downloadPDF } from "@/lib/auth/downloadPDF";

export const DownloadPDFButton = () => {
  const [signInButtonClicked, setSignInButtonClicked] = useState(false);

  const router = useRouter();

  async function downloadGuide() {
    await downloadPDF();
  }

  return (
    <div className="flex flex-col justify-center items-center w-full my-8">
      <p className="text-xl font-normal leading-relaxed my-4">
        Download your Radiant Recipe PDF guide.
      </p>

      <button
        className="text-xl font-semibold py-4 px-6 m-4 bg-slate-700 w-2/6 rounded-2xl"
        disabled={signInButtonClicked}
        onClick={downloadGuide}
      >
        {signInButtonClicked ? <Spinner /> : "Download PDF"}
      </button>
    </div>
  );
};
