"use client";
import { MealPlanResponse } from "@/app/protected/myMealPlans/[tdeeTarget]/page";
import { calculateTDEE } from "@/lib/helpers/tdeeCalculation";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";

export type TIsPDFDownloaded = boolean | undefined;

export type TMyInfos = {
  id: string;
  email: string;
  weight: string;
  heightCm: string;
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
  getMealPlans: [
    MealPlanResponse[] | [] | null,
    Dispatch<SetStateAction<MealPlanResponse[] | [] | null>>
  ];
  getRecipe: [Recipe|undefined, Dispatch<SetStateAction<Recipe|undefined>>];
}

export const AppContext = React.createContext<IAppValue>(null!);

export const AppContextProvider = ({ children }: { children: any }) => {
  const [isPDFDownloaded, setIsPDFDownloaded] =
    React.useState<TIsPDFDownloaded>(undefined);
  const [tdee, setTdee] = useState(0);
  const [tdeeTarget, setTdeeTarget] = useState(0);
  const [myInfos, setMyInfos] = useState<TMyInfos | undefined>();
  const [mealPlans, setMealPlans] = useState<MealPlanResponse[] | [] | null>(
    null
  );
  const [recipe, setRecipe] = useState<Recipe>();

  return (
    <AppContext.Provider
      value={{
        getIsPDFDownloaded: [isPDFDownloaded, setIsPDFDownloaded],
        getTdee: [tdee, setTdee],
        getTdeeTarget: [tdeeTarget, setTdeeTarget],
        getMyInfos: [myInfos, setMyInfos],
        getMealPlans: [mealPlans, setMealPlans],
        getRecipe: [recipe, setRecipe],
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
