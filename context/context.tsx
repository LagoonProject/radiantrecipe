"use client"
import React, {Dispatch,SetStateAction, useState } from "react";

export type TIsPDFDownloaded = boolean | undefined;


interface IAppValue {
    getIsPDFDownloaded: [TIsPDFDownloaded, Dispatch<SetStateAction<TIsPDFDownloaded>>]
    getTdee:[number, Dispatch<SetStateAction<number>>]
}

export const AppContext = React.createContext<IAppValue>(null!);

export const AppContextProvider = ({ children }: { children: any }) => {
  const [isPDFDownloaded, setIsPDFDownloaded] = React.useState<TIsPDFDownloaded>(undefined);
  const [tdee, setTdee] = useState(0);

  return (
    <AppContext.Provider value={{ getIsPDFDownloaded: [isPDFDownloaded, setIsPDFDownloaded], getTdee:[tdee, setTdee]}}>
      {children}
    </AppContext.Provider>
  );
};