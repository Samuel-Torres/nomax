"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

// components:
import AuthForm from "@/components/authForm/authForm";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const session = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const loginError: string = searchParams.get("error") || "";

  const toggleDemoCard = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      router?.push("/dashboard");
    }
  }, [session.status, router]);

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
          <button className={styles.demoBtn} onClick={toggleDemoCard}>
            {isVisible ? "Hide" : "View"} Demo Credentials
          </button>
          {isVisible ? (
            <div className={styles.testContainer}>
              <h3>Demo Account</h3>
              <p>Email: fourth@gmail.com</p>
              <p>Password: 12345678</p>
            </div>
          ) : null}
          <AuthForm error={loginError} />
        </div>
      </div>
    );
  }
}
