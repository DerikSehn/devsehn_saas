export default async function handler(res) {
  console.log(process.env.WHATSAPP_NUMBER);
  return res.status(200).json({ number: process.env.WHATSAPP_NUMBER });
}
