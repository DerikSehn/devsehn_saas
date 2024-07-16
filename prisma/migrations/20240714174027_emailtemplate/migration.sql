-- CreateTable
CREATE TABLE "EmailTemplate" (
    "id" SERIAL NOT NULL,
    "headerTitle" TEXT NOT NULL,
    "headerSubtitle" TEXT NOT NULL,
    "buttonText" TEXT NOT NULL,
    "buttonLink" TEXT NOT NULL,
    "footerText" TEXT NOT NULL,

    CONSTRAINT "EmailTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailContent" (
    "id" SERIAL NOT NULL,
    "heading" TEXT NOT NULL,
    "paragraph" TEXT NOT NULL,
    "emailTemplateId" INTEGER,

    CONSTRAINT "EmailContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailLink" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "emailTemplateId" INTEGER,

    CONSTRAINT "EmailLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmailContent" ADD CONSTRAINT "EmailContent_emailTemplateId_fkey" FOREIGN KEY ("emailTemplateId") REFERENCES "EmailTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailLink" ADD CONSTRAINT "EmailLink_emailTemplateId_fkey" FOREIGN KEY ("emailTemplateId") REFERENCES "EmailTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
