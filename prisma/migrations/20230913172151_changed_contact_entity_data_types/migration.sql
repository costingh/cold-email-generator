-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "links" DROP NOT NULL,
ALTER COLUMN "links" SET DATA TYPE TEXT,
ALTER COLUMN "social_media" DROP NOT NULL,
ALTER COLUMN "social_media" SET DATA TYPE TEXT;
