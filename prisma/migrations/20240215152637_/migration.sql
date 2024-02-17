/*
  Warnings:

  - You are about to drop the column `mealPlans` on the `MealPlans` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MealPlans" DROP COLUMN "mealPlans",
ADD COLUMN     "mealPlan" JSONB;
