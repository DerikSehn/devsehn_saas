import { getServerSession } from "next-auth/next"
import NextAuth from "./[...nextauth]"

export default async (req, res) => {
    const session = await getServerSession(req, res, NextAuth)
    if (session) {
        // Signed in
    } else {
        // Not Signed in
        res.status(401)
    }
    res.end()
}