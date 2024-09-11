/*
  Warnings:

  - A unique constraint covering the columns `[model]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[field]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Comment_model_key" ON "Comment"("model");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_field_key" ON "Comment"("field");
