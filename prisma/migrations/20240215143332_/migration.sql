/*
  Warnings:

  - You are about to drop the column `mealPlans` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tdee` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "mealPlans",
DROP COLUMN "tdee";

-- CreateTable
CREATE TABLE "MealPlans" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "weightGoal" DECIMAL(65,30),
    "mealPlans" JSONB,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MealPlans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MealPlans_id_key" ON "MealPlans"("id");

-- AddForeignKey
ALTER TABLE "MealPlans" ADD CONSTRAINT "MealPlans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
