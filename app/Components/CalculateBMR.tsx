"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

import { Input, Spinner } from "@nextui-org/react";

export const CalculateBMR = () => {
  // State to store input values
  const [userInfo, setUserInfo] = useState({
    heightCm: "",
    heightFeet: "",
    heightInches: "",
    weight: "",
    dateOfBirth: "",
    gender: "",
    units: "international",
  });

  // Handler for changing input values
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/userInfo", {
      method: "POST",
      body: JSON.stringify({ userInfo }),
      //@ts-ignore
      "Content-Type": "application/json",
    });
    if (!res.ok) {
      throw new Error("Failed to create save user info.");
    }

    console.log("fetch(/api/userInfo)", res);
  };

  return (
    <div className="flex flex-col items-center justify-center  w-full ">
      <h2 className="text-xl font-bold mb-6">
        Calculate your Basal Metabolic Rate (BMR)
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-3 "
        method="post"
      >
        <div className="flex flex-col items-start py-6 px-10 rounded-3xl border border-slate-600 shadow-md shadow-slate-700 w-unit-8xl">
          {userInfo.units === "american" && (
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
                  value={userInfo.heightFeet}
                  onChange={handleChange}
                />

                <span className="ml-2 mr-4">feet</span>

                <Input
                  size="sm"
                  type="number"
                  id="heightInches"
                  name="heightInches"
                  placeholder="2"
                  value={userInfo.heightInches}
                  onChange={handleChange}
                />
                <span className="ml-2 mr-4">inches</span>
              </div>
            </div>
          )}
          {userInfo.units === "international" && (
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
                value={userInfo.heightCm}
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
              value={userInfo.weight}
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
              value={userInfo.units}
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
              value={userInfo.dateOfBirth}
              onChange={handleChange}
              className="mt-2"
            />
          </div>
          <div className="w-1/3 my-4">
            <label htmlFor="gender" className="font-semibold">
              Sex{" "}
            </label>
            <Select
              id="gender"
              name="gender"
              value={userInfo.gender}
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
          </div>
        </div>
        <Button size="lg" type="submit" className="my-6 font-semibold">
          Submit
        </Button>
      </form>
    </div>
  );
};
