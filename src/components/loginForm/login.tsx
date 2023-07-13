"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import styles from "./login.module.scss";
import Image from "next/image";

type LoginFormProps = {
  loginError: string;
};

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = ({ loginError }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    const { email, password } = data;
    signIn("credentials", { email, password });
  };

  return (
    <>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
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
            <span className={styles.warning}>
              Email is required and must be valid.
            </span>
          )}
          <label>Password</label>
          <input
            className={styles.input}
            type="password"
            {...register("password", {
              required: true,
              validate: (value) => value.trim().length > 0,
            })}
          />
          {errors.password && (
            <span className={styles.warning}>
              Password is required, must be at least 8 characters long, and
              cannot contain white spaces.
            </span>
          )}
        </div>
        {loginError?.length !== 0 ? (
          <p className={styles.error}>{loginError}</p>
        ) : null}
        <button
          disabled={Object.keys(errors).length > 0}
          onClick={handleSubmit(onSubmit)}
          className={styles.authBtn}
        >
          Login
        </button>
        <button className={styles.authBtn} onClick={() => signIn("google")}>
          <Image
            className={styles.icon}
            src="https://res.cloudinary.com/dvz91qyth/image/upload/v1689262639/Nomex/auth%20page%20assets/search_ypellv.png"
            width={30}
            height={30}
            alt="google"
          />
          Login with Google
        </button>
      </form>
    </>
  );
};

export default LoginForm;
