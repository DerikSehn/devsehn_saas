import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /api/contact:
 *   post:
 *     description: Endpoint para enviar um email.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               message:
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
    const { email, name, message } = req.body;
    console.log(email, name, message);

    /* prisma model ReceivedEmail */
    await prisma.receivedEmail.create({
      data: {
        email,
        name,
        message,
      },
    });
    res.status(200).json({ message: "Email enviado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao enviar email" });
  }
}
