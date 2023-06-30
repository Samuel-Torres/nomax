import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// components:
import AuthProvider from "@/components/authProvider/authProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className} suppressHydrationWarning={true}>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
