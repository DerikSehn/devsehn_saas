import { handleError } from '@/lib/utils/error-utils';
import { parseForm } from '@/lib/utils/formidable-utils';
import { authenticate } from '@/services/auth-service';
import { handleFileUpload } from '@/services/file-service';
import { updatePrismaImages } from '@/services/image-service';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /api/protected/file:
 *   post:
 *     summary: Upload de arquivos e criação de registros de imagem
 *     tags:
 *       - file
 *     description: Endpoint para fazer upload de arquivos e criar registros de imagem.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               imageName:
 *                 type: array
 *                 items:
 *                   type: string
 *               imageDescription:
 *                 type: array
 *                 items:
 *                   type: string
 *               projectId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sucesso na criação dos registros de imagem.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       500:
 *         description: Erro ao processar os arquivos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await authenticate(req, res);
    if (!session) return;


    const { fields, files, error } = await parseForm(req);
    if (error) {
        return res.status(500).json({ error: "Error parsing file" });
    }





    try {
        const imageRecords = await handleFileUpload(files, fields, session);

        const result = await updatePrismaImages(imageRecords);

        return res.status(200).json(result);
    } catch (err) {

        handleError(res, err, "Error processing files");
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};


