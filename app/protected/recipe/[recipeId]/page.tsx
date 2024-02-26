"use client";

import React, { Key, useContext, useEffect, useState } from "react";
import { MyInfos } from "@/app/Components/MyInfos";
import { AppContext } from "@/context/context";
import { useParams } from "next/navigation";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { WheatOff, MilkOff, LeafyGreen, Clock } from "lucide-react";
import { decimalToFraction } from "@/lib/helpers/decimalToFraction";

import { Link } from "@nextui-org/react";
import { extractListItems } from "@/lib/helpers/extractListItems";
import { Progress } from "@/components/ui/progress";

const recip = {
  id: 653270,
  gaps: "no",
  tips: {
    green: [
      'Buying local <a href="https://spoonacular.com/academy/honey">honey</a> from beekeepers in your area not only supports your community but helps those beekeepers protect bees! <a href="http://www.localharvest.org/organic-honey.jsp">LocalHarvest</a> can help you locate some tasty honey produced near you.',
      "Choose free range or organic eggs whenever possible! Even though they are more expensive, eggs are generally cheap to begin with, and eggs from cage-free chickens are worth the extra cost.",
    ],
    price: [],
    health: [
      "If you're trying to <a href=\"https://spoonacular.com/academy/sugar-nutrient\">cut back on sugar</a>, consider replacing some of the sugar in this recipe with a sweetener like Stevia or Splenda. If you're against these kinds of sweeteners, start reducing the amount of real sugar you use until your tastebuds adjust. ",
      'If you\'re worried about cholesterol and heart disease, you may have heard you should limit your egg consumption to one egg per day or eat only egg whites. However, new research suggests you might go ahead and eat your whole eggs. It turns out egg yolk contains valuable nutrients (the cartenoids that make it yellow are great for eye health, folic acid is great for brain health, and it has vitamins A, E, D, and K) and <a href="https://spoonacular.com/academy/cholesterol">dietary cholesterol</a> seems to have little influence on blood cholesterol levels.',
      "Many people proclaim the health benefits of honey, saying it possesses antibacterial, antiviral, anti-inflammatory, and antioxidant properties. Although the extent of its health benefits in humans remains unclear, studies have indeed confirmed that honey can help with cold symptoms and even heal wounds and prevent infections.  If you're looking to reap the potential health benefits, dark raw honey is likely the best option.",
      'Although the body needs salt to survive, most of us get too much. The problem with consuming too much salt (what chemists call "sodium chloride") is actually the <a href="https://spoonacular.com/academy/sodium">sodium</a> part, which is why people concerned about high blood pressure go on low-sodium diets. If you are trying to reduce salt in your diet, you can try salt substitutes like potassium chloride or try to make do with less salt by using more black pepper, herbs, and spices.',
    ],
    cooking: [
      "Seaweed for cooking can be found in Asian markets or on Amazon. ",
    ],
  },
  cheap: false,
  diets: ["dairy free"],
  image: "https://spoonacular.com/recipeImages/653270-556x370.jpg",
  title: "Nori Seaweed Muffins",
  vegan: false,
  report: null,
  license: "CC BY 3.0",
  summary:
    'If you have about <b>45 minutes</b> to spend in the kitchen, Nori Seaweed Muffins might be a great <b>dairy free</b> recipe to try. This recipe makes 12 servings with <b>249 calories</b>, <b>4g of protein</b>, and <b>14g of fat</b> each. For <b>37 cents per serving</b>, this recipe <b>covers 4%</b> of your daily requirements of vitamins and minerals. A mixture of salt, eggs, cake flour, and a handful of other ingredients are all it takes to make this recipe so delicious. 1 person has tried and liked this recipe. It is brought to you by Foodista. It works well as a very affordable breakfast. With a spoonacular <b>score of 14%</b>, this dish is not so excellent. If you like this recipe, take a look at these similar recipes: <a href="https://spoonacular.com/recipes/eucheuma-seaweed-kerabu-eucheuma-seaweed-salad-497882">Eucheuma Seaweed Kerabu (Eucheuma Seaweed Salad)</a>, <a href="https://spoonacular.com/recipes/nori-rolls-507153">Nori Rolls</a>, and <a href="https://spoonacular.com/recipes/nori-radish-toasts-44451">Nori Radish Toasts</a>.',
  approved: 2,
  cuisines: [],
  servings: 12,
  userTags: [],
  dairyFree: true,
  dishTypes: ["morning meal", "brunch", "breakfast"],
  imageType: "jpg",
  lowFodmap: false,
  nutrition: {
    nutrients: [
      {
        name: "Calories",
        unit: "kcal",
        amount: 249.34,
        percentOfDailyNeeds: 12.47,
      },
      {
        name: "Fat",
        unit: "g",
        amount: 14.22,
        percentOfDailyNeeds: 21.87,
      },
      {
        name: "Saturated Fat",
        unit: "g",
        amount: 3.63,
        percentOfDailyNeeds: 22.67,
      },
      {
        name: "Carbohydrates",
        unit: "g",
        amount: 27.31,
        percentOfDailyNeeds: 9.1,
      },
      {
        name: "Net Carbohydrates",
        unit: "g",
        amount: 26.89,
        percentOfDailyNeeds: 9.78,
      },
      {
        name: "Sugar",
        unit: "g",
        amount: 14.98,
        percentOfDailyNeeds: 16.65,
      },
      {
        name: "Cholesterol",
        unit: "mg",
        amount: 54.56,
        percentOfDailyNeeds: 18.19,
      },
      {
        name: "Sodium",
        unit: "mg",
        amount: 359.55,
        percentOfDailyNeeds: 15.63,
      },
      {
        name: "Protein",
        unit: "g",
        amount: 3.87,
        percentOfDailyNeeds: 7.73,
      },
      {
        name: "Selenium",
        unit: "µg",
        amount: 11.23,
        percentOfDailyNeeds: 16.04,
      },
      {
        name: "Manganese",
        unit: "mg",
        amount: 0.14,
        percentOfDailyNeeds: 7.07,
      },
      {
        name: "Vitamin K",
        unit: "µg",
        amount: 7.29,
        percentOfDailyNeeds: 6.95,
      },
      {
        name: "Vitamin E",
        unit: "mg",
        amount: 0.99,
        percentOfDailyNeeds: 6.63,
      },
      {
        name: "Phosphorus",
        unit: "mg",
        amount: 60.28,
        percentOfDailyNeeds: 6.03,
      },
      {
        name: "Calcium",
        unit: "mg",
        amount: 51.86,
        percentOfDailyNeeds: 5.19,
      },
      {
        name: "Vitamin B2",
        unit: "mg",
        amount: 0.08,
        percentOfDailyNeeds: 4.81,
      },
      {
        name: "Vitamin B5",
        unit: "mg",
        amount: 0.39,
        percentOfDailyNeeds: 3.9,
      },
      {
        name: "Folate",
        unit: "µg",
        amount: 13.95,
        percentOfDailyNeeds: 3.49,
      },
      {
        name: "Iron",
        unit: "mg",
        amount: 0.53,
        percentOfDailyNeeds: 2.96,
      },
      {
        name: "Zinc",
        unit: "mg",
        amount: 0.35,
        percentOfDailyNeeds: 2.33,
      },
      {
        name: "Copper",
        unit: "mg",
        amount: 0.04,
        percentOfDailyNeeds: 2.21,
      },
      {
        name: "Vitamin B12",
        unit: "µg",
        amount: 0.13,
        percentOfDailyNeeds: 2.18,
      },
      {
        name: "Vitamin D",
        unit: "µg",
        amount: 0.29,
        percentOfDailyNeeds: 1.96,
      },
      {
        name: "Magnesium",
        unit: "mg",
        amount: 7.18,
        percentOfDailyNeeds: 1.79,
      },
      {
        name: "Fiber",
        unit: "g",
        amount: 0.42,
        percentOfDailyNeeds: 1.67,
      },
      {
        name: "Vitamin A",
        unit: "IU",
        amount: 80.5,
        percentOfDailyNeeds: 1.61,
      },
      {
        name: "Vitamin B6",
        unit: "mg",
        amount: 0.03,
        percentOfDailyNeeds: 1.6,
      },
      {
        name: "Vitamin B1",
        unit: "mg",
        amount: 0.02,
        percentOfDailyNeeds: 1.47,
      },
      {
        name: "Potassium",
        unit: "mg",
        amount: 39.6,
        percentOfDailyNeeds: 1.13,
      },
    ],
    flavonoids: [
      {
        name: "Cyanidin",
        unit: "",
        amount: 0,
      },
      {
        name: "Petunidin",
        unit: "",
        amount: 0,
      },
      {
        name: "Delphinidin",
        unit: "",
        amount: 0,
      },
      {
        name: "Malvidin",
        unit: "",
        amount: 0,
      },
      {
        name: "Pelargonidin",
        unit: "",
        amount: 0,
      },
      {
        name: "Peonidin",
        unit: "",
        amount: 0,
      },
      {
        name: "Catechin",
        unit: "",
        amount: 0,
      },
      {
        name: "Epigallocatechin",
        unit: "",
        amount: 0,
      },
      {
        name: "Epicatechin",
        unit: "",
        amount: 0,
      },
      {
        name: "Epicatechin 3-gallate",
        unit: "",
        amount: 0,
      },
      {
        name: "Epigallocatechin 3-gallate",
        unit: "",
        amount: 0,
      },
      {
        name: "Theaflavin",
        unit: "",
        amount: 0,
      },
      {
        name: "Thearubigins",
        unit: "",
        amount: 0,
      },
      {
        name: "Eriodictyol",
        unit: "",
        amount: 0,
      },
      {
        name: "Hesperetin",
        unit: "",
        amount: 0,
      },
      {
        name: "Naringenin",
        unit: "",
        amount: 0,
      },
      {
        name: "Apigenin",
        unit: "",
        amount: 0,
      },
      {
        name: "Luteolin",
        unit: "",
        amount: 0,
      },
      {
        name: "Isorhamnetin",
        unit: "",
        amount: 0,
      },
      {
        name: "Kaempferol",
        unit: "",
        amount: 0,
      },
      {
        name: "Myricetin",
        unit: "",
        amount: 0,
      },
      {
        name: "Quercetin",
        unit: "",
        amount: 0,
      },
      {
        name: "Theaflavin-3,3'-digallate",
        unit: "",
        amount: 0,
      },
      {
        name: "Theaflavin-3'-gallate",
        unit: "",
        amount: 0,
      },
      {
        name: "Theaflavin-3-gallate",
        unit: "",
        amount: 0,
      },
      {
        name: "Gallocatechin",
        unit: "",
        amount: 0,
      },
    ],
    properties: [
      {
        name: "Glycemic Index",
        unit: "",
        amount: 23.45,
      },
      {
        name: "Glycemic Load",
        unit: "",
        amount: 17.98,
      },
      {
        name: "Inflammation Score",
        unit: "",
        amount: -1,
      },
      {
        name: "Nutrition Score",
        unit: "%",
        amount: 3.565217391304348,
      },
    ],
    ingredients: [
      {
        id: 18369,
        name: "baking powder",
        unit: "teaspoons",
        amount: 0.17,
        nutrients: [
          {
            name: "Net Carbohydrates",
            unit: "g",
            amount: 0.18,
            percentOfDailyNeeds: 9.78,
          },
          {
            name: "Vitamin C",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0.05,
          },
          {
            name: "Vitamin B5",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 3.9,
          },
          {
            name: "Copper",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 2.21,
          },
          {
            name: "Poly Unsaturated Fat",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Saturated Fat",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 22.67,
          },
          {
            name: "Sugar",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 16.65,
          },
          {
            name: "Vitamin E",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 6.63,
          },
          {
            name: "Cholesterol",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 18.19,
          },
          {
            name: "Vitamin B12",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 2.18,
          },
          {
            name: "Carbohydrates",
            unit: "g",
            amount: 0.18,
            percentOfDailyNeeds: 9.1,
          },
          {
            name: "Folic Acid",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Phosphorus",
            unit: "mg",
            amount: 14.61,
            percentOfDailyNeeds: 6.03,
          },
          {
            name: "Vitamin B3",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0.93,
          },
          {
            name: "Vitamin K",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 6.95,
          },
          {
            name: "Vitamin B6",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 1.6,
          },
          {
            name: "Iron",
            unit: "mg",
            amount: 0.07,
            percentOfDailyNeeds: 2.96,
          },
          {
            name: "Magnesium",
            unit: "mg",
            amount: 0.18,
            percentOfDailyNeeds: 1.79,
          },
          {
            name: "Vitamin B2",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 4.81,
          },
          {
            name: "Choline",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Alcohol",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Fiber",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 1.67,
          },
          {
            name: "Zinc",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 2.33,
          },
          {
            name: "Selenium",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 16.04,
          },
          {
            name: "Folate",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 3.49,
          },
          {
            name: "Vitamin B1",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 1.47,
          },
          {
            name: "Fat",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 21.87,
          },
          {
            name: "Potassium",
            unit: "mg",
            amount: 0.13,
            percentOfDailyNeeds: 1.13,
          },
          {
            name: "Manganese",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 7.07,
          },
          {
            name: "Sodium",
            unit: "mg",
            amount: 70.67,
            percentOfDailyNeeds: 15.63,
          },
          {
            name: "Mono Unsaturated Fat",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Protein",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 7.73,
          },
          {
            name: "Caffeine",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Vitamin A",
            unit: "IU",
            amount: 0,
            percentOfDailyNeeds: 1.61,
          },
          {
            name: "Calcium",
            unit: "mg",
            amount: 39.17,
            percentOfDailyNeeds: 5.19,
          },
          {
            name: "Lycopene",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Vitamin D",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 1.96,
          },
          {
            name: "Calories",
            unit: "kcal",
            amount: 0.35,
            percentOfDailyNeeds: 12.47,
          },
        ],
      },
      {
        id: 18372,
        name: "baking soda",
        unit: "gram",
        amount: 0.08,
        nutrients: [
          {
            name: "Net Carbohydrates",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 9.78,
          },
          {
            name: "Vitamin C",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0.05,
          },
          {
            name: "Vitamin B5",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 3.9,
          },
          {
            name: "Copper",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 2.21,
          },
          {
            name: "Poly Unsaturated Fat",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Saturated Fat",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 22.67,
          },
          {
            name: "Sugar",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 16.65,
          },
          {
            name: "Vitamin E",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 6.63,
          },
          {
            name: "Cholesterol",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 18.19,
          },
          {
            name: "Vitamin B12",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 2.18,
          },
          {
            name: "Carbohydrates",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 9.1,
          },
          {
            name: "Folic Acid",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Phosphorus",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 6.03,
          },
          {
            name: "Vitamin B3",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0.93,
          },
          {
            name: "Vitamin K",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 6.95,
          },
          {
            name: "Vitamin B6",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 1.6,
          },
          {
            name: "Iron",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 2.96,
          },
          {
            name: "Magnesium",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 1.79,
          },
          {
            name: "Vitamin B2",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 4.81,
          },
          {
            name: "Choline",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Alcohol",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Fiber",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 1.67,
          },
          {
            name: "Zinc",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 2.33,
          },
          {
            name: "Selenium",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 16.04,
          },
          {
            name: "Folate",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 3.49,
          },
          {
            name: "Vitamin B1",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 1.47,
          },
          {
            name: "Fat",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 21.87,
          },
          {
            name: "Potassium",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 1.13,
          },
          {
            name: "Manganese",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 7.07,
          },
          {
            name: "Sodium",
            unit: "mg",
            amount: 22.8,
            percentOfDailyNeeds: 15.63,
          },
          {
            name: "Mono Unsaturated Fat",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Protein",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 7.73,
          },
          {
            name: "Caffeine",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Vitamin A",
            unit: "IU",
            amount: 0,
            percentOfDailyNeeds: 1.61,
          },
          {
            name: "Calcium",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 5.19,
          },
          {
            name: "Lycopene",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Vitamin D",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 1.96,
          },
          {
            name: "Calories",
            unit: "kcal",
            amount: 0,
            percentOfDailyNeeds: 12.47,
          },
        ],
      },
      {
        id: 10020129,
        name: "cake flour",
        unit: "grams",
        amount: 16.67,
        nutrients: [
          {
            name: "Net Carbohydrates",
            unit: "g",
            amount: 11.69,
            percentOfDailyNeeds: 9.78,
          },
          {
            name: "Vitamin C",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0.05,
          },
          {
            name: "Vitamin B5",
            unit: "mg",
            amount: 0.07,
            percentOfDailyNeeds: 3.9,
          },
          {
            name: "Copper",
            unit: "mg",
            amount: 0.03,
            percentOfDailyNeeds: 2.21,
          },
          {
            name: "Poly Unsaturated Fat",
            unit: "g",
            amount: 0.12,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Saturated Fat",
            unit: "g",
            amount: 0.04,
            percentOfDailyNeeds: 22.67,
          },
          {
            name: "Sugar",
            unit: "g",
            amount: 0.05,
            percentOfDailyNeeds: 16.65,
          },
          {
            name: "Vitamin E",
            unit: "mg",
            amount: 0.07,
            percentOfDailyNeeds: 6.63,
          },
          {
            name: "Cholesterol",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 18.19,
          },
          {
            name: "Vitamin B12",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 2.18,
          },
          {
            name: "Carbohydrates",
            unit: "g",
            amount: 12.09,
            percentOfDailyNeeds: 9.1,
          },
          {
            name: "Folic Acid",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Phosphorus",
            unit: "mg",
            amount: 16.17,
            percentOfDailyNeeds: 6.03,
          },
          {
            name: "Vitamin B3",
            unit: "mg",
            amount: 0.17,
            percentOfDailyNeeds: 0.93,
          },
          {
            name: "Vitamin K",
            unit: "µg",
            amount: 0.05,
            percentOfDailyNeeds: 6.95,
          },
          {
            name: "Vitamin B6",
            unit: "mg",
            amount: 0.01,
            percentOfDailyNeeds: 1.6,
          },
          {
            name: "Iron",
            unit: "mg",
            amount: 0.15,
            percentOfDailyNeeds: 2.96,
          },
          {
            name: "Magnesium",
            unit: "mg",
            amount: 4.17,
            percentOfDailyNeeds: 1.79,
          },
          {
            name: "Vitamin B2",
            unit: "mg",
            amount: 0.01,
            percentOfDailyNeeds: 4.81,
          },
          {
            name: "Choline",
            unit: "mg",
            amount: 1.73,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Alcohol",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Fiber",
            unit: "g",
            amount: 0.4,
            percentOfDailyNeeds: 1.67,
          },
          {
            name: "Zinc",
            unit: "mg",
            amount: 0.14,
            percentOfDailyNeeds: 2.33,
          },
          {
            name: "Selenium",
            unit: "µg",
            amount: 6.62,
            percentOfDailyNeeds: 16.04,
          },
          {
            name: "Folate",
            unit: "µg",
            amount: 5.5,
            percentOfDailyNeeds: 3.49,
          },
          {
            name: "Vitamin B1",
            unit: "mg",
            amount: 0.01,
            percentOfDailyNeeds: 1.47,
          },
          {
            name: "Fat",
            unit: "g",
            amount: 0.28,
            percentOfDailyNeeds: 21.87,
          },
          {
            name: "Potassium",
            unit: "mg",
            amount: 16.67,
            percentOfDailyNeeds: 1.13,
          },
          {
            name: "Manganese",
            unit: "mg",
            amount: 0.13,
            percentOfDailyNeeds: 7.07,
          },
          {
            name: "Sodium",
            unit: "mg",
            amount: 0.33,
            percentOfDailyNeeds: 15.63,
          },
          {
            name: "Mono Unsaturated Fat",
            unit: "g",
            amount: 0.02,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Protein",
            unit: "g",
            amount: 2,
            percentOfDailyNeeds: 7.73,
          },
          {
            name: "Caffeine",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Vitamin A",
            unit: "IU",
            amount: 0.33,
            percentOfDailyNeeds: 1.61,
          },
          {
            name: "Calcium",
            unit: "mg",
            amount: 2.5,
            percentOfDailyNeeds: 5.19,
          },
          {
            name: "Lycopene",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Vitamin D",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 1.96,
          },
          {
            name: "Calories",
            unit: "kcal",
            amount: 60.17,
            percentOfDailyNeeds: 12.47,
          },
        ],
      },
      {
        id: 1123,
        name: "eggs",
        unit: "",
        amount: 0.33,
        nutrients: [
          {
            name: "Net Carbohydrates",
            unit: "g",
            amount: 0.11,
            percentOfDailyNeeds: 9.78,
          },
          {
            name: "Vitamin C",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0.05,
          },
          {
            name: "Poly Unsaturated Fat",
            unit: "g",
            amount: 0.28,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Vitamin B5",
            unit: "mg",
            amount: 0.22,
            percentOfDailyNeeds: 3.9,
          },
          {
            name: "Copper",
            unit: "mg",
            amount: 0.01,
            percentOfDailyNeeds: 2.21,
          },
          {
            name: "Saturated Fat",
            unit: "g",
            amount: 0.46,
            percentOfDailyNeeds: 22.67,
          },
          {
            name: "Trans Fat",
            unit: "g",
            amount: 0.01,
            percentOfDailyNeeds: 16510.73,
          },
          {
            name: "Sugar",
            unit: "g",
            amount: 0.05,
            percentOfDailyNeeds: 16.65,
          },
          {
            name: "Vitamin E",
            unit: "mg",
            amount: 0.15,
            percentOfDailyNeeds: 6.63,
          },
          {
            name: "Cholesterol",
            unit: "mg",
            amount: 54.56,
            percentOfDailyNeeds: 18.19,
          },
          {
            name: "Vitamin B12",
            unit: "µg",
            amount: 0.13,
            percentOfDailyNeeds: 2.18,
          },
          {
            name: "Carbohydrates",
            unit: "g",
            amount: 0.11,
            percentOfDailyNeeds: 9.1,
          },
          {
            name: "Fluoride",
            unit: "mg",
            amount: 0.16,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Folic Acid",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Phosphorus",
            unit: "mg",
            amount: 29.04,
            percentOfDailyNeeds: 6.03,
          },
          {
            name: "Vitamin B3",
            unit: "mg",
            amount: 0.01,
            percentOfDailyNeeds: 0.93,
          },
          {
            name: "Vitamin K",
            unit: "µg",
            amount: 0.04,
            percentOfDailyNeeds: 6.95,
          },
          {
            name: "Vitamin B6",
            unit: "mg",
            amount: 0.02,
            percentOfDailyNeeds: 1.6,
          },
          {
            name: "Iron",
            unit: "mg",
            amount: 0.26,
            percentOfDailyNeeds: 2.96,
          },
          {
            name: "Magnesium",
            unit: "mg",
            amount: 1.76,
            percentOfDailyNeeds: 1.79,
          },
          {
            name: "Vitamin B2",
            unit: "mg",
            amount: 0.07,
            percentOfDailyNeeds: 4.81,
          },
          {
            name: "Choline",
            unit: "mg",
            amount: 43.12,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Alcohol",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Fiber",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 1.67,
          },
          {
            name: "Zinc",
            unit: "mg",
            amount: 0.19,
            percentOfDailyNeeds: 2.33,
          },
          {
            name: "Selenium",
            unit: "µg",
            amount: 4.5,
            percentOfDailyNeeds: 16.04,
          },
          {
            name: "Folate",
            unit: "µg",
            amount: 6.89,
            percentOfDailyNeeds: 3.49,
          },
          {
            name: "Vitamin B1",
            unit: "mg",
            amount: 0.01,
            percentOfDailyNeeds: 1.47,
          },
          {
            name: "Fat",
            unit: "g",
            amount: 1.39,
            percentOfDailyNeeds: 21.87,
          },
          {
            name: "Potassium",
            unit: "mg",
            amount: 20.24,
            percentOfDailyNeeds: 1.13,
          },
          {
            name: "Manganese",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 7.07,
          },
          {
            name: "Sodium",
            unit: "mg",
            amount: 20.83,
            percentOfDailyNeeds: 15.63,
          },
          {
            name: "Mono Unsaturated Fat",
            unit: "g",
            amount: 0.54,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Protein",
            unit: "g",
            amount: 1.85,
            percentOfDailyNeeds: 7.73,
          },
          {
            name: "Caffeine",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Vitamin A",
            unit: "IU",
            amount: 79.2,
            percentOfDailyNeeds: 1.61,
          },
          {
            name: "Calcium",
            unit: "mg",
            amount: 8.21,
            percentOfDailyNeeds: 5.19,
          },
          {
            name: "Lycopene",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Vitamin D",
            unit: "µg",
            amount: 0.29,
            percentOfDailyNeeds: 1.96,
          },
          {
            name: "Calories",
            unit: "kcal",
            amount: 20.97,
            percentOfDailyNeeds: 12.47,
          },
        ],
      },
      {
        id: 19296,
        name: "honey",
        unit: "grams",
        amount: 2.92,
        nutrients: [
          {
            name: "Net Carbohydrates",
            unit: "g",
            amount: 2.4,
            percentOfDailyNeeds: 9.78,
          },
          {
            name: "Vitamin C",
            unit: "mg",
            amount: 0.01,
            percentOfDailyNeeds: 0.05,
          },
          {
            name: "Vitamin B5",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 3.9,
          },
          {
            name: "Copper",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 2.21,
          },
          {
            name: "Poly Unsaturated Fat",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Saturated Fat",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 22.67,
          },
          {
            name: "Sugar",
            unit: "g",
            amount: 2.39,
            percentOfDailyNeeds: 16.65,
          },
          {
            name: "Vitamin E",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 6.63,
          },
          {
            name: "Cholesterol",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 18.19,
          },
          {
            name: "Vitamin B12",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 2.18,
          },
          {
            name: "Carbohydrates",
            unit: "g",
            amount: 2.4,
            percentOfDailyNeeds: 9.1,
          },
          {
            name: "Fluoride",
            unit: "mg",
            amount: 0.2,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Folic Acid",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Phosphorus",
            unit: "mg",
            amount: 0.12,
            percentOfDailyNeeds: 6.03,
          },
          {
            name: "Vitamin B3",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0.93,
          },
          {
            name: "Vitamin K",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 6.95,
          },
          {
            name: "Vitamin B6",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 1.6,
          },
          {
            name: "Iron",
            unit: "mg",
            amount: 0.01,
            percentOfDailyNeeds: 2.96,
          },
          {
            name: "Magnesium",
            unit: "mg",
            amount: 0.06,
            percentOfDailyNeeds: 1.79,
          },
          {
            name: "Vitamin B2",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 4.81,
          },
          {
            name: "Choline",
            unit: "mg",
            amount: 0.06,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Alcohol",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Fiber",
            unit: "g",
            amount: 0.01,
            percentOfDailyNeeds: 1.67,
          },
          {
            name: "Zinc",
            unit: "mg",
            amount: 0.01,
            percentOfDailyNeeds: 2.33,
          },
          {
            name: "Selenium",
            unit: "µg",
            amount: 0.02,
            percentOfDailyNeeds: 16.04,
          },
          {
            name: "Folate",
            unit: "µg",
            amount: 0.06,
            percentOfDailyNeeds: 3.49,
          },
          {
            name: "Vitamin B1",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 1.47,
          },
          {
            name: "Fat",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 21.87,
          },
          {
            name: "Potassium",
            unit: "mg",
            amount: 1.52,
            percentOfDailyNeeds: 1.13,
          },
          {
            name: "Manganese",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 7.07,
          },
          {
            name: "Sodium",
            unit: "mg",
            amount: 0.12,
            percentOfDailyNeeds: 15.63,
          },
          {
            name: "Mono Unsaturated Fat",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Protein",
            unit: "g",
            amount: 0.01,
            percentOfDailyNeeds: 7.73,
          },
          {
            name: "Caffeine",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Vitamin A",
            unit: "IU",
            amount: 0,
            percentOfDailyNeeds: 1.61,
          },
          {
            name: "Calcium",
            unit: "mg",
            amount: 0.17,
            percentOfDailyNeeds: 5.19,
          },
          {
            name: "Lycopene",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Vitamin D",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 1.96,
          },
          {
            name: "Calories",
            unit: "kcal",
            amount: 8.87,
            percentOfDailyNeeds: 12.47,
          },
        ],
      },
      {
        id: 2047,
        name: "salt",
        unit: "teaspoons",
        amount: 0.1,
        nutrients: [
          {
            name: "Net Carbohydrates",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 9.78,
          },
          {
            name: "Vitamin C",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0.05,
          },
          {
            name: "Vitamin B5",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 3.9,
          },
          {
            name: "Copper",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 2.21,
          },
          {
            name: "Poly Unsaturated Fat",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Saturated Fat",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 22.67,
          },
          {
            name: "Sugar",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 16.65,
          },
          {
            name: "Vitamin E",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 6.63,
          },
          {
            name: "Cholesterol",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 18.19,
          },
          {
            name: "Vitamin B12",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 2.18,
          },
          {
            name: "Carbohydrates",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 9.1,
          },
          {
            name: "Fluoride",
            unit: "mg",
            amount: 0.01,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Folic Acid",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Phosphorus",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 6.03,
          },
          {
            name: "Vitamin B3",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0.93,
          },
          {
            name: "Vitamin K",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 6.95,
          },
          {
            name: "Vitamin B6",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 1.6,
          },
          {
            name: "Iron",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 2.96,
          },
          {
            name: "Magnesium",
            unit: "mg",
            amount: 0.01,
            percentOfDailyNeeds: 1.79,
          },
          {
            name: "Vitamin B2",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 4.81,
          },
          {
            name: "Choline",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Alcohol",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Fiber",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 1.67,
          },
          {
            name: "Zinc",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 2.33,
          },
          {
            name: "Selenium",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 16.04,
          },
          {
            name: "Folate",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 3.49,
          },
          {
            name: "Vitamin B1",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 1.47,
          },
          {
            name: "Fat",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 21.87,
          },
          {
            name: "Potassium",
            unit: "mg",
            amount: 0.05,
            percentOfDailyNeeds: 1.13,
          },
          {
            name: "Manganese",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 7.07,
          },
          {
            name: "Sodium",
            unit: "mg",
            amount: 242.24,
            percentOfDailyNeeds: 15.63,
          },
          {
            name: "Mono Unsaturated Fat",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Protein",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 7.73,
          },
          {
            name: "Caffeine",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Vitamin A",
            unit: "IU",
            amount: 0,
            percentOfDailyNeeds: 1.61,
          },
          {
            name: "Calcium",
            unit: "mg",
            amount: 0.15,
            percentOfDailyNeeds: 5.19,
          },
          {
            name: "Lycopene",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Vitamin D",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 1.96,
          },
          {
            name: "Calories",
            unit: "kcal",
            amount: 0,
            percentOfDailyNeeds: 12.47,
          },
        ],
      },
      {
        id: 11445,
        name: "seaweed",
        unit: "grams",
        amount: 0.83,
        nutrients: [
          {
            name: "Net Carbohydrates",
            unit: "g",
            amount: 0.07,
            percentOfDailyNeeds: 9.78,
          },
          {
            name: "Vitamin C",
            unit: "mg",
            amount: 0.03,
            percentOfDailyNeeds: 0.05,
          },
          {
            name: "Vitamin B5",
            unit: "mg",
            amount: 0.01,
            percentOfDailyNeeds: 3.9,
          },
          {
            name: "Copper",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 2.21,
          },
          {
            name: "Poly Unsaturated Fat",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Saturated Fat",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 22.67,
          },
          {
            name: "Sugar",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 16.65,
          },
          {
            name: "Vitamin E",
            unit: "mg",
            amount: 0.01,
            percentOfDailyNeeds: 6.63,
          },
          {
            name: "Cholesterol",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 18.19,
          },
          {
            name: "Vitamin B12",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 2.18,
          },
          {
            name: "Carbohydrates",
            unit: "g",
            amount: 0.08,
            percentOfDailyNeeds: 9.1,
          },
          {
            name: "Folic Acid",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Phosphorus",
            unit: "mg",
            amount: 0.35,
            percentOfDailyNeeds: 6.03,
          },
          {
            name: "Vitamin B3",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0.93,
          },
          {
            name: "Vitamin K",
            unit: "µg",
            amount: 0.55,
            percentOfDailyNeeds: 6.95,
          },
          {
            name: "Vitamin B6",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 1.6,
          },
          {
            name: "Iron",
            unit: "mg",
            amount: 0.02,
            percentOfDailyNeeds: 2.96,
          },
          {
            name: "Magnesium",
            unit: "mg",
            amount: 1.01,
            percentOfDailyNeeds: 1.79,
          },
          {
            name: "Vitamin B2",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 4.81,
          },
          {
            name: "Choline",
            unit: "mg",
            amount: 0.11,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Alcohol",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Fiber",
            unit: "g",
            amount: 0.01,
            percentOfDailyNeeds: 1.67,
          },
          {
            name: "Zinc",
            unit: "mg",
            amount: 0.01,
            percentOfDailyNeeds: 2.33,
          },
          {
            name: "Selenium",
            unit: "µg",
            amount: 0.01,
            percentOfDailyNeeds: 16.04,
          },
          {
            name: "Folate",
            unit: "µg",
            amount: 1.5,
            percentOfDailyNeeds: 3.49,
          },
          {
            name: "Vitamin B1",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 1.47,
          },
          {
            name: "Fat",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 21.87,
          },
          {
            name: "Potassium",
            unit: "mg",
            amount: 0.74,
            percentOfDailyNeeds: 1.13,
          },
          {
            name: "Manganese",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 7.07,
          },
          {
            name: "Sodium",
            unit: "mg",
            amount: 1.94,
            percentOfDailyNeeds: 15.63,
          },
          {
            name: "Mono Unsaturated Fat",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Protein",
            unit: "g",
            amount: 0.01,
            percentOfDailyNeeds: 7.73,
          },
          {
            name: "Caffeine",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Vitamin A",
            unit: "IU",
            amount: 0.97,
            percentOfDailyNeeds: 1.61,
          },
          {
            name: "Calcium",
            unit: "mg",
            amount: 1.4,
            percentOfDailyNeeds: 5.19,
          },
          {
            name: "Lycopene",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Vitamin D",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 1.96,
          },
          {
            name: "Calories",
            unit: "kcal",
            amount: 0.36,
            percentOfDailyNeeds: 12.47,
          },
        ],
      },
      {
        id: 4615,
        name: "g-180 shortening",
        unit: "grams",
        amount: 12.5,
        nutrients: [
          {
            name: "Net Carbohydrates",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 9.78,
          },
          {
            name: "Vitamin C",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0.05,
          },
          {
            name: "Poly Unsaturated Fat",
            unit: "g",
            amount: 3.51,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Vitamin B5",
            unit: "mg",
            amount: 0.09,
            percentOfDailyNeeds: 3.9,
          },
          {
            name: "Copper",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 2.21,
          },
          {
            name: "Saturated Fat",
            unit: "g",
            amount: 3.13,
            percentOfDailyNeeds: 22.67,
          },
          {
            name: "Trans Fat",
            unit: "g",
            amount: 1.65,
            percentOfDailyNeeds: 16510.73,
          },
          {
            name: "Sugar",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 16.65,
          },
          {
            name: "Vitamin E",
            unit: "mg",
            amount: 0.77,
            percentOfDailyNeeds: 6.63,
          },
          {
            name: "Cholesterol",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 18.19,
          },
          {
            name: "Vitamin B12",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 2.18,
          },
          {
            name: "Carbohydrates",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 9.1,
          },
          {
            name: "Folic Acid",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Phosphorus",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 6.03,
          },
          {
            name: "Vitamin B3",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0.93,
          },
          {
            name: "Vitamin K",
            unit: "µg",
            amount: 6.65,
            percentOfDailyNeeds: 6.95,
          },
          {
            name: "Vitamin B6",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 1.6,
          },
          {
            name: "Iron",
            unit: "mg",
            amount: 0.01,
            percentOfDailyNeeds: 2.96,
          },
          {
            name: "Magnesium",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 1.79,
          },
          {
            name: "Vitamin B2",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 4.81,
          },
          {
            name: "Choline",
            unit: "mg",
            amount: 0.03,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Alcohol",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Fiber",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 1.67,
          },
          {
            name: "Zinc",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 2.33,
          },
          {
            name: "Selenium",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 16.04,
          },
          {
            name: "Folate",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 3.49,
          },
          {
            name: "Vitamin B1",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 1.47,
          },
          {
            name: "Fat",
            unit: "g",
            amount: 12.5,
            percentOfDailyNeeds: 21.87,
          },
          {
            name: "Potassium",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 1.13,
          },
          {
            name: "Manganese",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 7.07,
          },
          {
            name: "Sodium",
            unit: "mg",
            amount: 0.5,
            percentOfDailyNeeds: 15.63,
          },
          {
            name: "Mono Unsaturated Fat",
            unit: "g",
            amount: 5.15,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Protein",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 7.73,
          },
          {
            name: "Caffeine",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Vitamin A",
            unit: "IU",
            amount: 0,
            percentOfDailyNeeds: 1.61,
          },
          {
            name: "Calcium",
            unit: "mg",
            amount: 0.13,
            percentOfDailyNeeds: 5.19,
          },
          {
            name: "Lycopene",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Vitamin D",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 1.96,
          },
          {
            name: "Calories",
            unit: "kcal",
            amount: 110.5,
            percentOfDailyNeeds: 12.47,
          },
        ],
      },
      {
        id: 19335,
        name: "sugar",
        unit: "grams",
        amount: 12.5,
        nutrients: [
          {
            name: "Net Carbohydrates",
            unit: "g",
            amount: 12.45,
            percentOfDailyNeeds: 9.78,
          },
          {
            name: "Vitamin C",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0.05,
          },
          {
            name: "Vitamin B5",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 3.9,
          },
          {
            name: "Copper",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 2.21,
          },
          {
            name: "Poly Unsaturated Fat",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Saturated Fat",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 22.67,
          },
          {
            name: "Sugar",
            unit: "g",
            amount: 12.47,
            percentOfDailyNeeds: 16.65,
          },
          {
            name: "Vitamin E",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 6.63,
          },
          {
            name: "Cholesterol",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 18.19,
          },
          {
            name: "Vitamin B12",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 2.18,
          },
          {
            name: "Carbohydrates",
            unit: "g",
            amount: 12.45,
            percentOfDailyNeeds: 9.1,
          },
          {
            name: "Fluoride",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Folic Acid",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Phosphorus",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 6.03,
          },
          {
            name: "Vitamin B3",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0.93,
          },
          {
            name: "Vitamin K",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 6.95,
          },
          {
            name: "Vitamin B6",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 1.6,
          },
          {
            name: "Iron",
            unit: "mg",
            amount: 0.01,
            percentOfDailyNeeds: 2.96,
          },
          {
            name: "Magnesium",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 1.79,
          },
          {
            name: "Vitamin B2",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 4.81,
          },
          {
            name: "Choline",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Alcohol",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Fiber",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 1.67,
          },
          {
            name: "Zinc",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 2.33,
          },
          {
            name: "Selenium",
            unit: "µg",
            amount: 0.07,
            percentOfDailyNeeds: 16.04,
          },
          {
            name: "Folate",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 3.49,
          },
          {
            name: "Vitamin B1",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 1.47,
          },
          {
            name: "Fat",
            unit: "g",
            amount: 0.04,
            percentOfDailyNeeds: 21.87,
          },
          {
            name: "Potassium",
            unit: "mg",
            amount: 0.25,
            percentOfDailyNeeds: 1.13,
          },
          {
            name: "Manganese",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 7.07,
          },
          {
            name: "Sodium",
            unit: "mg",
            amount: 0.13,
            percentOfDailyNeeds: 15.63,
          },
          {
            name: "Mono Unsaturated Fat",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Protein",
            unit: "g",
            amount: 0,
            percentOfDailyNeeds: 7.73,
          },
          {
            name: "Caffeine",
            unit: "mg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Vitamin A",
            unit: "IU",
            amount: 0,
            percentOfDailyNeeds: 1.61,
          },
          {
            name: "Calcium",
            unit: "mg",
            amount: 0.13,
            percentOfDailyNeeds: 5.19,
          },
          {
            name: "Lycopene",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 0,
          },
          {
            name: "Vitamin D",
            unit: "µg",
            amount: 0,
            percentOfDailyNeeds: 1.96,
          },
          {
            name: "Calories",
            unit: "kcal",
            amount: 48.13,
            percentOfDailyNeeds: 12.47,
          },
        ],
      },
    ],
    caloricBreakdown: {
      percentFat: 50.64,
      percentCarbs: 43.24,
      percentProtein: 6.12,
    },
    weightPerServing: {
      unit: "g",
      amount: 61,
    },
  },
  occasions: [],
  sourceUrl: "http://www.foodista.com/recipe/BH2PNBXN/nori-seaweed-muffins",
  glutenFree: false,
  originalId: null,
  sourceName: "Foodista",
  vegetarian: false,
  creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
  healthScore: 0,
  openLicense: 2,
  sustainable: false,
  veryHealthy: false,
  veryPopular: false,
  winePairing: {
    pairedWines: [],
    pairingText: "",
    productMatches: [],
  },
  instructions:
    "<ol><li>Soak the seaweed, drain and set aside. Sift together the cake flour, baking powder and baking soda.</li><li>Blend the eggs, sugar, salt, and honey together. Add the flour mixture to the egg mixture. Mix till all combined.</li><li>Add in melted shortening and seaweed to become the cake batter.</li><li>Spoon the batter to the greased muffin cups, 80% full and bake at 175C/350F for 20-25 minutes.</li></ol>",
  aggregateLikes: 1,
  cookingMinutes: -1,
  readyInMinutes: 45,
  pricePerServing: 37.05,
  spoonacularScore: 6.243517875671387,
  preparationMinutes: -1,
  unknownIngredients: [],
  extendedIngredients: [
    {
      id: 18369,
      meta: [],
      name: "baking powder",
      unit: "teaspoons",
      aisle: "Baking",
      image: "white-powder.jpg",
      amount: 2,
      measures: {
        us: {
          amount: 2,
          unitLong: "teaspoons",
          unitShort: "tsps",
        },
        metric: {
          amount: 2,
          unitLong: "teaspoons",
          unitShort: "tsps",
        },
      },
      original: "2 teaspoons baking powder",
      nameClean: "baking powder",
      consistency: "SOLID",
      originalName: "baking powder",
    },
    {
      id: 18372,
      meta: [],
      name: "baking soda",
      unit: "gram",
      aisle: "Baking",
      image: "white-powder.jpg",
      amount: 1,
      measures: {
        us: {
          amount: 0.035,
          unitLong: "ounces",
          unitShort: "oz",
        },
        metric: {
          amount: 1,
          unitLong: "gram",
          unitShort: "g",
        },
      },
      original: "1 gram Baking soda",
      nameClean: "baking soda",
      consistency: "SOLID",
      originalName: "Baking soda",
    },
    {
      id: 10020129,
      meta: [],
      name: "cake flour",
      unit: "grams",
      aisle: "Baking",
      image: "flour.png",
      amount: 200,
      measures: {
        us: {
          amount: 7.055,
          unitLong: "ounces",
          unitShort: "oz",
        },
        metric: {
          amount: 200,
          unitLong: "grams",
          unitShort: "g",
        },
      },
      original: "200 grams Cake flour",
      nameClean: "cake flour",
      consistency: "SOLID",
      originalName: "Cake flour",
    },
    {
      id: 1123,
      meta: [],
      name: "eggs",
      unit: "",
      aisle: "Milk, Eggs, Other Dairy",
      image: "egg.png",
      amount: 4,
      measures: {
        us: {
          amount: 4,
          unitLong: "",
          unitShort: "",
        },
        metric: {
          amount: 4,
          unitLong: "",
          unitShort: "",
        },
      },
      original: "4 eggs",
      nameClean: "egg",
      consistency: "SOLID",
      originalName: "eggs",
    },
    {
      id: 19296,
      meta: [],
      name: "honey",
      unit: "grams",
      aisle: "Nut butters, Jams, and Honey",
      image: "honey.png",
      amount: 35,
      measures: {
        us: {
          amount: 1.235,
          unitLong: "ounces",
          unitShort: "oz",
        },
        metric: {
          amount: 35,
          unitLong: "grams",
          unitShort: "g",
        },
      },
      original: "35 grams Honey",
      nameClean: "honey",
      consistency: "LIQUID",
      originalName: "Honey",
    },
    {
      id: 2047,
      meta: [],
      name: "salt",
      unit: "teaspoons",
      aisle: "Spices and Seasonings",
      image: "salt.jpg",
      amount: 1.25,
      measures: {
        us: {
          amount: 1.25,
          unitLong: "teaspoons",
          unitShort: "tsps",
        },
        metric: {
          amount: 1.25,
          unitLong: "teaspoons",
          unitShort: "tsps",
        },
      },
      original: "1 1/4 teaspoons salt",
      nameClean: "table salt",
      consistency: "SOLID",
      originalName: "salt",
    },
    {
      id: 11445,
      meta: [],
      name: "seaweed",
      unit: "grams",
      aisle: "Ethnic Foods",
      image: "kombu.jpg",
      amount: 10,
      measures: {
        us: {
          amount: 0.353,
          unitLong: "ounces",
          unitShort: "oz",
        },
        metric: {
          amount: 10,
          unitLong: "grams",
          unitShort: "g",
        },
      },
      original: "10 grams Seaweed",
      nameClean: "kelp",
      consistency: "SOLID",
      originalName: "Seaweed",
    },
    {
      id: 4615,
      meta: ["melted"],
      name: "g-180 shortening",
      unit: "grams",
      aisle: "Oil, Vinegar, Salad Dressing",
      image: "shortening.jpg",
      amount: 150,
      measures: {
        us: {
          amount: 5.291,
          unitLong: "ounces",
          unitShort: "oz",
        },
        metric: {
          amount: 150,
          unitLong: "grams",
          unitShort: "g",
        },
      },
      original: "150 grams g-180 Shortening, melted",
      nameClean: "shortening",
      consistency: "SOLID",
      originalName: "g-180 Shortening, melted",
    },
    {
      id: 19335,
      meta: [],
      name: "sugar",
      unit: "grams",
      aisle: "Baking",
      image: "sugar-in-bowl.png",
      amount: 150,
      measures: {
        us: {
          amount: 5.291,
          unitLong: "ounces",
          unitShort: "oz",
        },
        metric: {
          amount: 150,
          unitLong: "grams",
          unitShort: "g",
        },
      },
      original: "150 grams Sugar",
      nameClean: "sugar",
      consistency: "SOLID",
      originalName: "Sugar",
    },
  ],
  suspiciousDataScore: 0,
  analyzedInstructions: [
    {
      name: "",
      steps: [
        {
          step: "Soak the seaweed, drain and set aside. Sift together the cake flour, baking powder and baking soda.Blend the eggs, sugar, salt, and honey together.",
          number: 1,
          equipment: [],
          ingredients: [
            {
              id: 18369,
              name: "baking powder",
              image: "white-powder.jpg",
              localizedName: "baking powder",
            },
            {
              id: 18372,
              name: "baking soda",
              image: "white-powder.jpg",
              localizedName: "baking soda",
            },
            {
              id: 10020129,
              name: "cake flour",
              image: "flour.png",
              localizedName: "cake flour",
            },
            {
              id: 11445,
              name: "seaweed",
              image: "kombu.jpg",
              localizedName: "seaweed",
            },
            {
              id: 19296,
              name: "honey",
              image: "honey.png",
              localizedName: "honey",
            },
            {
              id: 19335,
              name: "sugar",
              image: "sugar-in-bowl.png",
              localizedName: "sugar",
            },
            {
              id: 1123,
              name: "egg",
              image: "egg.png",
              localizedName: "egg",
            },
            {
              id: 2047,
              name: "salt",
              image: "salt.jpg",
              localizedName: "salt",
            },
          ],
        },
        {
          step: "Add the flour mixture to the egg mixture.",
          number: 2,
          equipment: [],
          ingredients: [
            {
              id: 20081,
              name: "all purpose flour",
              image: "flour.png",
              localizedName: "all purpose flour",
            },
            {
              id: 1123,
              name: "egg",
              image: "egg.png",
              localizedName: "egg",
            },
          ],
        },
        {
          step: "Mix till all combined.",
          number: 3,
          equipment: [],
          ingredients: [],
        },
        {
          step: "Add in melted shortening and seaweed to become the cake batter.Spoon the batter to the greased muffin cups, 80% full and bake at 175C/350F for 20-25 minutes.",
          length: {
            unit: "minutes",
            number: 25,
          },
          number: 4,
          equipment: [
            {
              id: 404676,
              name: "muffin liners",
              image: "muffin-or-cupcake-forms.png",
              localizedName: "muffin liners",
            },
            {
              id: 404784,
              name: "oven",
              image: "oven.jpg",
              temperature: {
                unit: "Celsius",
                number: 175,
              },
              localizedName: "oven",
            },
          ],
          ingredients: [
            {
              id: 4615,
              name: "shortening",
              image: "shortening.jpg",
              localizedName: "shortening",
            },
            {
              id: 11445,
              name: "seaweed",
              image: "kombu.jpg",
              localizedName: "seaweed",
            },
          ],
        },
      ],
    },
  ],
  spoonacularSourceUrl: "https://spoonacular.com/nori-seaweed-muffins-653270",
  weightWatcherSmartPoints: 9,
};

