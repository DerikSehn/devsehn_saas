import prisma from "@/lib/prisma";
import { renderAsync } from "@react-email/render";
import { EmailTemplate } from "./EmailTemplate";

const nodemailer = require("nodemailer");

export default async function handler(req: any, res: any) {
  /*  if (checkIpAlreadySentEmail(req)) {
    return res.status(200).json({ message: "E-mail já enviado!" });
  } */
  const { to, subject, body } = req.body;

  const emailTemplate = await prisma.emailTemplate.findFirst({
    where: {
      keyword: body.template,
    },
    include: { links: true, content: true },
  });
  console.log(emailTemplate);

  const emailBody = await renderAsync(EmailTemplate(emailTemplate as any));

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    auth: {
      user: process.env.SMTMP_EMAIL,
      pass: process.env.SMTMP_EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTMP_EMAIL,
    to,
    subject,
    html: emailBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: "Failed to send email" });
  }
}
