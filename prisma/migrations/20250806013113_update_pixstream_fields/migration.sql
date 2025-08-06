/*
  Warnings:

  - You are about to drop the column `createdAt` on the `PixStream` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `PixStream` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."PixStream" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "lastReadId" INTEGER NOT NULL DEFAULT 0;
