import prisma from "@/lib/prisma";
import { Image, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /api/crud:
 *   post:
 *     description: Endpoint para fazer crud de um ou vários registros.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               method:
 *                 type: string
 *               data:
 *                 type: object
 *               table:
 *                 type: string
 *     responses:
 *       200:
 *         description: returns the object according to the method provided.
 *       500:
 *         description: failed to load data.
 *
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method, data, table } = req.body;
    const result = await handleCrudRequest(data, table, method);
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}

export type CrudRequest = {
  method: keyof PrismaClient["account"];
  data: any;
  table: keyof PrismaClient;
};

async function handleCrudRequest(
  data: CrudRequest["data"],
  table: CrudRequest["table"],
  method: CrudRequest["method"]
) {
  let res;
  switch (method) {
    case "create":
      /* @ts-ignore */
      res = await prisma[table][method]({ data });
      return res;
    case "update":
    case "delete":
    case "findMany":
    case "findFirst":
      /* @ts-ignore */
      res = await prisma[table][method](data);
      return res;
  }
}

export async function handleApiRequest(
  data: CrudRequest["data"],
  table: CrudRequest["table"],
  method: CrudRequest["method"]
) {
  // make the request to backend nextjs /api/crud
  if (table === "image" && method === "create") {
    handleCreateImage(data);
    return;
  }
  const response = await fetch(`/api/crud`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      method,
      data,
      table,
    }),
  });
  const json = await response.json();
  return json;
}

export type RawFileProps = {
  file?: File | File[];
  description: string;
  image?: Image | Image[];
};

async function imageToBlob(imageUrl: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', imageUrl, true);
    xhr.responseType = 'blob';
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error(`Failed to convert image URL to Blob: ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => {
      reject(new Error('Failed to convert image URL to Blob'));
    };
    xhr.send();
  });
}

async function convertImageToBlobFile(image: Image): Promise<File> {
  const blob = await imageToBlob(image.url);
  const filename = `${image.name}.png`; // You may adjust the file name as needed
  const mimeType = 'image/png'; // Adjust mime type if necessary
  return new File([blob], filename, { type: mimeType });
}

async function convertImagesToFiles(images: Image[]): Promise<File[]> {
  const filePromises = images.map(image => convertImageToBlobFile(image));
  return Promise.all(filePromises);
}

export async function handleCreateImage(data: RawFileProps) {
  console.log(data);

  if (data.image) {
    let files: File | File[] | undefined = undefined;
    
    if (Array.isArray(data.image)) {
      files = await convertImagesToFiles(data.image);
    } else {
      files = await convertImageToBlobFile(data.image);
    }

    return handleCreateImage({ ...data, file: files });
  }

  const formData = new FormData();

  if (Array.isArray(data.file)) {
    data.file.forEach((file) => {
      formData.append("file", file);
    });
  } else if (data.file) {
    formData.append("file", data.file);
  }

  formData.append("description", data.description);

  const response = await fetch(`/api/file`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const json: Image = await response.json();
  console.log(json);
  return json;
}