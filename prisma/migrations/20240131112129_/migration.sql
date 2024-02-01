-- AlterTable
ALTER TABLE "User" ALTER COLUMN "pdf_guide_downloaded" DROP NOT NULL,
ALTER COLUMN "pdf_guide_downloaded" SET DEFAULT false;
