/*
  Warnings:

  - You are about to drop the column `stripePurchasedId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "stripePurchasedId",
ADD COLUMN     "stripeCustomerId" TEXT;
