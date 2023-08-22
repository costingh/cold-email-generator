/*
  Warnings:

  - You are about to drop the column `position` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "position",
ADD COLUMN     "biography" TEXT,
ADD COLUMN     "education" TEXT,
ADD COLUMN     "interests" TEXT[],
ADD COLUMN     "job_title" TEXT,
ADD COLUMN     "links" TEXT[],
ADD COLUMN     "location" TEXT,
ADD COLUMN     "social_media" TEXT[];
