"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface ChildProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: ChildProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
