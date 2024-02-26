/*
  Warnings:

  - You are about to alter the column `caloriesGoal` on the `MealPlans` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "MealPlans" ALTER COLUMN "caloriesGoal" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "heightInches" SET DATA TYPE TEXT;
