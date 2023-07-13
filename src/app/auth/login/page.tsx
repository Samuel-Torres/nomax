"use client";
import styles from "./page.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

// components:
import LoginForm from "@/components/loginForm/login";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const session = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const loginError: string = searchParams.get("error") || "";

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  if (session.status === "unauthenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.divImage}>
          <Link className={styles.backBtn} href="/">
            <Image
              src="https://res.cloudinary.com/dvz91qyth/image/upload/v1689266282/Nomex/auth%20page%20assets/go-back-arrow_uli0gm.png"
              width={50}
              height={50}
              alt="back button"
            />
          </Link>
          <LoginForm loginError={loginError} />
        </div>
      </div>
    );
  }
}
