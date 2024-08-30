-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_imageId_fkey";

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "imageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
