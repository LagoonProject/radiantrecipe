"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

interface DayData {
  meals: Meal[];
  nutrients?: Nutrients; // Assuming nutrients is optional and has a structure you'd define similarly
}

interface Meal {
  // Define the structure of a meal object here

  id: number;
  title: string;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
}

// Optional: Define the structure of a nutrients object, if you have one
interface Nutrients {
  // Example properties
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  // Add other nutrient details as necessary
}

export interface IMealPlan {
  week: {
    [key: string]: DayData; // Use the DayData interface to type each day's data
  };
}
export default function MyMealPlan() {
  const { tdee } = useParams();
  const [mealPlan, setMealPlan] = useState<IMealPlan>();

  useEffect(() => {
    if (!mealPlan) {
      fetch("/api/meals/getAMealPlanFromApi", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tdee }), // body data type must match "Content-Type" header
      }).then((result) => {
        (async () => {
          const res = await result.json();

          setMealPlan(res);
        })();
      });
    }
  }, []);

  console.log("MyMealPlan", mealPlan);
  if (mealPlan) {
    return (
      <main className=" min-h-screen flex flex-col items-center justify-center">
        <div className="container   flex flex-col items-center justify-center py-12 ">
          <h2 className=" text-3xl flex flex-col items-center justify-center my-2">
            My Personalized Meal Plan
          </h2>
          {Object.entries(mealPlan.week).map(([day, data]) => (
            <div
              className="my-4 w-4/5 flex flex-col items-center justify-center "
              key={day}
            >
              <h3 className='my-4'>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>{" "}
              {/* Capitalize the day name */}
              <div className="w-4/5 flex flex-col items-center justify-center  ">
                <Table
                  className="w-5/6"
                  isStriped
                  aria-label="My Personalized Meal Plan"
                >
                  <TableHeader >
                    <TableColumn align="center" >MEAL</TableColumn>
                    <TableColumn   align="center" >TITLE</TableColumn>
                    <TableColumn align="center" >READY IN</TableColumn>
                    <TableColumn align="center" >SERVINGS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {data.meals.map((meal, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          {i === 0 ? "BEAKFAST" : i === 1 ? "LUNCH" : "DINNER"}
                        </TableCell>
                        <TableCell >{meal.title}</TableCell>
                        <TableCell >{meal.readyInMinutes}</TableCell>
                        <TableCell>{meal.servings}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <ul></ul>
              </div>
              {/* You can also display nutrients here similarly by accessing data.nutrients */}
            </div>
          ))}
        </div>
      </main>
    );
  }
}
