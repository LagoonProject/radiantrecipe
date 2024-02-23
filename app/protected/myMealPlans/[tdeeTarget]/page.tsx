"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { MacroPie } from "@/app/Components/MacrosPie";
import { getWeightGoal } from "@/lib/helpers/getWeightGoal";
import { MyInfos } from "@/app/Components/MyInfos";
import { AppContext } from "@/context/context";

export interface Meal {
  id: number;
  title: string;
  servings: number;
  imageType: string;
  sourceUrl: string;
  readyInMinutes: number;
}

export interface DailyMeals {
  meals: Meal[];
  nutrients: {
    fat: number;
    protein: number;
    calories: number;
    carbohydrates: number;
  };
}

export interface Week {
  [key: string]: DailyMeals; // Dynamically define the days of the week
}

export interface MealPlan {
  week: Week;
}

export interface MealPlanResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  caloriesGoal: string;
  mealPlan: MealPlan;
  recipes: Recipe[];
  userId: string;
}

export default function MyMealPlan({ searchParams }: any) {
  const { tdeeTarget } = useParams();
  const { iWantTo } = searchParams;

  const { getMealPlans } = useContext(AppContext);
  const [mealPlans, setMealPlans] = getMealPlans;

  const router = useRouter();

  console.log("searchParams mealPlans", iWantTo);

  const weightLossGoal = getWeightGoal(iWantTo);

  useEffect(() => {
    if (!mealPlans || mealPlans.length === 0) {
      fetch("/api/meals/getMealPlansFromDb").then((result) => {
        (async () => {
          const res = await result.json();

          console.log("res du get meal plan", res);

          if (res.length === 0) {
            fetch("/api/meals/getAMealPlanFromApi", {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ tdeeTarget }), // body data type must match "Content-Type" header
            }).then((result) => {
              (async () => {
                const res = await result.json();

                console.log("/api/meals/getAMealPlanFromApi", res);

                setMealPlans([res]);
              })();
            });
          } else {
            setMealPlans(res);
          }
        })();
      });
    }
  }, []);

  console.log("MyMealPlans", mealPlans);

  function handleClickRow(recipeId: string) {
    router.push(`/protected/recipe/${recipeId}`);
  }

  if (mealPlans && mealPlans.length > 0) {
    return (
      <main className=" min-h-screen flex flex-col items-center justify-center">
        <div className="xl:absolute top-16 left-0  p-4 m-2 border rounded-2xl">
          <MyInfos />
        </div>
        <div className="container   flex flex-col items-center justify-center py-12 ">
          <h2 className=" text-3xl font-light my-2">
            My <span className=" font-bold   ">Personalized Meal Plan</span> for{" "}
            <span className=" font-bold   ">{tdeeTarget} calories</span> a day
          </h2>
          <h3 className=" text-2xl font-light my-4">
            to lose <span className=" font-bold   ">{weightLossGoal}</span> per
            week
          </h3>
          {mealPlans.map((e) => {
            return Object.entries(e.mealPlan.week).map(
              ([day, dailyMeals], index) => {
                const macroDistributionInGrams = [
                  {
                    value: dailyMeals.nutrients.protein,
                    label: `Proteins : ${dailyMeals.nutrients.protein}g`,
                    fill: "#60a5fa",
                  },
                  {
                    value: dailyMeals.nutrients.carbohydrates,
                    label: `Carbohydrates : ${dailyMeals.nutrients.carbohydrates}g`,
                    fill: "#fde047",
                  },
                  {
                    value: dailyMeals.nutrients.fat,
                    label: `Fat : ${dailyMeals.nutrients.fat}g`,
                    fill: "#fb923c",
                  },
                ];

                return (
                  <div
                    className="my-6 w-4/5 flex flex-col items-center justify-center border rounded-3xl py-6 bg-zinc-950 border-zinc-700"
                    key={day}
                  >
                    <h2 className="my-4 text-2xl font-medium text-zinc-300">
                      Day {index + 1}
                    </h2>

                    <p className="my-4 text-xl font-bold ">
                      {dailyMeals.nutrients.calories}
                      <span className="my-4 text-lg font-light ">
                        {" "}
                        calories
                      </span>
                    </p>
                    <MacroPie
                      macroDistributionInGrams={macroDistributionInGrams}
                    />

                    <div className="w-4/5 flex flex-col items-center justify-center  ">
                      <Table
                        className="w-5/6"
                        isStriped
                        aria-label="My Personalized Meal Plan"
                        onRowAction={(key) => handleClickRow(key as string)}
                      >
                        <TableHeader>
                          <TableColumn align="center">
                            <div className="flex items-center justify-center">
                              MEAL
                            </div>
                          </TableColumn>
                          <TableColumn align="center">
                            <div className="flex items-center justify-center">
                              TITLE
                            </div>
                          </TableColumn>
                          <TableColumn align="center">
                            <div className="flex items-center justify-center">
                              READY IN
                            </div>
                          </TableColumn>
                          <TableColumn align="center">
                            <div className="flex items-center justify-center">
                              SERVINGS
                            </div>
                          </TableColumn>
                        </TableHeader>
                        <TableBody>
                          {dailyMeals.meals.map((meal, i) => (
                            <TableRow key={meal.id}>
                              <TableCell>
                                {i === 0
                                  ? "BEAKFAST"
                                  : i === 1
                                  ? "LUNCH"
                                  : "DINNER"}
                              </TableCell>
                              <TableCell>{meal.title}</TableCell>
                              <TableCell>
                                <div className="flex items-center justify-center">
                                  {meal.readyInMinutes}min
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center justify-center">
                                  {meal.servings}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                );
              }
            );
          })}
        </div>
      </main>
    );
  }
}
