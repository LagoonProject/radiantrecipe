"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  RadioGroup,
  Radio,
} from "@nextui-org/react";

import { truncateNumber } from "@/lib/helpers/tdeeCalculation";

import { MacroPie } from "./MacrosPie";

interface IWeightPlans {
  tdeeTarget: number;
  iWantTo: string;
  activityLevel: string;
  caloricGoal: string;
  weightLossEstimateKg: string;
  weightLossEstimatePounds: string;
  calculation: string;
}

export function WeightPlans({
  tdeeTarget,
  iWantTo,
  activityLevel,
  caloricGoal,
  weightLossEstimateKg,
  weightLossEstimatePounds,
  calculation,
}: IWeightPlans) {
  const [macroDistributionInGrams, setMacroDistributionInGrams] = useState([
    {
      label: "",
      value: 0,
      valueText: "",
      fill: "",
      macrosPercent: 0,
    },
  ]);

  function getMacroRatiosByActivity(activityLevel: string) {
    switch (activityLevel) {
      case "sedentary":
        return { proteins: 0.375, carbohydrates: 0.375, fats: 0.25 };
      case "lightly":
        return { proteins: 0.325, carbohydrates: 0.4, fats: 0.275 };
      case "moderately":
        return { proteins: 0.3125, carbohydrates: 0.4125, fats: 0.275 };
      case "very":
        return { proteins: 0.275, carbohydrates: 0.475, fats: 0.275 };
      case "extra":
        return { proteins: 0.275, carbohydrates: 0.525, fats: 0.225 };
      default:
        return { proteins: 0.3, carbohydrates: 0.45, fats: 0.25 };
    }
  }

  useEffect(() => {
    const macrosPercent = getMacroRatiosByActivity(activityLevel);

    const macrosInGrams = {
      proteins: Math.round((tdeeTarget * macrosPercent.proteins) / 4),
      carbohydrates: Math.round((tdeeTarget * macrosPercent.carbohydrates) / 4),
      fats: Math.round((tdeeTarget * macrosPercent.fats) / 9),
    };

    const chartData = [
      {
        value: macrosInGrams.proteins,
        label: `Proteins: ${macrosInGrams.proteins} grams`,
        valueText: `${macrosInGrams.proteins} grams`,
        fill: "#93c5fd",
        macrosPercent: macrosPercent.proteins,
      },
      {
        value: macrosInGrams.carbohydrates,
        label: `Carbohydrates: ${macrosInGrams.carbohydrates} grams`,
        valueText: `${macrosInGrams.carbohydrates} grams`,
        fill: "#fde047",
        macrosPercent: macrosPercent.carbohydrates,
      },
      {
        value: macrosInGrams.fats,
        label: `Fats: ${macrosInGrams.fats} grams`,
        valueText: `${macrosInGrams.fats} grams`,
        fill: "#fdba74",
        macrosPercent: macrosPercent.fats,
      },
    ];

    setMacroDistributionInGrams(chartData);
  }, [tdeeTarget]);

  return (
    <Link
      href={{
        pathname: "/protected/purchase",
        query: {
          tdeeTarget: JSON.stringify(tdeeTarget),
          iWantTo,
        },
      }}
    >
      <div className="flex flex-row justify-center items-center my-4  h-56 ">
        <div className="bg-zinc-900 hover:bg-zinc-800 rounded-3xl p-4  mx-2 border border-zinc-700 h-56 w-4/5">
          <div className="flex flex-col justify-center items-center ">
            <div className=" flex flex-col justify-center items-center mb-8">
              <h2 className="text-3xl text-center font-light align-middle">
                I want to <span className="text-3xl font-bold">{iWantTo}</span>
              </h2>
              {weightLossEstimateKg.length > 0 && (
                <h2 className="text-2xl font-light mt-4">
                  ( ≃ {weightLossEstimateKg}/week or {weightLossEstimatePounds}
                  /week )
                </h2>
              )}
            </div>
            <h2 className="text-xl font-light mb-4">
              Your <span className="text-xl font-semibold">{caloricGoal}</span>{" "}
              ({calculation})
            </h2>
            <div className="text-4xl font-bold ">
              {tdeeTarget}{" "}
              <span className="text-4xl font-light ">kcal / day</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
