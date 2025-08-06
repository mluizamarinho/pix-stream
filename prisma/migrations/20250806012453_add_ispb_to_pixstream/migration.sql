/*
  Warnings:

  - Added the required column `ispb` to the `PixStream` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."PixStream" ADD COLUMN     "ispb" TEXT NOT NULL;
