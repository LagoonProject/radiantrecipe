/*
  Warnings:

  - You are about to drop the column `subsciptionEnds` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "subsciptionEnds",
ADD COLUMN     "subscriptionEnds" TIMESTAMP(3);
