-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);
