import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

interface Auth {
  clientId: string;
  clientSecret: string;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as Auth["clientId"],
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as Auth["clientSecret"],
    }),
    // Credentials({
    //     id: "credentials",
    //     name: "Credentials",
    //     async authorize(credentials) {

    //     }
    // })
  ],
});

export { handler as GET, handler as POST };
