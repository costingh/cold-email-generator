/*
  Warnings:

  - Added the required column `user_email` to the `Segment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Segment" ADD COLUMN     "user_email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Segment" ADD CONSTRAINT "Segment_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
