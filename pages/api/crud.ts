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
export async function handleCreateImage(data: {
  file: File | File[];
  description: string;
}) {
  const formData = new FormData();
  if ((data.file as File[])?.length > 0) {
    (data.file as File[]).forEach((file) => {
      formData.append("file", file);
    });
  } else {
    formData.append("file", data.file as File);
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
