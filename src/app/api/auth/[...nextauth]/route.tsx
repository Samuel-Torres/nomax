import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { validatePassword } from "../../middleware/validatePassword";

const prisma = new PrismaClient();

interface Auth {
  clientId: string;
  clientSecret: string;
}

const handler = NextAuth({
  providers: [
    // Google Authentication Validaton:
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as Auth["clientId"],
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as Auth["clientSecret"],
    }),
    // Username & Password Validation:
    // @ts-ignore
    Credentials({
      id: "credentials",
      name: "Credentials",
      // @ts-ignore
      async authorize(credentials) {
        // check if user exists on database:
        try {
          const user = await prisma.users.findUnique({
            where: {
              email: credentials?.email,
            },
          });
          // if user is found credentials were passed into the form & password on db & form match
          // return user object
          if (
            user &&
            credentials &&
            (await validatePassword(credentials?.password, user.password))
          ) {
            return user;
          } else {
            throw new Error(
              "An Error occurred please check the information you've provided and try again. Thank you!"
            );
          }
        } catch (error: unknown) {
          throw "Error: " + error;
        }
      },
    }),
  ],
  pages: {
    error: "/auth/login",
  },
});

export { handler as GET, handler as POST };
