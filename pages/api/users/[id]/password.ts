import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

/**
 * @swagger
 * /api/users/{id}/password:
 *   put:
 *     summary: Atualiza a senha de um usuário
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: New password
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: No parameter was passed
 *       404:
 *         description: User not found
 *       500:
 *         description: Error while updating password
 *
 *    */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  const { password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ message: "No parameter was passed." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    console.log(user.password);
    const hashedPassword = await generatePassword(user.email, password);
    console.log(hashedPassword);
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error while updating password." });
  }
}

export const generatePassword = async (email: string, password: string) => {
  const newPassword = email.split("@")[0] + password;

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  return hashedPassword;
};
