/*
  Warnings:

  - You are about to drop the column `weightGoal` on the `MealPlans` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MealPlans" DROP COLUMN "weightGoal",
ADD COLUMN     "caloriesGoal" DECIMAL(65,30);
