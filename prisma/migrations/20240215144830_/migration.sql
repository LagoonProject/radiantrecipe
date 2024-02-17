/*
  Warnings:

  - The primary key for the `MealPlans` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `MealPlans` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "MealPlans_id_key";

-- AlterTable
ALTER TABLE "MealPlans" DROP CONSTRAINT "MealPlans_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "MealPlans_pkey" PRIMARY KEY ("id");
