"use client";
import styles from "./page.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

// components:
import LoginForm from "@/components/loginForm/login";

export default function LoginPage() {
  const session = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const loginError: string = searchParams.get("error") || "";

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }
  console.log("LOGIN SESH DATA: ", session);
  if (session.status === "unauthenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.divImage}>
          <div>
            <LoginForm loginError={loginError} />
          </div>
        </div>
      </div>
    );
  }
}
