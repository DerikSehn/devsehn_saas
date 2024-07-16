/*
  Warnings:

  - You are about to drop the `ProjectSection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectSection" DROP CONSTRAINT "ProjectSection_projectId_fkey";

-- DropTable
DROP TABLE "ProjectSection";
