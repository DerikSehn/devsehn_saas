/*
  Warnings:

  - The primary key for the `Image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `src` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Image" DROP CONSTRAINT "Image_pkey",
DROP COLUMN "id",
ADD COLUMN     "imageId" SERIAL NOT NULL,
ADD COLUMN     "projectId" INTEGER,
ADD COLUMN     "userId" TEXT,
ADD CONSTRAINT "Image_pkey" PRIMARY KEY ("imageId");

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "src";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
