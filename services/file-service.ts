import prisma from "@/lib/prisma";
import { uploadFileToS3 } from "@/services/s3-service";
import { ImageType } from "@/types/image-type";
import { Image } from "@prisma/client";
import { Fields, Files } from "formidable";
import { Session } from "next-auth";

export async function handleFileUpload(
  files: Files,
  fields: Fields,
  session: Session
) {
  try {
    const uploadedFiles = Array.isArray(files.file) ? files.file : [files.file];

    if (uploadedFiles.length === 0) {
      throw new Error("No files found");
    }

    const imageRecords = [];
    for (let index = 0; index < uploadedFiles.length; index++) {
      const file = uploadedFiles[index]!;
      const id: any = fields[index];

      const fileName = await generateFileName({
        id,
        name: `${id}-${file?.originalFilename}`!,
      });

      const s3Url = await uploadFileToS3({
        file,
        fileName,
      });

      const image = {
        id: Number(fields?.imageId?.[index] as any),
        url: s3Url,
        userId: (session as any).user.id,
      };
      console.log(image);

      imageRecords.push(image);
    }
    return imageRecords as Image[];
  } catch (error) {
    console.log(error);
    throw new Error(error as any);
  }
}

async function generateFileName({
  name,
  id,
}: {
  name: string;
  id?: number | undefined;
}) {
  const lastImage = (await prisma.image.findFirst({
    orderBy: { id: "desc" },
  })) || { id: 0 };
  const imageId = id || lastImage ? lastImage.id! + 1 : 1;
  const fileName = `${new Date().getFullYear()}/${imageId}-${name}`;

  return fileName;
}
