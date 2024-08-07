import prisma from "@/lib/prisma";
import { EmailContent, EmailLink } from "@prisma/client";
import { renderAsync } from "@react-email/render";
import EmailTemplate from "../email/EmailTemplate";
import { v4 as uuidv4 } from "uuid"; // Para gerar o token
import { getMailTransporter, getSMTPCredentials } from "../email/send";

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Envia um email para recuperar a senha
 *     tags:
 *       - users
 *     description: Endpoint para enviar um email de recuperação de senha.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: returns the object according to the method provided.
 *       500:
 *         description: failed to load data.
 *
 */
export default async function handler(req: any, res: any) {
  const { email: to } = req.body;

  try {
    const isEmailValid =
      (await prisma.user.count({
        where: {
          email: to,
        },
      })) > 0;

    if (!isEmailValid) {
      return res.status(400).json({ message: "Email not found" });
    }

    const emailTemplate = await prisma.emailTemplate.findFirst({
      where: {
        keyword: "FORGOT_PASSWORD",
      },
    });

    if (!emailTemplate)
      return res.status(404).json({ message: "Template not found" });

    const token = uuidv4(); // Gerar token único

    // Armazenar token no banco de dados
    await prisma.passwordResetToken.create({
      data: {
        email: to,
        token,
        expires: new Date(Date.now() + 3600000), // 1 hora de validade
      },
    });

    const contents: EmailContent[] = [
      {
        emailTemplateId: emailTemplate.id,
        id: 1,
        heading: "Clique no botão abaixo para recuperar sua senha",
        paragraph:
          "Caso não tenha solicitado a recuperação de sua senha, por favor ignore este email.",
      },
    ];

    const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`; // Link com o token

    const emailBody = await renderAsync(
      EmailTemplate({
        ...emailTemplate,
        contents,
        links: [],
        buttonLink: resetLink,
        buttonText: "Recuperar senha",
      })
    );

    const credentials = await getSMTPCredentials();

    const transporter = getMailTransporter(credentials);

    const mailOptions = {
      from: credentials.SMTP_EMAIL,
      to,
      subject: "Recuperação de senha",
      html: emailBody,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: "Email sent successfully" });
    } catch (error: any) {
      return res.status(500).json({ error: "Failed to send email" });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
