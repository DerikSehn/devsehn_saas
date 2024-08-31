import { persistentFileToBuffer } from "@/lib/utils/file-utils";
import AWS from "aws-sdk";
import { File } from "formidable";
import fs from "fs/promises";
import path from "path";
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
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: fileName,
    Body: await persistentFileToBuffer(file),
    ContentType: file.mimetype as any,
  };

  try {
    const data = await s3.upload(params).promise();

    return data.Location;
  } catch (error) {
    console.error("Erro ao fazer upload para o S3:", error);
    throw new Error("Não foi possível fazer upload do arquivo");
  }
};

export const uploadDirectoryToS3 = async (
  directoryPath: string,
  s3Path = ""
) => {
  try {
    const dir = directoryPath.endsWith("/")
      ? directoryPath
      : `${directoryPath}/`;
    const files = await fs.readdir(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const fileStat = await fs.stat(fullPath);

      if (fileStat.isDirectory()) {
        // Recursivamente enviar a subpasta
        await uploadDirectoryToS3(fullPath, path.join(s3Path, file));
      } else {
        // Ler o arquivo e enviar
        const fileContent = await fs.readFile(fullPath);

        const key = path.join(s3Path, file);

        const params = {
          Bucket: process.env.AWS_S3_BUCKET_NAME!,
          Key: key,
          Body: fileContent,
          ContentType: "application/octet-stream", // Opcional: Defina o tipo de conteúdo
        };

        try {
          const data = await s3.upload(params).promise();
        } catch (err) {
          console.error(`Erro ao enviar arquivo ${file}:`, err);
        }
      }
    }
  } catch (error) {
    throw new Error("erro ao fazer upload de diretório: " + error);
  }
};
