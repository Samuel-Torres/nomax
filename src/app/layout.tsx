import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nomax",
  description: "Creating Communities Abroad!",
};

// components:
import AuthProvider from "@/components/authProvider/authProvider";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <Head>
          <meta
            name="google-site-verification"
            content="6fQgtRcf3sJrlFK4DEFPxO1cHQBhG3nIncYZtiyJD9A"
          />
        </Head>
        <body className={inter.className} suppressHydrationWarning={true}>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
