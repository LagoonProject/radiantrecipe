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

import { getWeightGoal } from "@/lib/helpers/getWeightGoal";
import { MyInfos } from "@/app/Components/MyInfos";
import { AppContext } from "@/context/context";
import Link from "next/link";
import { MacroPie } from "@/app/Components/MacrosPie";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
  FormDescription,
} from "@/components/ui/form";

import {
  Select,
  SelectItem,
  Spinner,
  Input as InputUI,
} from "@nextui-org/react";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  mealType: z.string(),
  mealCalories: z.string(),
  preparationTime: z.string(),
});

export default function MealPlanBuilder({ searchParams }: any) {
  const { tdeeTarget } = useParams();
  const { iWantTo } = searchParams;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mealType: "lunch",
    },
  });

  const onSubmit = async (data: any) => {
    console.log("onSubmit data", data);
  };

  return (
    <main className=" min-h-screen flex flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center py-12 ">
        <h2 className="text-2xl">I&apos;m looking for a recipe</h2>
        <Form {...form}>
          <form
            className="flex flex-col items-start justify-center space-y-6"
            // method="post"
            action={onSubmit}
            // onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="mealType"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel>Type of meal</FormLabel>

                    <FormControl>
                      <Select
                        onChange={field.onChange}
                        defaultSelectedKeys={["lunch"]}
                        size={"sm"}
                        label="Select a meal type"
                        className="w-52"
                      >
                        <SelectItem key="breakfast" value={field.value}>
                          Breakfast
                        </SelectItem>
                        <SelectItem key="lunch" value={field.value}>
                          Lunch
                        </SelectItem>
                        <SelectItem key="snack" value={field.value}>
                          Snack
                        </SelectItem>
                        <SelectItem key="diner" value={field.value}>
                          Dinner
                        </SelectItem>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              name="mealCalories"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel>Meal calories (in kcal)</FormLabel>

                    <FormControl>
                      <InputUI
                        size="sm"
                        type="number"
                        name="mealCalories"
                        placeholder="600"
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
              name="mealCalories"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel>Meal calories (in kcal)</FormLabel>

                    <FormControl>
                      <InputUI
                        size="sm"
                        type="number"
                        name="mealCalories"
                        placeholder="600"
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
            <Button type="submit" className="rounded-2xl">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
