-- DropForeignKey
ALTER TABLE "Testimonial" DROP CONSTRAINT "Testimonial_imageId_fkey";

-- AlterTable
ALTER TABLE "Testimonial" ALTER COLUMN "imageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
