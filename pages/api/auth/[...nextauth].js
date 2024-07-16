import NextAuth from "next-auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import Credentials from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export default NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            name: "Entrar no Painel",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "exemplo@email.com" },
                password: { label: "Senha", type: "password", placeholder: "********" },
            },
            async authorize(credentials) {
                try {

                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email },
                    });
                    if (user && bcrypt.compareSync(credentials.email.split("@")[0] + credentials.password, user?.password)) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            // Adicione outros campos necessários
                        };
                    } else {
                        return null;
                    }
                } catch (error) {
                    return null;
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    // Adicione outros campos necessários
                };
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});
