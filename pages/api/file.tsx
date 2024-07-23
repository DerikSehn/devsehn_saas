import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import prisma from "../../lib/prisma";
import { Image } from "@prisma/client";

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

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Error parsing the form:', err);
            return res.status(500).send('Error parsing the form');
        }

        console.log(fields);
        console.log(files);

        if (err) {
            return res.status(500).json({ error: "Error parsing file" });
        }

        const uploadedFiles = Array.isArray(files.file) ? files.file : [files.file]; // Ensure files is an array

        if (uploadedFiles.length === 0) {
            return res.status(400).json({ error: "No files found" });
        }


        // const imageUrls = Array.isArray(fields.imageUrl) ? fields.imageUrl : [fields.imageUrl];
        const imageNames: any[] = Array.isArray(fields.imageName) ? fields.imageName : [fields.imageName];
        const imageDescriptions: any[] = Array.isArray(fields.imageDescription) ? fields.imageDescription : [fields.imageDescription];

        const currentYear = new Date().getFullYear();
        const directory = `/public${process.env.NEXT_PUBLIC_UPLOADS_DIRECTORY}/${currentYear}`;
        const uploadsDir = path.join(process.cwd(), directory);

        // Ensure the uploads directory exists
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const imageRecords: Image[] = [];

        for (let index = 0; index < uploadedFiles.length; index++) {
            const file: any = uploadedFiles[index];
            const lastImage = await prisma.image.findFirst({
                orderBy: { id: 'desc' }
            });
            const imageId = lastImage ? lastImage.id + 1 : 1;
            const fileName = `${imageId}.${(file.originalFilename || file.newFilename)!.split('.')[1]}`
            const filePath = path.join(uploadsDir, fileName);

            // Save the file to the uploads directory
            fs.copyFileSync(file.filepath, filePath);



            // Generate the URL path to be saved in the database
            const urlPath = `${process.env.NEXT_PUBLIC_UPLOADS_DIRECTORY}/${currentYear}/${fileName}`;
            const image = await prisma.image.create({
                data: {
                    url: urlPath,
                    name: imageNames[index],
                    description: imageDescriptions[index],
                    projectId: fields.projectId as any ? (fields as any).projectId[0] as any : null,
                    userId: session!.user!.id!,
                },
            });

            // Insert the image URL path into the Prisma database

            imageRecords.push(image);
            res.status(200).json(imageRecords);

        }
        res.status(200).json({ message: 'Upload successful', files: imageRecords });
    })
}
