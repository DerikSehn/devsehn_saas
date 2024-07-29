// pages/api/markAsRead/[id].ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

/**
 * @swagger
 * /api/markAsRead/{id}:
 *   patch:
 *     description: Endpoint para marcar um email como lido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
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
  const {
    query: { id },
    method,
  } = req;

  console.log(req.body);

  if (method === "PATCH") {
    try {
      // Atualizar o e-mail para marcado como lido
      const updatedEmail = await prisma.receivedEmail.update({
        where: { id: Number(id) },
        data: { isRead: true },
      });

      return res.status(200).json(updatedEmail);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar o e-mail" });
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
