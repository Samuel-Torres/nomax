import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { validatePassword } from "../../middleware/validatePassword";
import prisma from "@/prisma/client/client";
import { Users } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";

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
  // adapter: PrismaAdapter(prisma) as Adapter,
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
          throw new Error(
            `${error}, An error occurred while trying to login you in. Please, check your credentials and try again!`
          );
        }
      },
    }),
    // Username & Password Validation:
    Credentials({
      id: "credentials",
      name: "Credentials",
      // @ts-ignore
      async authorize(credentials) {
        // check if user exists on database:
        try {
          const email = credentials?.email;
          const user = await prisma.users.findFirst({
            where: {
              email: email,
            },
          });
          const requestPassword: string = credentials?.password || "";
          const storedPassword: string = user?.password || "";
          // if user is found credentials were passed into the form & password on db & form match
          // return user object
          if (
            user &&
            credentials &&
            (await validatePassword(requestPassword, storedPassword))
          ) {
            return user;
          }
          throw new Error(
            "An error occurred while trying to login you in. Please, check your credentials and try again!"
          );
        } catch (error: unknown) {
          throw new Error(`${error}`);
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      const authorizedUser = user as unknown as Users;
      if (user) {
        return {
          ...token,
          id: authorizedUser.id,
        };
      }
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
  pages: {
    error: "/auth",
  },
});

export { handler as GET, handler as POST };
