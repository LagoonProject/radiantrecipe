-- AlterTable
ALTER TABLE "User" ADD COLUMN     "date_of_birth" TIMESTAMP(3),
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "height" DECIMAL(5,3),
ADD COLUMN     "weight" DECIMAL(5,3);
