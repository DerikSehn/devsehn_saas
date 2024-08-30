import { persistentFileToBuffer } from "@/lib/utils/file-utils";
import AWS from "aws-sdk";
import { File } from "formidable";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadFileToS3 = async ({
  file,
  fileName,
}: {
  file: File;
  fileName: string;
}): Promise<string> => {
  console.log(file.mimetype);
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: fileName,
    Body: await persistentFileToBuffer(file),
    ContentType: file.mimetype as any,
  };
  console.log(params);

  try {
    const data = await s3.upload(params).promise();
    console.log(data.Location);
    return data.Location;
  } catch (error) {
    console.log("Error uploading to S3:", error);
    console.error("Erro ao fazer upload para o S3:", error);
    throw new Error("Não foi possível fazer upload do arquivo");
  }
};
