"use client";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import styles from "./page.module.scss";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const session = useSession();
  const router = useRouter();
  console.log("SESSION: ", session);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log("LOGIN FORM DATA: ", data);
    try {
      const { email, password } = data;
      signIn("credentials", { email, password });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

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
            <form
              className={styles.formContainer}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={styles.inputContainer}>
                <h1>LOGIN</h1>
                <label>Email</label>
                <input
                  className={styles.input}
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    minLength: 1,
                  })}
                />
                {errors.email && (
                  <span>Email is required and must be valid.</span>
                )}
                <label>Password</label>
                <input
                  className={styles.input}
                  type="password"
                  {...register("password", {
                    required: true,
                    // minLength: 8,
                    validate: (value) => value.trim().length > 0,
                  })}
                />
                {errors.password && (
                  <span>
                    Password is required, must be at least 8 characters long,
                    and cannot contain white spaces.
                  </span>
                )}
              </div>

              <button
                // disabled={Object.keys(errors).length > 0}
                // onClick={handleSubmit(onSubmit)}
                className={styles.authBtn}
              >
                Login
              </button>
              <button
                className={styles.authBtn}
                // onClick={() => console.log("RAN")}
                onClick={() => signIn("google")}
              >
                Login with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
