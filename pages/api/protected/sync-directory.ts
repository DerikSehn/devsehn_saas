import prisma from "@/lib/prisma";
import { uploadDirectoryToS3 } from "@/services/s3-service";

/**
 * @swagger
 * /api/protected/sync-directory:
 *   post:
 *     summary: Faz upload de uma pasta para o S3 e atualiza as URLs das imagens no banco de dados.
 *     tags:
 *       - directory
 *     description: Endpoint para sincronizar um diretório local com o armazenamento em nuvem e atualizar as URLs das imagens no banco de dados.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               directory:
 *                 type: string
 *                 description: Caminho do diretório local a ser sincronizado.
 *                 example: "public/uploads/2024"
 *               newBaseUrl:
 *                 type: string
 *                 description: Novo link base para substituir "/uploads/" nas URLs das imagens.
 *                 example: "https://cultura-verde-bucket.s3.sa-east-1.amazonaws.com/"
 *     responses:
 *       200:
 *         description: Retorna uma mensagem de sucesso.
 *       500:
 *         description: Falha ao carregar os dados.
 *
 */
export default async function handler(req: any, res: any) {
  try {
    const { directory, newBaseUrl } = req.body;

    /*  await uploadDirectoryToS3(directory);
    await new Promise((resolve) => setTimeout(resolve, 5000)); */
    await updateImageUrls(newBaseUrl);

    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}

export async function updateImageUrls(newBaseUrl: string) {
  return await prisma.$transaction(async (prisma) => {
    const images = await prisma.image.findMany({
      where: {
        url: {
          startsWith: "/uploads/",
        },
      },
    });

    const updatePromises = images.map((image) => {
      const newUrl = image?.url?.replace("/uploads/", newBaseUrl);
      return prisma.image.update({
        where: { id: image.id },
        data: { url: newUrl },
      });
    });

    return await Promise.all(updatePromises);
  });
}
