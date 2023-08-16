import React from "react";
import styles from "./form.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Users } from "@prisma/client";

type LoginFormProps = {
  error: string;
  signIn: Function;
  toggleMode: () => void;
};

type LoginFormValues = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const Register = ({ error, signIn, toggleMode }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    watch,
    setError,
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "", passwordConfirmation: "" },
  });

  const conditionalErrorMsg: [string] = [
    "A user with that email already exists. Please try logging in or using a different email address.",
  ];

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const { email, password, passwordConfirmation } = data;
    const payload = { email, password, passwordConfirmation };

    try {
      const registrationResponse = await axios.post(
        "/api/auth/register",
        payload
      );
      const newRegisteredUser: Users = registrationResponse.data.user;
      if (newRegisteredUser && registrationResponse.data.status === 200) {
        try {
          await signIn("credentials", { email, password });
        } catch (loginError) {
          // console.error("Login Error: ", loginError);
          // Handle login error if needed
        }
      }
    } catch (registrationError: any) {
      if (
        registrationError.response.data.error.includes(
          "Unique constraint failed on the fields: (`email`)"
        )
      ) {
        setError("email", {
          type: "manual",
          message: conditionalErrorMsg[0],
        });
      }
    }
  };

  const areFormRequirementsMet = () => {
    if (
      dirtyFields.email === true &&
      dirtyFields.password === true &&
      dirtyFields.passwordConfirmation === true &&
      Object.keys(errors).length === 0 &&
      errors.email?.message !== conditionalErrorMsg[0] &&
      !errors.email &&
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[@#$%^&*!]/.test(password) &&
      password === passwordConfirmation &&
      /[A-Z]/.test(passwordConfirmation) &&
      /[@#$%^&*!]/.test(passwordConfirmation) &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return true;
    }
    return false;
  };

  const password = watch("password", "");
  const passwordConfirmation = watch("passwordConfirmation", "");
  const email = watch("email", "");

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputContainer}>
        <h1>Register</h1>
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
        {errors.email?.message === conditionalErrorMsg[0] ? (
          <span className={styles.warning}>{errors.email?.message}</span>
        ) : null}
        {errors.email && errors.email?.message !== conditionalErrorMsg[0] ? (
          <span className={styles.warning}>
            Email is required and must be valid. Should contain "@" to be
            considered valid with no whitespaces.
          </span>
        ) : null}
        <label>Password</label>
        <input
          className={styles.input}
          type="password"
          {...register("password", {
            required: true,
            minLength: 8,
            pattern: /(?=.*[A-Z])(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]+/,
          })}
        />
        <div className={styles.requirements}>
          <p className={password.length >= 8 ? styles.valid : styles.invalid}>
            • At least 8 characters in length.
          </p>
          <p className={/[A-Z]/.test(password) ? styles.valid : styles.invalid}>
            • Must contain at least 1 capitalized character.
          </p>
          <p
            className={
              /[@#$%^&*!]/.test(password) ? styles.valid : styles.invalid
            }
          >
            • Must contain at least 1 special character.
          </p>
        </div>
        <label>Confirm Password</label>
        <input
          className={styles.input}
          type="password"
          {...register("passwordConfirmation", {
            required: true,
            validate: (value) => value === watch("password"),
          })}
        />
        <div className={styles.requirements}>
          <p
            className={
              passwordConfirmation.length >= 8 ? styles.valid : styles.invalid
            }
          >
            • At least 8 characters in length.
          </p>
          <p
            className={
              /[A-Z]/.test(passwordConfirmation) ? styles.valid : styles.invalid
            }
          >
            • Must contain at least 1 capitalized character.
          </p>
          <p
            className={
              /[@#$%^&*!]/.test(passwordConfirmation)
                ? styles.valid
                : styles.invalid
            }
          >
            • Must contain at least 1 special character.
          </p>
        </div>
      </div>
      {error?.length !== 0 ? <p className={styles.error}>{error}</p> : null}
      <button
        onClick={handleSubmit(onSubmit)}
        disabled={areFormRequirementsMet() ? false : true}
        className={areFormRequirementsMet() ? styles.enabled : styles.disabled}
      >
        Login
      </button>
      <p className={styles.toggle} onClick={toggleMode}>
        Already have an account? Click Here to Login.
      </p>
    </form>
  );
};

export default Register;
