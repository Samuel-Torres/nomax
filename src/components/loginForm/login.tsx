"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import styles from "./login.module.scss";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
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

  return (
    <>
      |
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
          {errors.email && <span>Email is required and must be valid.</span>}
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
              Password is required, must be at least 8 characters long, and
              cannot contain white spaces.
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
    </>
  );
};

export default LoginForm;
