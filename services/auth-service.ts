import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export async function authenticate(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ error: "Not authenticated" });
    return null;
  }
  return session;
}
