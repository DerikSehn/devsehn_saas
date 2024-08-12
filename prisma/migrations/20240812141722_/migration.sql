/*
  Warnings:

  - A unique constraint covering the columns `[reviewId]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reviewId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "reviewId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "OrderReview" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "OrderReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_reviewId_key" ON "OrderItem"("reviewId");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "OrderReview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
