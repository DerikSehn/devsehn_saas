import prisma from "@/lib/prisma";
import formidable from "formidable";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import path from "path";

export const config = {
    api: {
        bodyParser: false,
    },
};

/**
 * @swagger
 * /api/protected/upload-files:
 *   post:
 *     summary: Upload de arquivos
 *     tags:
 *       - files
 *     description: Endpoint para fazer upload de um ou vários files.
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
 *               imageUrl:
 *                 type: string
 *               imageName:
 *                 type: string
 *               imageDescription:
 *                 type: string
 *               projectId:
 *                 type: string
 *     responses:
 *       200:
 *         description: returns the information of the files that were inserted.
 *       400:
 *         description: could not find files.
 *       401:
 *         description: user not authenticated.
 *       500:
 *         description: error processing file.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields: any, files) => {
        if (err) {
            return res.status(500).json({ error: "Error parsing file" });
        }

        try {

            const uploadedFiles = Array.isArray(files.file) ? files.file : [files.file];

            if (uploadedFiles.length === 0) {
                return res.status(400).json({ error: "No files found" });
            }

            const imageNames = Array.isArray(fields.imageName) ? fields.imageName : [fields.imageName];
            const imageDescriptions = Array.isArray(fields.imageDescription) ? fields.imageDescription : [fields.imageDescription];

            const currentYear = new Date().getFullYear();
            const uploadsDir = path.join(process.cwd(), 'public', process.env.UPLOADS_DIRECTORY!, currentYear.toString());

            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
            }

            const imageRecords = [];
            for (let index = 0; index < uploadedFiles.length; index++) {
                const file = uploadedFiles[index];
                const lastImage = await prisma.image.findFirst({
                    orderBy: { id: 'desc' }
                });
                const imageId = lastImage ? lastImage.id + 1 : 1;
                const fileName = `${imageId}-${file!.originalFilename}`;
                const filePath = path.join(uploadsDir, fileName);

                fs.copyFileSync(file!.filepath, filePath);
                const urlPath = `${process.env.UPLOADS_DIRECTORY}/${currentYear}/${fileName}`;
                const image = await prisma.image.create({
                    data: {
                        url: urlPath,
                        name: imageNames[index],
                        description: imageDescriptions[index],
                        projectId: fields.projectId ? fields.projectId[0] : null,
                        userId: (session as any).user.id,
                    },
                });

                imageRecords.push(image);
            }

            res.status(200).json({ message: 'Upload successful', files: imageRecords });
        } catch (error) {
            res.status(500).json({ error: "Error processing file" });
        }
    });
}
