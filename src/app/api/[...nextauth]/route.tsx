import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"

interface Auth {
    clientId: string;
    clientSecret: string;
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as Auth["clientId"],
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as Auth["clientSecret"],
      }),
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)