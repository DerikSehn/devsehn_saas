import prisma from "@/lib/prisma";
import { renderAsync } from "@react-email/render";
import { EmailTemplate } from "./EmailTemplate";

const nodemailer = require("nodemailer");

/**
 * @swagger
 * /api/email/send:
 *   post:
 *     summary: Envia um email
 *     tags:
 *       - email
 *     description: Endpoint para enviar um email.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *               subject:
 *                 type: string
 *               body:
 *                 type: object
 *     responses:
 *       200:
 *         description: returns the object according to the method provided.
 *       500:
 *         description: failed to load data.
 *
 */
export default async function handler(req: any, res: any) {
  /*  if (checkIpAlreadySentEmail(req)) {
    return res.status(200).json({ message: "E-mail já enviado!" });
  } */
  return res.status(200).json({ message: process.env.SMTP_EMAIL_PASS });

  const { to, subject, body } = req.body;
  console.log(body);
  console.log(body.template);
  const emailTemplate = await prisma.emailTemplate.findFirst({
    where: {
      keyword: body.template,
    },
    include: { links: true, contents: true },
  });
  try {
    const emailBody = await renderAsync(EmailTemplate(emailTemplate as any));

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to,
      subject,
      html: emailBody,
    };

    const createdEmail = await prisma.receivedEmail.create({
      data: {
        email: to,
        name: "Solicitação de Contato",
        message:
          "Este e-mail foi enviado por um cliente solicitando contato. Envie uma mensagem!",
      },
    });
    if (createdEmail) {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: "Email sent successfully" });
    } else {
      return res.status(500).json({ message: "Failed to send email" });
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
