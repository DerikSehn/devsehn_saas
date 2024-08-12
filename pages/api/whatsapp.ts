import { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /api/whatsapp:
 *  get:
 *    summary: Get WhatsApp number
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                number:
 *                  type: string
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ number: process.env.WHATSAPP_NUMBER });
}
