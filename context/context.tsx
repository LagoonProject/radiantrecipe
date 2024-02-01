import React, {Dispatch,SetStateAction } from "react";

export type TIsPDFDownloaded = boolean | undefined;

interface IAppValue {
    getIsPDFDownloaded: [TIsPDFDownloaded, Dispatch<SetStateAction<TIsPDFDownloaded>>]
}

export const AppContext = React.createContext<IAppValue>(null!);

export const AppContextProvider = ({ children }: { children: any }) => {
  const [isPDFDownloaded, setIsPDFDownloaded] = React.useState<TIsPDFDownloaded>(undefined);



  return (
    <AppContext.Provider value={{ getIsPDFDownloaded: [isPDFDownloaded, setIsPDFDownloaded]}}>
      {children}
    </AppContext.Provider>
  );
};