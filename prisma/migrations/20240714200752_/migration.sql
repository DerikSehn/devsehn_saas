/*
  Warnings:

  - A unique constraint covering the columns `[keyword]` on the table `EmailTemplate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `keyword` to the `EmailTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailTemplate" ADD COLUMN     "keyword" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EmailTemplate_keyword_key" ON "EmailTemplate"("keyword");
