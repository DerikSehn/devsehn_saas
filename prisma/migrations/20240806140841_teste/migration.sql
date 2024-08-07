/*
  Warnings:

  - You are about to drop the column `token` on the `Setting` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Setting" DROP COLUMN "token",
ALTER COLUMN "value" SET DATA TYPE TEXT;
