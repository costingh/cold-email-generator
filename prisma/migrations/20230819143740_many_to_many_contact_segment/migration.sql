/*
  Warnings:

  - You are about to drop the `_ContactToSegment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ContactToSegment" DROP CONSTRAINT "_ContactToSegment_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContactToSegment" DROP CONSTRAINT "_ContactToSegment_B_fkey";

-- DropTable
DROP TABLE "_ContactToSegment";

-- CreateTable
CREATE TABLE "ContactSegment" (
    "id" SERIAL NOT NULL,
    "contactId" INTEGER,
    "segmentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactSegment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContactSegment" ADD CONSTRAINT "ContactSegment_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactSegment" ADD CONSTRAINT "ContactSegment_segmentId_fkey" FOREIGN KEY ("segmentId") REFERENCES "Segment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
