"use client";

import { useContext, useEffect, useState } from "react";

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
  tdee: number;
  iWantTo: string;
  activityLevel: string;
  caloricGoal:string;
  weightLossEstimateKg: string;
  weightLossEstimatePounds: string;
  calculation: string
}

export function WeightPlans({
  tdee,
  iWantTo,
  activityLevel,
  caloricGoal,
  weightLossEstimateKg,
  weightLossEstimatePounds,
  calculation
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
      proteins: Math.round((tdee * macrosPercent.proteins) / 4),
      carbohydrates: Math.round((tdee * macrosPercent.carbohydrates) / 4),
      fats: Math.round((tdee * macrosPercent.fats) / 9),
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
  }, [tdee]);
  return (
    <div className="bg-zinc-950 rounded-3xl py-6 my-6 border border-zinc-700">
      <div className="flex flex-col justify-center items-center ">
        <div className=" flex flex-col justify-center items-center mb-8">
          <h2 className="text-3xl font-thin ">
            I want to <span className="text-3xl font-bold">{iWantTo}</span>
          </h2>
          {weightLossEstimateKg.length > 0 && (
            <h2 className="text-2xl font-thin mt-4">
              ( ≃ {weightLossEstimateKg}/week or {weightLossEstimatePounds}/week
              )
            </h2>
          )}
        </div>
        <h2 className="text-xl font-thin mb-4">
          Your{" "}
          <span className="text-xl font-semibold">
            {caloricGoal}
          </span>{" "}
         ({calculation})
        </h2>
        <div className="text-4xl font-bold ">
          {tdee} <span className="text-4xl font-thin ">kcal / day</span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center my-10 ">
        <h2 className="text-xl font-thin mb-6">
          Your{" "}
          <span className="text-xl font-semibold">
            Macronutrient Distribution Plan
          </span>{" "}
          per day
        </h2>
        <div className="flex flex-col justify-center items-center text-2xl  text-white  ">
          <Table
            isStriped
            aria-label="Macronutrient Distribution Plan in % and grams"
            className="w-3/5 mt-0"
          >
            <TableHeader>
              <TableColumn className="text-blue-400 text-base">
                Proteins
              </TableColumn>
              <TableColumn className="text-yellow-400 text-base">
                Carbohydrates
              </TableColumn>
              <TableColumn className="text-orange-400 text-base">
                Fats
              </TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-blue-300 text-lg">
                  {truncateNumber(
                    macroDistributionInGrams[0].macrosPercent * 100
                  )}
                  % <span className="text-zinc-400 text-xs">(1)</span>
                </TableCell>
                <TableCell className="text-yellow-300 text-lg">
                  {truncateNumber(
                    macroDistributionInGrams[1]?.macrosPercent * 100
                  )}
                  % <span className="text-zinc-400 text-xs">(1)</span>
                </TableCell>
                <TableCell className="text-orange-300 text-lg">
                  {truncateNumber(
                    macroDistributionInGrams[2]?.macrosPercent * 100
                  )}
                  % <span className="text-zinc-400 text-xs">(1)</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-blue-300 text-lg">
                  {macroDistributionInGrams[0].valueText}
                </TableCell>
                <TableCell className="text-yellow-300 text-lg">
                  {macroDistributionInGrams[1]?.valueText}
                </TableCell>
                <TableCell className="text-orange-300 text-lg">
                  {macroDistributionInGrams[2]?.valueText}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-zinc-300 text-xs">
            (1) percent of daily <span className="font-bold">calories</span>{" "}
            (kcal)
          </p>
          <div className="text-lg">
            <MacroPie macroDistributionInGrams={macroDistributionInGrams} />
          </div>
        </div>
      </div>
    </div>
  );
}
