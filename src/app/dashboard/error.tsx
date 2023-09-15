"use client";
import styles from "./errors.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  const routeToAuthPage = () => {
    router.push("/auth");
  };

  return (
    <div className={styles.container}>
      <Image
        src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693680614/Nomex/dashboard/error_clodv1.png"
        width={150}
        height={150}
        alt="error"
      />
      <h1>{error.name}: </h1>
      <p>{error.message || "Something Went Wrong"}</p>
      <p>
        We&#39;re sorry these things happen. We will work to fix the issue soon!
      </p>
      <button className={styles.btn} type="button" onClick={reset}>
        Try Again
      </button>
      {error.name === "Auth Required Error" && (
        <button className={styles.btn} type="button" onClick={routeToAuthPage}>
          Sign In
        </button>
      )}
    </div>
  );
}
