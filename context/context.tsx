"use client";
import { calculateTDEE } from "@/lib/helpers/tdeeCalculation";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";

export type TIsPDFDownloaded = boolean | undefined;

export type TMyInfos = {
  id: string;
  email: string;
  weight: string;
  heightCm: string;
  heightFeet: string;
  heightInches: string;
  units: string;
  gender: string;
  dateOfbirth: string;
  activityLevel: string;
};

interface IAppValue {
  getIsPDFDownloaded: [
    TIsPDFDownloaded,
    Dispatch<SetStateAction<TIsPDFDownloaded>>
  ];
  getTdee: [number, Dispatch<SetStateAction<number>>];
  getTdeeTarget: [number, Dispatch<SetStateAction<number>>];

  getMyInfos: [
    TMyInfos | undefined,
    Dispatch<SetStateAction<TMyInfos | undefined>>
  ];
}

export const AppContext = React.createContext<IAppValue>(null!);

export const AppContextProvider = ({ children }: { children: any }) => {
  const [isPDFDownloaded, setIsPDFDownloaded] =
    React.useState<TIsPDFDownloaded>(undefined);
  const [tdee, setTdee] = useState(0);
  const [tdeeTarget, setTdeeTarget] = useState(0);
  const [myInfos, setMyInfos] = useState<TMyInfos | undefined>();


  return (
    <AppContext.Provider
      value={{
        getIsPDFDownloaded: [isPDFDownloaded, setIsPDFDownloaded],
        getTdee: [tdee, setTdee],
        getTdeeTarget: [tdeeTarget, setTdeeTarget],
        getMyInfos: [myInfos, setMyInfos],
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
