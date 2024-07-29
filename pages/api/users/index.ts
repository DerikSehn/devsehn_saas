import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { generatePassword } from "./[id]/password";

/**
 * @swagger
 * /api/users/{id}:
 *   post:
 *     summary: cria um usuário
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: No parameter was passed
 *       500:
 *         description: Error while creating user
 *
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password, emailVerified } = req.body;

  console.log(email, password);
  if (!name || !email || !password) {
    return res.status(400).json({ message: "No parameter was passed." });
  }

  try {
    const user = await prisma.user.upsert({
      where: {
        email,
      },
      update: {
        name,
        email,
        emailVerified,
      },
      create: {
        name,
        email,
        emailVerified,
        password: await generatePassword(email, password),
      },
    });

    return res
      .status(200)
      .json({ message: "User created successfully.", user });
  } catch (error) {
    return res.status(500).json({ message: "Error while creating user." });
  }
}
