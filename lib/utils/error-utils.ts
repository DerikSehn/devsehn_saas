import { NextApiResponse } from "next";

export function handleError(
  res: NextApiResponse,
  error: any,
  message: string
): void {
  console.error(message, error);
  res.status(500).json({ error: message });
}
