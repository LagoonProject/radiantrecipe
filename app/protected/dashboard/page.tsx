"use client";

import { Spinner } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe/stripe";
import { getTDEETarget, getWeightGoal } from "@/lib/helpers/getWeightGoal";
import getUser from "@/lib/auth/get-user";
import { Prisma, User } from "@prisma/client";
import prisma from "@/lib/prisma/prisma";

import { Button } from "@/components/ui/button";
import { createSubscriptionStripeSession } from "@/lib/stripe/createSubscriptionCheckoutSession";
import { AppContext } from "@/context/context";
import { calculateTDEE } from "@/lib/helpers/tdeeCalculation";
import { cancelSubscription } from "@/lib/stripe/cancelSubscription";

export default function Dashboard() {
  const [userState, setUserState] = useState<User>();
  const [fetchingTDEE, setFetchingTDEE] = useState<boolean>(false);

  const { getTdee } = useContext(AppContext);
  const [tdee, setTdee] = getTdee;
  const [tdeeInfo, setTdeeInfo] = useState({
    heightCm: "",
    heightInches: "",
    weight: "",
    date_of_birth: "",
    gender: "",
    units: "international",
    activityLevel: "",
  });

  useEffect(() => {
    (async () => {
      const json = await fetch("/api/getUserFromDb");
      const res: User = await json.json();
      setUserState(res);
      setTdeeInfo({
        heightCm:
          typeof res.heightCm === "string"
            ? res.heightCm!
            : res.heightCm?.toString()!,
        heightInches: res.heightInches ? res.heightInches : "",
        weight:
          typeof res.weight === "string"
            ? res.weight!
            : res.weight?.toString()!,
        date_of_birth:
          typeof res.date_of_birth === "string"
            ? res.date_of_birth!
            : res.date_of_birth?.toString()!,
        gender: res.gender ? res.gender : "",
        units: res.units ? res.units : "",
        activityLevel: res.activityLevel ? res.activityLevel : "",
      });
      console.log("Dashboard res", res);
    })();
  }, []);

  useEffect(() => {
    calculateTDEE(tdeeInfo, setTdee, setFetchingTDEE);
  }, [tdeeInfo]);

  console.log("Dashboard user", userState?.customerPlan);

  const tdeeTarget = getTDEETarget(tdee, userState?.weightLossGoal!);

  const router = useRouter();

  return (
    <main className="  min-h-screen flex flex-col items-center justify-start">
      <div className="max-w-5xl flex flex-col items-start justify-center ">
        <div className="flex flex-col items-start justify-center ">
          <h1 className="font-normal text-2xl">Dashboard</h1>
          <div className=" flex flex-col items-start justify-center font-normal text-lg  my-4 border border-zinc-800 shadow-md shadow-zinc-800 rounded-2xl p-4 w-4/6">
            <div className=" flex flex-row items-center justify-center font-normal text-lg mb-2 ">
              <h2 className="font-normal mr-4">Radiant Recipe Plan</h2>
              <p className="text-yellow-500 font-bold">
                {userState?.customerPlan}
              </p>
            </div>
            <div className="flex flex-col items-start justify-center font-normal text-lg space-y-2">
              <div className="flex flex-row items-center justify-start font-normal text-lg  ">
                <Button
                  onClick={() =>
                    createSubscriptionStripeSession(
                      window,
                      JSON.stringify(tdeeTarget),
                      userState?.weightLossGoal ? userState?.weightLossGoal : ""
                    )
                  }
                  className="font-normal mr-4 rounded"
                >
                  Go pro
                </Button>
                <p className=" text-sm ">
                  Access thousands of delicious recipes corresponding to your
                  exact caloric goals and preparation time.
                </p>
              </div>
              <div className="flex flex-row items-center justify-start font-normal text-lg  ">
                <Button
                  onClick={() => {
                    (async () => {
                      await cancelSubscription();
                      location.reload();
                    })();
                  }}
                  className="font-normal mr-4 rounded bg-red-700 hover:bg-red-800"
                >
                  Unsubscribe
                </Button>
              </div>
            </div>
          </div>
          <div className=" flex flex-col items-start justify-center font-normal text-lg  my-4 border  rounded-2xl p-4 w-4/6">
            <div className="w-full flex flex-row items-center justify-between font-light text-lg mb-2 ">
              <h2 className="mr-4  ">My caloric daily needs </h2>
              <p className="font-extralight">
                <span className="font-bold">{tdee} </span>calories
              </p>
            </div>
            <div className="w-full  flex flex-row items-center justify-between  font-light text-lg mb-2 ">
              <h2 className="mr-4 ">My weight loss goal</h2>
              <p>{userState?.weightLossGoal}</p>
            </div>
            <div className="w-full flex flex-row items-center justify-between font-light text-lg mb-2 ">
              <h2 className="font-light mr-4 ">My caloric daily goal</h2>
              <p className="font-extralight">
                <span className="font-bold"> {tdeeTarget} </span>calories
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
