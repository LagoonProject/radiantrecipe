"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectItem } from "@nextui-org/react";
import {
  calculateAge,
  calculateTDEE,
  convertHeightToInches,
  truncateNumber,
} from "../../lib/helpers/tdeeCalculation";
import { WeightPlans } from "./WeightPlans";
import { Input } from "@/components/ui/input";
import { Input as InputUI } from "@nextui-org/react";

import { RadioGroup, Radio } from "@nextui-org/react";
import { InputMask } from "primereact/inputmask";

import { MessageCircleWarning } from "lucide-react";
import { AppContext } from "@/context/context";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
  FormDescription,
} from "@/components/ui/form";

const formSchema = z.object({
  heightCm: z.string().optional(),
  heightInches: z.string().optional(),
  weight: z.string(),
  units: z.string(),
  dateOfBirth: z.string(),
  gender: z.string(),
  activityLevel: z.string(),
});

export const CalculateTDEE = () => {
  const { getTdee } = useContext(AppContext);
  const [tdee, setTdee] = getTdee;

  // form state

  const [tdeeInfo, setTdeeInfo] = useState({
    heightCm: "",
    heightInches: "",
    weight: "",
    date_of_birth: "",
    gender: "",
    units: "international",
    activityLevel: "",
  });

  // activity BMR multiplier for TDEE

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      units: "international",
      gender: "female",
      dateOfBirth: "1997-01-01",
      activityLevel: "sedentary",
    },
  });

  const units = form.watch("units");
  console.log("units", units);

  async function getTdeeInfoFromDb() {
    console.log("getTdeeInfoFromDb");

    const res = await fetch("/api/getTdeeInfoFromDb");

    if (!res.ok) {
      throw new Error("Failed to create save user info.");
    }

    const tdeeInfoFromDb = await res.json();

    setTdeeInfo(tdeeInfoFromDb);
  }

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

  // Handler for form submission
  const onSubmit = async (tdeeFormData: any) => {
    console.log("onSubmit values", tdeeFormData);

    const res = await fetch("/api/updateTdeeInfo", {
      method: "POST",
      body: JSON.stringify({ tdeeFormData }),
      //@ts-ignore
      "Content-Type": "application/json",
    });
    if (!res.ok) {
      throw new Error("Failed to create save user info.");
    }

    await getTdeeInfoFromDb();
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-5xl ">
      <div className="flex flex-col items-center justify-center">
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
        <div className="flex flex-col items-start py-6 px-10 rounded-3xl border border-zinc-800 shadow-md  shadow-slate-700 bg-zinc-900 w-unit-8xl ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-start justify-center space-y-6"
              method="post"
            >
              {units === "international" && (
                <FormField
                  name="heightCm"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col ">
                        <FormLabel className="font-semibold">
                          Height (cm)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="180"
                            type="number"
                            className="bg-input w-24"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              )}
              {units === "american" && (
                <FormField
                  name="heightInches"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col ">
                        <FormLabel className="font-semibold ">
                          Height (ft)
                        </FormLabel>
                        <FormControl>
                          <InputMask
                            value={field.value}
                            onChange={field.onChange}
                            mask="9ft 9in"
                            placeholder="5ft 8in"
                            className="flex h-10 w-24 rounded-md border border-input bg-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              )}
              <FormField
                name="weight"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Weight {units === "american" ? "(lb)" : "(kg)"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="70"
                          type="number"
                          className="bg-input w-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                name="units"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>Measurement Units</FormLabel>

                      <FormControl>
                        <Select
                          defaultSelectedKeys={["international"]}
                          onChange={field.onChange}
                          size={"sm"}
                          label="Select a unit"
                          className="w-52"
                        >
                          <SelectItem key="international" value={field.value}>
                            International (cm / kg)
                          </SelectItem>
                          <SelectItem key="american" value={field.value}>
                            American (ft / lb)
                          </SelectItem>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="dateOfBirth"
                control={form.control}
                render={({ field }) => {
                  console.log("field", field);
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Birth</FormLabel>

                      <FormControl>
                        <InputUI
                          size="sm"
                          type="date"
                          name="dateOfBirth"
                          placeholder="01/01/1997"
                          value={field.value}
                          onChange={field.onChange}
                          className="  w-36"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="gender"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>Sex</FormLabel>

                      <FormControl>
                        <Select
                          defaultSelectedKeys={["female"]}
                          onChange={field.onChange}
                          size={"sm"}
                          label="Select your sex"
                          className="w-52"
                        >
                          <SelectItem key="female" value={field.value}>
                            Female
                          </SelectItem>

                          <SelectItem key="male" value={field.value}>
                            Male
                          </SelectItem>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="activityLevel"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>Activity Level</FormLabel>

                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          label="Whati s your daily activity level?"
                        >
                          <Radio onChange={field.onChange} value="sedentary">
                            I&apos;m sedentary.{" "}
                            <span className="text-sm font-light ">
                              I do little to no exercise and spend most of my
                              day sitting (working at a desk job...).
                            </span>
                          </Radio>
                          <Radio onChange={field.onChange} value="lightly">
                            I&apos;m lightly active.{" "}
                            <span className="text-sm font-light ">
                              I engage in light exercise one to three days per
                              week (walking, yoga...).
                            </span>
                          </Radio>
                          <Radio onChange={field.onChange} value="moderately">
                            I&apos;m moderately active.{" "}
                            <span className="text-sm font-light ">
                              I perform moderate exercise three to five days a
                              week (jogging, swimming, cycling at a brisk
                              pace...).
                            </span>
                          </Radio>
                          <Radio onChange={field.onChange} value="very">
                            I&apos;m very active.{" "}
                            <span className="text-sm font-light ">
                              I engage in hard exercise six to seven days a week
                              (intense cycling, running, swimming...).
                            </span>
                          </Radio>
                          <Radio onChange={field.onChange} value="extra">
                            I&apos;m extra active.
                            <span className="text-sm font-light ">
                              I engage in very hard exercise and have a
                              physically demanding job (elite athletes,
                              construction workers...).
                            </span>
                          </Radio>
                        </RadioGroup>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button type="submit" className="rounded-2xl">
                Submit
              </Button>
            </form>
          </Form>
        </div>
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
