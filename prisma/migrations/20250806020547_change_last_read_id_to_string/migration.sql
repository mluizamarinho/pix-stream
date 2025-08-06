-- DropIndex
DROP INDEX "public"."PixStream_interactionId_key";

-- AlterTable
ALTER TABLE "public"."PixStream" ALTER COLUMN "lastReadId" DROP DEFAULT,
ALTER COLUMN "lastReadId" SET DATA TYPE TEXT;
