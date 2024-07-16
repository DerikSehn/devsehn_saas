import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import prisma from "../../lib/prisma";

export const config = {
    api: {
        bodyParser: false,
    },
};


/**
 * @swagger
 * /api/upload-files:
 *   post:
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
 *               description:
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
    const session = await getSession({ req }) as any;

    if (!session) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields: any, files) => {
        if (err) {
            return res.status(500).json({ error: "Error parsing file" });
        }

        const uploadedFiles = Array.isArray(files.file) ? files.file : [files.file]; // Ensure files is an array

        if (uploadedFiles.length === 0) {
            return res.status(400).json({ error: "No files found" });
        }

        const currentYear = new Date().getFullYear();
        const directory = `/public${process.env.NEXT_PUBLIC_UPLOADS_DIRECTORY}/${currentYear}`;
        const uploadsDir = path.join(process.cwd(), directory);

        // Ensure the uploads directory exists
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const imageRecords: File[] = [];


        uploadedFiles.forEach(async (file, index) => {
            const fileName = file!.originalFilename || `${Date.now()}-${file.newFilename}`;
            const filePath = path.join(uploadsDir, fileName);

            // Save the file to the uploads directory
            fs.copyFileSync(file!.filepath, filePath);

            // Generate the URL path to be saved in the database
            const urlPath = `${process.env.NEXT_PUBLIC_UPLOADS_DIRECTORY}/${currentYear}/${fileName}`;

            // Insert the image URL path into the Prisma database
            const image = await prisma.image.create({
                data: {
                    url: urlPath,
                    name: fileName,
                    description: fields?.description?.[index] || null,
                    projectId: fields?.projectId?.[0],
                    userId: session.user.id,
                },
            });

            imageRecords.push(image);
        });
        res.status(200).json(imageRecords);
    });
}