export default function Recipe({ searchParams }: any) {
  const { recipeId } = useParams();

  console.log("recipe, recipeId", recipeId);

  const { getMealPlans, getRecipe } = useContext(AppContext);
  const [mealPlans, setMealPlans] = getMealPlans;
  const [recipe, setRecipe] = getRecipe;

  const [system, setSystem] = useState<any>("us");

  useEffect(() => {
    setRecipe(recip);
  });

  // useEffect(() => {
  //   if (mealPlans) {
  //     for (const mealPlan of mealPlans) {
  //       const foundRecipe = mealPlan.recipes.find(
  //         (recipe) => recipe.id === parseInt(recipeId as string)
  //       );

  //       if (foundRecipe) {
  //         console.log("foundMeal", foundRecipe);
  //         setRecipe(foundRecipe);
  //       }
  //     }
  //   }
  // }, [mealPlans]);

  console.log("recipe", recipe);

  const IMAGE_BASE_URL_INGREDIENTS =
    "https://spoonacular.com/cdn/ingredients_100x100/";
  const IMAGE_BASE_URL_EQUIPMENTS =
    "https://spoonacular.com/cdn/equipment_100x100/";

  let preparation;

  if (recipe) {
    preparation = extractListItems(recipe?.instructions!);
  }

  let equipments: Equipment[] = [];
  recipe?.analyzedInstructions
    .map((instruction) => {
      return instruction.steps.map((step) => {
        return step.equipment?.map((equipment) => {
          return equipment;
        });
      });
    })[0]
    .forEach((e) => equipments.push(...e!));

  console.log("preparation", preparation);
  console.log("equipment", equipments);

  const ids = equipments.map(({ id }) => id);
  const uniqEquipments = equipments.filter(
    ({ id }, index) => !ids.includes(id, index + 1)
  );

  console.log("filtered", uniqEquipments);

  const abbreviations = [
    {
      abreviation: "1 C or c",
      fullWord: "1 cup",
    },
    {
      abreviation: "1 T or tbsp",
      fullWord: "1 tablespoon",
    },
    {
      abreviation: "1 t or tsp",
      fullWord: "1 teaspoon",
    },
    {
      abreviation: "1 lb",
      fullWord: "1 pound",
    },
    {
      abreviation: "1 oz",
      fullWord: "1 ounce",
    },
    {
      abreviation: "1 gal",
      fullWord: "1 gallon",
    },
    {
      abreviation: "1 qt",
      fullWord: "1 quart",
    },
    {
      abreviation: "1 pt",
      fullWord: "1 pint",
    },
  ];

  if (recipe) {
    return (
      <main className=" min-h-screen flex flex-col items-center justify-center py-8">
        {/* <div className="xl:absolute top-16 left-0  p-4 m-2 border rounded-2xl">
          <MyInfos />
        </div> */}
        <h1 className="font-bold text-3xl mt-4 mb-8">{recipe.title}</h1>
        <div className="flex flex-row items-center justify-between  my-4">
          <Image
            src={recipe.image}
            alt={"food picture"}
            height={324}
            width={486}
            style={{ width: "auto", marginTop: 18, marginBottom: 18 }}
            priority
          />
          <div className="dark grid grid-cols-1 lg:grid-cols-2 gap-4 flex-row items-center justify-center m-4">
            <div className=" flex flex-row items-center justify-center p-4 rounded-xl bg-green-700">
              <Clock />
              <h4 className="ml-4">Ready in {recipe.readyInMinutes} minutes</h4>
            </div>

            {
              <div className=" flex flex-row items-center justify-center p-4 rounded-xl bg-secondary">
                <LeafyGreen />
                <h4 className="ml-4">Vegetarian</h4>
              </div>
            }
            {
              <div className=" flex flex-row items-center justify-center p-4 rounded-xl bg-green-700 ">
                <WheatOff />
                <h4 className="ml-4">Gluten Free</h4>
              </div>
            }
            {
              <div className=" flex flex-row items-center justify-center p-4 rounded-xl bg-green-700 ">
                <MilkOff />
                <h4 className="ml-4">Dairy Free</h4>
              </div>
            }
          </div>
        </div>

        <div className="max-w-7xl flex flex-col items-center justify-center ">
          <div className="w-full flex flex-col items-center justify-center mt-8 ">
            <h2 className="font-bold  border-b-1 py-4 text-xl my-4 w-full">
              Ingredients
            </h2>

            <div className="flex flex-row items-center justify-between my-4 w-full ">
              <p>Servings: {recipe.servings}</p>

              <Tabs
                onValueChange={setSystem}
                defaultValue="metric"
                className=""
              >
                <TabsList>
                  <TabsTrigger className="w-24" value="metric">
                    Metric
                  </TabsTrigger>
                  <TabsTrigger className="w-24" value="us">
                    US
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex flex-row justify-center items-center space-x-8 w-full">
              <Table className="w-4/6">
                <TableHeader></TableHeader>
                <TableBody>
                  {recipe.extendedIngredients.map((e) => {
                    return (
                      <TableRow key={e.id}>
                        <TableCell className="flex flex--col justify-center items-center">
                          <Image
                            width={100}
                            height={100}
                            alt="ingredients image"
                            src={IMAGE_BASE_URL_INGREDIENTS + e.image}
                            style={{ height: 40, width: "auto" }}
                          />
                        </TableCell>
                        <TableCell>
                          {system === "metric"
                            ? decimalToFraction(e.measures.metric.amount) +
                              e.measures.metric.unitShort
                            : decimalToFraction(e.measures.us.amount) +
                              e.measures.us.unitShort}
                        </TableCell>
                        <TableCell>{e.name}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className="w-2/6 flex flex-col justify-center items-center ">
                <h3>Abbreviations</h3>
                <Table className="text-xs">
                  <TableRow>
                    <TableHeader></TableHeader>
                  </TableRow>
                  <TableBody>
                    {abbreviations.map((e) => {
                      return (
                        <TableRow key={e.abreviation}>
                          <TableCell>{e.abreviation}</TableCell>
                          <TableCell>{e.fullWord}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center my-4">
            <h2 className="font-bold  border-b-1 py-4 text-xl my-4 w-full">
              Instructions
            </h2>

            {/* {recipe.analyzedInstructions.map((instruction) => {
              return instruction.steps.map((step) => {
                return (
                  <div
                    className="flex flex-row justify-between items-center border-b-1 py-8 border-zinc-600 w-full"
                    key={step.number}
                  >
                    <p className=" text-2xl font-semibold flex justify-center w-1/5">
                      {step.number}
                    </p>
                    <div className="flex flex-col items-start justify-center w-4/5">
                      <div className="flex flex-row justify-center space-x-6  my-8 bg-slate-800 p-4 rounded-3xl">
                        <p className="flex flex-col justify-center items-center text-sm font-normal">
                          Equipment
                        </p>
                        {step.equipment?.map((equipment) => {
                          return (
                            <div
                              className="flex flex-col justify-center items-center"
                              key={equipment.id}
                            >
                              <Image
                                width={100}
                                height={100}
                                alt="equipment image"
                                src={
                                  IMAGE_BASE_URL_EQUIPMENTS + equipment.image
                                }
                                style={{ width: "auto", height: 30 }}
                              />
                              <p className="flex flex-col justify-center items-center text-sm font-light">
                                {equipment.name}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                      <p>{step.step}</p>
                    </div>
                  </div>
                );
              });
            })} */}
            <h3 className="font-semibold  py-4 text-base my-4 w-full">
              Equipment
            </h3>

            <div className="flex flex-row justify-center items-center space-x-4 my-4">
              {recipe.analyzedInstructions.map((instruction) => {
                return instruction.steps.map((step) => {
                  return step.equipment?.map((equipment) => {
                    return (
                      <div
                        className="flex flex-col justify-center items-center"
                        key={equipment.id}
                      >
                        <Image
                          width={100}
                          height={100}
                          alt="equipment image"
                          src={IMAGE_BASE_URL_EQUIPMENTS + equipment.image}
                          style={{ width: "auto", height: 30 }}
                        />
                        <p className="flex flex-col justify-center items-center text-sm font-light">
                          {equipment.name}
                        </p>
                      </div>
                    );
                  });
                });
              })}
            </div>
            <h3 className="font-semibold  py-4 text-base my-4 w-full">
              Preparation
            </h3>
            <div className="flex flex-col justify-center items-start max-w-5xl ">
              {preparation?.map((step, i) => {
                return (
                  <div
                    key={i}
                    className="flex flex-row justify-center items-start  my-4"
                  >
                    <div className="font-normal w-8 h-8 mr-4">
                      <p className="font-normal border border-primary-700 w-8 h-8 flex flex-row justify-center items-center rounded-3xl ">
                        {i + 1}
                      </p>
                    </div>
                    <p>{step}</p>
                  </div>
                );
              })}
            </div>
            {/* <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} /> */}
          </div>
          <div className="w-full flex flex-col items-center justify-center ">
            <h2 className="font-bold  border-b-1 py-4 text-xl my-4 w-full">
              Nutrition
            </h2>
            <h3 className="font-bold  py-4 text-3xl my-4  ">
             {Math.round(recipe.nutrition.nutrients[0].amount)} <span className="font-extralight  py-4 text-3xl my-4 w-full">calories</span>
            </h3>
            <Table className="text-xs">
              <TableHeader></TableHeader>
              <TableBody>
                {recipe.nutrition.nutrients.map((e, i) => {
                  if (i > 0) {
                    return (
                      <TableRow key={e.name}>
                        <TableCell className="w-36 font-semibold">{e.name}</TableCell>
                        <TableCell className="w-32">
                          {e.amount}
                          {e.unit}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-row justify-center items-center space-x-4"> <Progress
                              className=""
                              value={e.percentOfDailyNeeds}
                            />{" "}
                            <div className="font-semibold">{e.percentOfDailyNeeds}%</div>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>

            <div className="flex flex-row justify-center items-center space-x-8 w-full"></div>
          </div>
          <div className="font-light flex flex-row items-center justify-start w-full my-8">
            Read the detailed instructions on
            <Link
              isExternal
              className="font-normal ml-2 text-primary-500"
              href={recipe.sourceUrl}
            >
              {recipe.creditsText}
            </Link>
          </div>
        </div>
      </main>
    );
  }
}
