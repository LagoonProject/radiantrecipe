"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState, useRef } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

import {
  calculateAge,
  calculateTDEE,
  convertHeightToInches,
  truncateNumber,
} from "../../lib/helpers/tdeeCalculation";
import { Input, Spinner } from "@nextui-org/react";
import { MacroPie } from "./MacrosPie";
import { RadioGroup, Radio } from "@nextui-org/react";
import { WeightPlans } from "./WeightPlans";

import { MessageCircleWarning } from "lucide-react";
import { AppContext } from "@/context/context";

export const CalculateTDEE = () => {
  const { getTdee } = useContext(AppContext);
  const [tdee, setTdee] = getTdee;

  // Calculate TDEE
  const [tdeeInfoForm, setTdeeInfoForm] = useState({
    heightCm: "",
    heightFeet: "",
    heightInches: "",
    weight: "",
    dateOfBirth: "",
    gender: "",
    units: "international",
    activityLevel: "",
  });

  const [tdeeInfo, setTdeeInfo] = useState({
    heightCm: "",
    heightFeet: "",
    heightInches: "",
    weight: "",
    date_of_birth: "",
    gender: "",
    units: "international",
    activityLevel: "",
  });

  // Handler for changing input values
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTdeeInfoForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function getTdeeInfoFromDb() {
    console.log("getTdeeInfoFromDb");

    const res = await fetch("/api/getTdeeInfoFromDb");

    if (!res.ok) {
      throw new Error("Failed to create save user info.");
    }

    const tdeeInfoFromDb = await res.json();

    setTdeeInfo(tdeeInfoFromDb);
  }

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("tdeeInfoForm fetch", tdeeInfoForm);

    const res = await fetch("/api/updateTdeeInfo", {
      method: "POST",
      body: JSON.stringify({ tdeeInfoForm }),
      //@ts-ignore
      "Content-Type": "application/json",
    });
    if (!res.ok) {
      throw new Error("Failed to create save user info.");
    }

    await getTdeeInfoFromDb();
  };

  useEffect(() => {
    console.log("useEffect");
    (async () => {
      await getTdeeInfoFromDb();
    })();
  }, []);

  // activity BMR multiplier for TDEE

  // BMR formulas

  useEffect(() => {
    calculateTDEE(tdeeInfo, setTdee);
  }, [tdeeInfo]);

  const resultsRef = useRef<any>(null);

  useEffect(() => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [tdee]);

  // macro ratios

  // for weight loss generic

  // protein : 25/35%
  // carbohydrates : 40/50%
  // fat : 20/30%

  // Sedentary :
  // protein : 35 - 40%
  // carbohydrates :  35 - 40%
  // fats :  20 - 30%

  // Lightly :
  // protein : 30 - 35%
  // carbohydrates : 40 - 45%
  // fats : 25 - 30%

  // Moderately :
  // protein : 30 - 35 %
  // carbohydrates : 40 - 45%
  // fats : 25 - 30%

  // Very active :
  // protein : 25 - 30%
  // carbohydrates : 45 - 50%
  // fats : 25 - 30%

  // Extra active :
  // protein : 25 - 30%
  // carbohydrates : 50 - 55%
  // fats : : 20 - 25%

  // activity BMR multiplier for TDEE

  return (
    <div className="flex flex-col items-center justify-center max-w-5xl ">
      <div>
        <h2 className="text-xl font-bold mb-4 flex flex-col items-center  ">
          Calculate your Total Daily Energy Expenditure (TDEE)
        </h2>
        <div className="p-4  mb-4 ">
          <p className="text-xl text-zinc-200">
            Creating a caloric deficit by consuming less than your TDEE is the
            foundational principle of weight loss. Keep in mind that it&apos;s
            also important to approach this process mindfully, focusing on
            health and sustainable habits rather than just the numbers on the
            scale.
          </p>
        </div>
        <div className="bg-zinc-800 p-4  mb-10 flex flex-row ">
          <MessageCircleWarning size={50} />

          <p className="text-white ml-4">
            For significant weight loss or if you have any health conditions,
            consult with a healthcare provider or a dietitian. They can provide
            personalized advice to ensure that your weight loss plan is safe and
            effective.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-3"
          method="post"
        >
          <div className="flex flex-col items-start py-6 px-10 rounded-3xl border border-zinc-800 shadow-md  shadow-slate-700 w-unit-8xl bg-zinc-950">
            {tdeeInfoForm.units === "american" && (
              <div className="my-4">
                <label htmlFor="heightFeet" className="my-4 font-semibold">
                  Height
                </label>
                <div className="flex flex-row items-center justify-around mt-2">
                  <Input
                    size="sm"
                    type="number"
                    id="heightFeet"
                    name="heightFeet"
                    placeholder="6"
                    value={tdeeInfoForm.heightFeet}
                    onChange={handleChange}
                  />

                  <span className="ml-2 mr-4">feet</span>

                  <Input
                    size="sm"
                    type="number"
                    id="heightInches"
                    name="heightInches"
                    placeholder="2"
                    value={tdeeInfoForm.heightInches}
                    onChange={handleChange}
                  />
                  <span className="ml-2 mr-4">inches</span>
                </div>
              </div>
            )}
            {tdeeInfoForm.units === "international" && (
              <div className="w-1/3 my-4 ">
                <label htmlFor="height" className="font-semibold">
                  Height
                </label>
                <Input
                  size="sm"
                  type="number"
                  id="heightCm"
                  name="heightCm"
                  placeholder="183"
                  value={tdeeInfoForm.heightCm}
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>
            )}
            <div className="w-1/3 my-4">
              <label htmlFor="weight" className=" my-4 font-semibold">
                Weight
              </label>
              <Input
                size="sm"
                type="number"
                id="weight"
                name="weight"
                placeholder="80"
                value={tdeeInfoForm.weight}
                onChange={handleChange}
                className="mt-2"
              />
            </div>
            <div className=" w-2/3 my-4">
              <label htmlFor="units" className="font-semibold">
                Measurement Units
              </label>
              <Select
                id="units"
                name="units"
                value={tdeeInfoForm.units}
                onChange={handleChange}
                label="Select..."
                className="max-w-xs mt-2"
              >
                <SelectItem
                  classNames={{
                    base: "base-classes",
                    title: "label-classes",
                    wrapper: "wrapper-classes",
                    description: "description-classes",
                    selectedIcon: "selected-icon-classes",
                    shortcut: "shortcut-classes",
                  }}
                  key="american"
                  value="american"
                >
                  American (inches, lbs)
                </SelectItem>
                <SelectItem
                  classNames={{
                    base: "base-classes",
                    title: "label-classes",
                    wrapper: "wrapper-classes",
                    description: "description-classes",
                    selectedIcon: "selected-icon-classes",
                    shortcut: "shortcut-classes",
                  }}
                  key="international"
                  value="international"
                >
                  International (cm, kg)
                </SelectItem>
              </Select>
            </div>
            <div className="w-1/3 my-4">
              <label htmlFor="dateOfBirth" className="font-semibold">
                Date of Birth
              </label>
              <Input
                size="sm"
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                placeholder="2"
                value={tdeeInfoForm.dateOfBirth}
                onChange={handleChange}
                className="mt-2"
              />
            </div>
            <div className="w-1/3 my-4">
              <label htmlFor="gender" className="font-semibold">
                Sex
              </label>
              <Select
                id="gender"
                name="gender"
                value={tdeeInfoForm.gender}
                onChange={handleChange}
                label="Select..."
                className="max-w-xs mt-2"
              >
                <SelectItem key="male" value="male">
                  Male
                </SelectItem>
                <SelectItem key="female" value="female">
                  Female
                </SelectItem>
              </Select>

              <div className="my-10 w-96 ">
                <RadioGroup
                  value={tdeeInfoForm.activityLevel}
                  onValueChange={(value) =>
                    setTdeeInfoForm((prevState) => ({
                      ...prevState,
                      activityLevel: value,
                    }))
                  }
                  label="What is your daily activity level?"
                >
                  <Radio value="sedentary">
                    I&apos;m sedentary.{" "}
                    <span className="text-sm font-thin ">
                      I do little to no exercise and spend most of my day
                      sitting (working at a desk job...).
                    </span>
                  </Radio>
                  <Radio value="lightly">
                    I&apos;m lightly active.{" "}
                    <span className="text-sm font-thin ">
                      I engage in light exercise one to three days per week
                      (walking, yoga...).
                    </span>
                  </Radio>
                  <Radio value="moderately">
                    I&apos;m moderately active.{" "}
                    <span className="text-sm font-thin ">
                      I perform moderate exercise three to five days a week
                      (jogging, swimming, cycling at a brisk pace...).
                    </span>
                  </Radio>
                  <Radio value="very">
                    I&apos;m very active.{" "}
                    <span className="text-sm font-thin ">
                      I engage in hard exercise six to seven days a week
                      (intense cycling, running, swimming...).
                    </span>
                  </Radio>
                  <Radio value="extra">
                    I&apos;m extra active.
                    <span className="text-sm font-thin ">
                      I engage in very hard exercise and have a physically
                      demanding job (elite athletes, construction workers...).
                    </span>
                  </Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
          <Button size="lg" type="submit" className="my-6 font-semibold">
            Submit
          </Button>
        </form>
      </div>
      <div ref={resultsRef}>
        <div className="text-3xl font-thin my-10 ">
          Your{" "}
          <span className=" font-semibold">
            Total Daily Energy Expenditure (TDEE)
          </span>{" "}
          is <span className="font-semibold">{tdee} kcal/day</span>{" "}
          <p className="text-base text-white mt-2">
            This is the amount of calories you need to consume daily to maintain
            your actual weight according to your activity level.
          </p>
        </div>

        <WeightPlans
          tdeeTarget={tdee - 500}
          iWantTo={"lose weight in a sustainable way"}
          activityLevel={tdeeInfo.activityLevel}
          caloricGoal={"Daily Caloric Goal"}
          weightLossEstimateKg="0.45kg"
          weightLossEstimatePounds="1 pound"
          calculation={"TDEE - 500 kcal"}
        />
        <WeightPlans
          tdeeTarget={tdee - 1000}
          iWantTo={"lose weight fast"}
          activityLevel={tdeeInfo.activityLevel}
          caloricGoal={"Daily Caloric Goal"}
          weightLossEstimateKg="0.9kg"
          weightLossEstimatePounds="2 pound"
          calculation={"TDEE - 1000 kcal"}
        />
        <WeightPlans
          tdeeTarget={tdee}
          iWantTo={"maintain weight"}
          activityLevel={tdeeInfo.activityLevel}
          caloricGoal={"Daily Caloric Goal"}
          weightLossEstimateKg=""
          weightLossEstimatePounds=""
          calculation={"TDEE"}
        />
      </div>
    </div>
  );
};
