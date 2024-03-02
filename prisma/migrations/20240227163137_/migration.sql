/*
  Warnings:

  - The `customerPlan` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('PRO', 'FREE');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "customerPlan",
ADD COLUMN     "customerPlan" "Plan" DEFAULT 'FREE';
