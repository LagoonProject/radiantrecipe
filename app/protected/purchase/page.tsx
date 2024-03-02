"use client";

import { Spinner } from "@nextui-org/react";
import React, { useContext, useEffect } from "react";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe/stripe";
import { getWeightGoal } from "@/lib/helpers/getWeightGoal";
import { createSubscriptionStripeSession } from "@/lib/stripe/createSubscriptionCheckoutSession";

export default function Purchase({ searchParams }: any) {
  const { tdeeTarget, iWantTo } = searchParams;

  const weightGoal = getWeightGoal(iWantTo);

  async function createOneMealPlanStripeSession() {
    console.log("createOneMealPlan");

    const res = await fetch(
      "/api/payment/createOneMealPlanStripeCheckoutSession",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tdeeTarget, iWantTo }), // body data type must match "Content-Type" header
      }
    );

    console.log("createOneMealPlan res", res);

    const { sessionUrl } = await res.json();

    console.log("createOneMealPlan sessionUrl", sessionUrl);

    window.location.assign(sessionUrl);
  }

  return (
    <main className="  min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-5xl flex flex-col items-start justify-center ">
        <div className="w-full flex flex-col items-start justify-center my-2">
          <div className="w-full flex flex-col items-center justify-center my-8">
            <h2 className="font-normal text-2xl my-2">
              Achieve your goal of{" "}
              <span className="font-bold">{tdeeTarget} Calories Per Day</span>
            </h2>
            <h2 className="font-normal text-4xl  mt-2 mb-8">
              <span className="font-bold">Lose {weightGoal}</span> per week!
            </h2>
          </div>
          <h2 className="font-normal text-2xl  my-2 leading-relaxed">
            Knowing exactly what to eat to consume precisely {tdeeTarget}{" "}
            calories each day can be challenging.
          </h2>
          <h2 className="font-normal text-2xl mt-2 mb-12 leading-relaxed">
            That&apos;s why we offer you a{" "}
            <span className="font-bold">Personalized Weekly Meal Plan</span>.
            This plan is meticulously crafted to meet your daily caloric needs,
            providing you with exactly{" "}
            <span className="font-bold">{tdeeTarget} calories per day</span> for
            a week, assisting you in losing 0.45 kg (1 pound) every week.
          </h2>

          <h2 className="font-bold text-xl my-2">How Does It Work?</h2>
          <h3 className="font-normal text-lg my-2 leading-relaxed">
            Get your Personalized Weekly Meal Plan for only 1€ - that&apos;s
            right, a one-time payment of 1€, with no subscription required.
          </h3>
          <h3 className="font-normal text-lg mt-2 mb-6 leading-relaxed">
            This includes 21 delicious recipes, divided into three meals per day
            (breakfast, lunch, and dinner) for seven days. Each recipe is
            carefully selected to ensure you reach your daily caloric goals and
            support your weight loss journey.
          </h3>
          <h2 className="font-bold text-xl my-2">
            Will I Really Consume My Goal of {tdeeTarget} Calories Per Day by
            Following These Recipes?
          </h2>
          <h3 className="font-normal text-lg mt-2 mb-6 leading-relaxed">
            Absolutely. Your Personalized Meal Plan is designed to provide the
            exact amount of calories needed to help you achieve your caloric
            goal and lose weight.
          </h3>
          <h2 className="font-bold text-xl my-2">
            What If I Want to build my own Personalized Meal Plan?
          </h2>
          <h3 className="font-normal text-lg mt-2 mb-6 leading-relaxed">
            Now that you know how much calories you need to lose weight, you can
            search our database for recipes that match the exact amount of
            calories you need. You want a lunch for 600 calories? Our search
            tool will provide dozens of recipes meeting your criteria of 600
            calories. Simply subscribe to our service for 9.99/month, and take
            control of your body needs.
          </h3>

          <h2 className="font-bold text-xl my-2">Is Weight Loss Guaranteed?</h2>
          <h3 className="font-normal text-lg mt-2 mb-6 leading-relaxed">
            Our weight loss system is grounded in establishing a daily caloric
            deficit, a method supported by scientific research as a highly
            effective way to lose weight. However, results may vary based on
            individual circumstances and adherence to the Personalized Meal
            Plan, so we cannot guarantee specific outcomes.
          </h3>
          <h2 className="font-bold text-xl my-2">
            Interested in a Subscription?
          </h2>
          <h3 className="font-normal text-lg mt-2 mb-6 leading-relaxed">
            If you&apos;re seeking variety and flexibility in your diet, this is
            an excellent choice. Enjoy a Personalized Meal Plan with recipes
            targeting you caloric goals each month for just €9.99. You can
            cancel the subscription at any time.
          </h3>
        </div>
        <div className="w-full text-3xl flex flex-col items-center justify-center my-4">
          <h2 className="font-semibold text-xl mt-2 mb-12">
            Sounds Appealing? Choose Your Option and Start Losing Weight Today!
          </h2>
          <div className="flex flex-row justify-between items-center space-x-4 ">
            <div
              onClick={createOneMealPlanStripeSession}
              className="flex flex-col justify-center items-center border border-zinc-600 rounded-2xl p-4 bg-zinc-900 w-2/4 h-64 hover:bg-zinc-800"
            >
              <h2 className="font-bold text-xl my-2">
                Weekly Personalized Meal Plan
              </h2>
              <h2 className="font-light text-base my-2">
                21 meals tailored to your daily calorie goals.
              </h2>
              <h2 className="font-bold text-3xl my-2">1€</h2>
              <h2 className="font-light text-base my-2">
                One-time payment. No subscription.
              </h2>
            </div>

            <div
              onClick={() =>
                createSubscriptionStripeSession(window, tdeeTarget, iWantTo)
              }
              className="flex flex-col justify-center items-center border border-zinc-600 rounded-2xl p-4 bg-zinc-900 w-2/4 h-64 hover:bg-zinc-800"
            >
              <h2 className="font-bold text-xl my-2">Radiant Recipe Pro</h2>
              <h2 className="font-light text-base my-2 text-center">
                Access thousands of delicious recipes corresponding to your
                exact caloric goals and preparation time, and build your own
                meal plans.
              </h2>
              <h2 className="font-bold text-3xl my-2">3.99€/month</h2>
              <h2 className="font-light text-base my-2">Cancel anytime.</h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
