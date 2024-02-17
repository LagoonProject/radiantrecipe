"use client";

import { AppContext } from "@/context/context";
import { calculateAge, calculateTDEE } from "@/lib/helpers/tdeeCalculation";
import { useContext, useState, useEffect } from "react";

export function MyInfos() {
  const { getMyInfos, getTdee } = useContext(AppContext);
  const [tdee, setTdee] = getTdee;
  const [myInfos, setMyInfos] = getMyInfos;
  const age = calculateAge(myInfos?.dateOfbirth);

  const weight =
    myInfos?.units === "international"
      ? myInfos?.weight + " kg"
      : myInfos?.weight + " lb";
  const height =
    myInfos?.units === "international"
      ? myInfos?.heightCm + " cm"
      : `${myInfos?.heightFeet}' ${myInfos?.heightInches}"`;
  const activityLevel =
    myInfos?.activityLevel === "sedentary"
      ? "I'm mostly sedentary"
      : `I'm mostly ${myInfos?.activityLevel} active`;

  useEffect(() => {
    (async () => {
      const json = await fetch("/api/getUserFromDb");
      const res = await json.json();

      console.log("getUserFromDb", res)

      const myInfosToUse = {
        id: res.id,
        email: res.email,
        weight: res.weight,
        heightCm: res.heightCm,
        heightFeet: res.heightFeet,
        heightInches: res.heightInches,
        units: res.units,
        gender: res.gender,
        dateOfbirth: res.date_of_birth,
        activityLevel: res.activityLevel,
      };

      setMyInfos(myInfosToUse);
    })();
  }, []);

  useEffect(() => {
    const tdeeInfo = {
      heightCm: myInfos?.heightCm!,
      heightFeet: myInfos?.heightFeet!,
      heightInches: myInfos?.heightInches!,
      weight: myInfos?.weight!,
      date_of_birth: myInfos?.dateOfbirth!,
      gender: myInfos?.gender!,
      units: myInfos?.units!,
      activityLevel: myInfos?.activityLevel!,
    };
    calculateTDEE(tdeeInfo, setTdee);
  }, [myInfos]);

  return (
    <div className="mt-4 pb-8 text-xs">
      <h2 className="font-semibold">My infos</h2>
      <p className="font-thin">
        Weight: <span className="font-bold">{weight}</span>
      </p>
      <p className="font-thin">
        Height: <span className="font-bold">{height}</span>
      </p>
      <p className="font-thin">
        Activity level: <span className="font-bold">{activityLevel}</span>
      </p>
      <p className="font-thin">
        Age: <span className="font-bold">{age}</span>
      </p>
      <p className="font-thin">
        Calorie needs:<span className="font-bold">{tdee}</span> calories
      </p>
    </div>
  );
}
