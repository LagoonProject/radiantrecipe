/*
  Warnings:

  - You are about to drop the `Key` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pdf_guide_downloaded` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Key" DROP CONSTRAINT "Key_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_user_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pdf_guide_downloaded" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "Key";

-- DropTable
DROP TABLE "Session";
