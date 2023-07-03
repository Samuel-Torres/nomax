"use client";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// components:
import LoginForm from "@/components/loginForm/login";

// error handling for password doesn't work properly allows for white spaces
// doesn't handle errors for user not found or improper credentials
export default function LoginPage() {
  const session = useSession();
  const router = useRouter();

  // Use React Suspense here:
  if (session.status === "loading") {
    return (
      <div className={styles.container}>
        <div className={styles.divImage}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  if (session.status === "unauthenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.divImage}>
          <div>
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }
}
