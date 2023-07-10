import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { validatePassword } from "../../middleware/validatePassword";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface Auth {
  clientId: string;
  clientSecret: string;
}

interface GoogleOathUserObject {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  locale: string;
  iat: number;
  exp: number;
}

const handler = NextAuth({
  providers: [
    // Google Authentication Validaton:
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as Auth["clientId"],
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as Auth["clientSecret"],
      // @ts-ignore
      async profile(profile: GoogleOathUserObject) {
        try {
          const user = await prisma.users.findUnique({
            where: {
              email: profile.email,
            },
          });
          console.log("USER FOUND: ", user);
          if (!user) {
            const createdUser = await prisma.users.create({
              data: {
                email: profile.email,
              },
            });
            return createdUser;
          }
          return user;
        } catch (error) {
          return { error: error, status: 500 };
        }
      },
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
          const email = credentials?.email ?? "";
          const user = await prisma.users.findUnique({
            where: {
              email: email,
            },
          });
          // if user is found credentials were passed into the form & password on db & form match
          // return user object
          if (
            user &&
            credentials &&
            (await validatePassword(
              credentials?.password,
              user?.password ?? ""
            ))
          ) {
            return NextResponse.json({ user: user, status: 200 });
          } else {
            return NextResponse.json({
              error:
                "An Error occurred please check the information you've provided and try again. Thank you!",
            });
          }
        } catch (error: unknown) {
          return NextResponse.json({ error: "Error: " + error, status: 500 });
        }
      },
    }),
  ],
  pages: {
    error: "/auth/login",
  },
});

export { handler as GET, handler as POST };
