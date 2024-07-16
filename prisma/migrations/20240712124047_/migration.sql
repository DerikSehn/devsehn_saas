/*
  Warnings:

  - A unique constraint covering the columns `[imageId]` on the table `Testimonial` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Testimonial" ADD COLUMN     "imageId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Testimonial_imageId_key" ON "Testimonial"("imageId");

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("imageId") ON DELETE RESTRICT ON UPDATE CASCADE;
