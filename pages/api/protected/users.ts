import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import Nextauth from "../auth/[...nextauth]";
import { generatePassword } from "../users/[id]/password";
/**
 * @swagger
 * /api/protected/users:
 *   post:
 *     summary: cria um usuário
 *     tags:
 *       - users
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
 *       401:
 *         description: You are not signed in
 *       500:
 *         description: Error while creating user
 *   delete:
 *     summary: exclui um usuário
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID do usuário
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Condition not met
 *       401:
 *         description: You are not signed in
 *       500:
 *         description: Error while deleting user
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password, emailVerified } = req.body;

  const session = (await getServerSession(req, res, Nextauth)) as any;

  const method = req.method as string;
  if (method === "DELETE") {
    try {
      if (session.user.id === req.body.id) {
        return res.status(400).json({ message: "You can't delete yourself." });
      }
      if ((await prisma.user.count()) === 1) {
        return res
          .status(400)
          .json({ message: "You can't delete the last user." });
      }
      await prisma.user.delete({
        where: {
          id: req.body.id as string,
        },
      });
      return res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      return res.status(500).json({ message: "Error while deleting user." });
    }
  } else {
    if (!session) {
      return res.status(401).json({ message: "You are not signed in." });
    }
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
}
