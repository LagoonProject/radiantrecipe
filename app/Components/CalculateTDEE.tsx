"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  calculateAge,
  calculateTDEE,
  convertHeightToInches,
  truncateNumber,
} from "../../lib/helpers/tdeeCalculation";

import { Input } from "@/components/ui/input";
import { Input as InputUI } from "@nextui-org/react";

import { MacroPie } from "./MacrosPie";
import { RadioGroup, Radio } from "@nextui-org/react";
import { WeightPlans } from "./WeightPlans";

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

const formSchema = z
  .object({
    heightFeet: z.coerce.number().positive().optional(),
    heightInches: z.coerce.number().positive().optional(),
    heightCm: z.coerce.number().positive().optional(),
    weight: z.coerce.number().positive(),
    dateOfBirth: z.date(),
    units: z.enum(["international", "american"]),
    gender: z.enum(["male", "female"]),
    activityLevel: z.string(),
  })
  .refine(
    (data) => {
      if (data.units === "international") {
        return !!data.heightCm;
      }
    },
    { message: "Height is required", path: ["heightCm"] }
  )
  .refine(
    (data) => {
      if (data.units === "american") {
        return !!data.heightFeet && !!data.heightInches;
      }
    },
    { message: "Height is required", path: ["heightFeet", "heightInches"] }
  );

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
  const onSubmit = async (values: any) => {
    console.log("tdeeInfoForm values", { values });

    // const res = await fetch("/api/updateTdeeInfo", {
    //   method: "POST",
    //   body: JSON.stringify({ tdeeInfoForm }),
    //   //@ts-ignore
    //   "Content-Type": "application/json",
    // });
    // if (!res.ok) {
    //   throw new Error("Failed to create save user info.");
    // }

    // await getTdeeInfoFromDb();
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heightFeet: 5,
      heightInches: 9,
      heightCm: 180,
      weight: tdeeInfoForm.units === "international" ? 70 : 150,
      dateOfBirth: new Date("01/01/1997"),
      units: "international",
      gender: "female",
      activityLevel: "lightly",
    },
  });

  const units = form.watch("units");

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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center gap-3"
            method="post"
          >
            <div className="flex flex-col items-start py-6 px-10 rounded-3xl border border-zinc-800 shadow-md  shadow-slate-700 bg-zinc-900 w-unit-8xl bg-card">
              {units === "american" && (
                <>
                  <FormLabel className=" ">Height</FormLabel>

                  <div className="flex flex-row items-center justify-start ">
                    <FormField
                      name="heightFeet"
                      control={form.control}
                      render={({ field }) => {
                        return (
                          <FormItem className="space-x-2 flex flex-row items-center justify-start ">
                            <FormControl>
                              <Input
                                className="bg-input w-1/3"
                                type="number"
                                placeholder="5"
                                {...field}
                              />
                            </FormControl>
                            <FormLabel className=" ">feet</FormLabel>

                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      name="heightInches"
                      control={form.control}
                      render={({ field }) => {
                        return (
                          <FormItem className="space-x-2 flex flex-row items-center justify-start ">
                            <FormControl className="">
                              <Input
                                className="bg-input w-1/3"
                                type="number"
                                placeholder="9"
                                {...field}
                              />
                            </FormControl>
                            <FormLabel className=" ">inches</FormLabel>

                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    {/* <Input
                      type="number"
                      id="heightFeet"
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
                    <span className="ml-2 mr-4">inches</span> */}
                  </div>
                </>
              )}
              {units === "international" && (
                <div className="">
                  <FormField
                    name="heightCm"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem className="">
                          <FormLabel className="font-semibold">
                            Height (cm)
                          </FormLabel>
                          <FormControl className="">
                            <Input
                              className="bg-input w-1/3"
                              type="number"
                              placeholder="9"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              )}
              <div className="">
                <FormField
                  name="weight"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem className="">
                        <FormLabel className="font-semibold">
                          Weight {units === "international" ? "(kg)" : "(lb)"}
                        </FormLabel>

                        <FormControl className="">
                          <Input
                            className="bg-input w-1/3"
                            type="number"
                            placeholder={
                              units === "international" ? "70" : "150"
                            }
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="  my-4">
                <FormField
                  name="units"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem className="">
                        <FormLabel>Measurement Units</FormLabel>

                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="w-[280px] bg-input">
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="american">
                              American (inches, lbs)
                            </SelectItem>
                            <SelectItem value="international">
                              International (cm, kg)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="w-1/3 my-4">
                <label htmlFor="dateOfBirth" className="font-semibold">
                  Date of Birth
                </label>
                <InputUI
                  size="sm"
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  placeholder="01/01/1997"
                  value={tdeeInfoForm.dateOfBirth}
                  onChange={handleChange}
                  className=" p-2 w-48"
                />
              </div>
              <div className="w-1/3 my-4">
                <label htmlFor="gender" className="font-semibold">
                  Sex
                </label>

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
                      <span className="text-sm font-light ">
                        I do little to no exercise and spend most of my day
                        sitting (working at a desk job...).
                      </span>
                    </Radio>
                    <Radio value="lightly">
                      I&apos;m lightly active.{" "}
                      <span className="text-sm font-light ">
                        I engage in light exercise one to three days per week
                        (walking, yoga...).
                      </span>
                    </Radio>
                    <Radio value="moderately">
                      I&apos;m moderately active.{" "}
                      <span className="text-sm font-light ">
                        I perform moderate exercise three to five days a week
                        (jogging, swimming, cycling at a brisk pace...).
                      </span>
                    </Radio>
                    <Radio value="very">
                      I&apos;m very active.{" "}
                      <span className="text-sm font-light ">
                        I engage in hard exercise six to seven days a week
                        (intense cycling, running, swimming...).
                      </span>
                    </Radio>
                    <Radio value="extra">
                      I&apos;m extra active.
                      <span className="text-sm font-light ">
                        I engage in very hard exercise and have a physically
                        demanding job (elite athletes, construction workers...).
                      </span>
                    </Radio>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <Button
              size="lg"
              type="submit"
              className="my-6 font-semibold bg-primary p-4 rounded-2xl"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
      {/* <div ref={resultsRef}> */}
      <div>
        <div className="text-3xl font-light my-10 ">
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
