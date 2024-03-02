/*
  Warnings:

  - You are about to drop the column `subscriptionEnds` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "subscriptionEnds",
ADD COLUMN     "stripeSessionId" TEXT;
