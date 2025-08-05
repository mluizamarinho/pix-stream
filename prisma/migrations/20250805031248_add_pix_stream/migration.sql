-- AlterTable
ALTER TABLE "public"."MensagemPix" ADD COLUMN     "pixStreamId" TEXT;

-- CreateTable
CREATE TABLE "public"."PixStream" (
    "id" TEXT NOT NULL,
    "interactionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PixStream_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PixStream_interactionId_key" ON "public"."PixStream"("interactionId");

-- AddForeignKey
ALTER TABLE "public"."MensagemPix" ADD CONSTRAINT "MensagemPix_pixStreamId_fkey" FOREIGN KEY ("pixStreamId") REFERENCES "public"."PixStream"("id") ON DELETE SET NULL ON UPDATE CASCADE;
