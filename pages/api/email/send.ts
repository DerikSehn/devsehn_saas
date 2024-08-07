import prisma from "@/lib/prisma";
import { renderAsync } from "@react-email/render";
import { EmailTemplate } from "./EmailTemplate";
import nodemailer from "nodemailer";
import CryptoJS from "crypto-js";
import "dotenv/config";

const dotenv = require("dotenv");
dotenv.config();

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
 *                 properties:
 *                   template:
 *                     type: string
 *                 required:
 *                   - template
 *     responses:
 *       200:
 *         description: returns the object according to the method provided.
 *       500:
 *         description: failed to load data.
 *
 */
export default async function handler(req: any, res: any) {
  const { to, subject, body } = req.body;

  try {
    const credentials = await getSMTPCredentials();

    if (!credentials) {
      return res.status(500).json({
        message:
          "SMTP credentials not found, please review your configuration section",
      });
    }

    return res.status(200).json({ message: JSON.stringify(credentials) });

    const emailTemplate = await prisma.emailTemplate.findFirst({
      where: {
        keyword: body.template,
      },
      include: { links: true, contents: true },
    });

    if (!emailTemplate) {
      return res.status(404).json({ message: "Email template not found" });
    }

    const emailBody = await renderAsync(EmailTemplate(emailTemplate as any));

    const transporter = getMailTransporter(credentials);

    const mailOptions = {
      from: credentials.SMTP_EMAIL,
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

    if (!createdEmail) {
      return res.status(500).json({ message: "Failed to create email record" });
    }

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error: any) {
    if (error.response) {
      // Handle nodemailer errors
      return res
        .status(500)
        .json({ message: "Email sending error", error: error.response });
    } else {
      // Handle other errors
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}

export function getMailTransporter(credentials: any = null) {
  if (!credentials) {
    throw new Error(
      "SMTP credentials not found, please review your configuration section"
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    auth: {
      type: "login",
      user: credentials.SMTP_EMAIL,
      pass: credentials.SMTP_EMAIL_PASS,
    },
  });

  return transporter;
}

export async function getSMTPCredentials() {
  const res = await prisma.setting.findMany({
    where: {
      title: {
        in: ["SMTP_EMAIL", "SMTP_EMAIL_PASS", "PRIVATE_KEY_PASSPHRASE"],
      },
    },
  });

  let credentials = Object.fromEntries(
    res.map((item: any) => [item.title, item.value])
  );

  if (!!credentials?.SMTP_EMAIL_PASS) {
    credentials.SMTP_EMAIL_PASS = decryptPassword(
      credentials.SMTP_EMAIL_PASS,
      credentials.PRIVATE_KEY_PASSPHRASE
    );
  }

  return credentials;
}

const decryptPassword = (password: string, key?: string) => {
  const decrypted = CryptoJS.AES.decrypt(
    password,
    key || process.env.PRIVATE_KEY_PASSPHRASE || ""
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
};
