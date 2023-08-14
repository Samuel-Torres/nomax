import React from "react";
import styles from "./form.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

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
    formState: { errors },
    watch,
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    const { email, password, passwordConfirmation } = data;
    const payload = { email, password, passwordConfirmation };

    if (password === passwordConfirmation) {
      axios.post("/api/auth/register", payload);
    }
  };

  const password = watch("password", "");
  const passwordConfirmation = watch("passwordConfirmation", "");

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
        {errors.passwordConfirmation && (
          <span className={styles.warning}>Passwords must match.</span>
        )}
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
      <button
        disabled={Object.keys(errors).length > 0}
        onClick={handleSubmit(onSubmit)}
        className={styles.authBtn}
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
