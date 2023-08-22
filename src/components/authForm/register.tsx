import React from "react";
import styles from "./form.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Users } from "@prisma/client";

// components:
import Loading from "@/app/dashboard/loading";

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
  const conditionalErrorMsg: [string] = [
    "A user with that email already exists. Please try logging in or using a different email address.",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitting },
    watch,
    setError,
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "", passwordConfirmation: "" },
  });

  const password = watch("password", "");
  const passwordConfirmation = watch("passwordConfirmation", "");
  const email = watch("email", "");

  const areFormRequirementsMet = () => {
    if (
      dirtyFields.email === true && // user updated email field
      dirtyFields.password === true && // user updated password field
      dirtyFields.passwordConfirmation === true && // user updated passwordConfirmation field
      errors.email?.message !== conditionalErrorMsg[0] && // user with email address doesn't already exist
      Object.keys(errors).length === 0 && // There are no other errors
      !errors.email && // no additional email errors
      password.length >= 8 && // password length greater or equal to 8
      /[A-Z]/.test(password) && // password contains one capital letter
      /[@#$%^&*!]/.test(password) && // password containes one special character
      password === passwordConfirmation && // password and passwordConfirmation both match
      /[A-Z]/.test(passwordConfirmation) && // passwordConfirmation contains one capital letter
      /[@#$%^&*!]/.test(passwordConfirmation) && // passwordConfirmation contains one special character
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) // email contains proper format including "@" symbol
    ) {
      return true;
    }
    return false;
  };

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

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form}>
        <div className={styles.inputContainer}>
          <h1 data-test="formHeading">Register</h1>

          {/* Email Input */}
          <label data-test="regEmailLabel">Email</label>
          <input
            className={styles.input}
            type="email"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              minLength: 1,
            })}
            data-test="registerEmail"
          />
          {errors.email?.message === conditionalErrorMsg[0] ? (
            <span className={styles.warning}>{errors.email?.message}</span>
          ) : null}
          {errors.email && errors.email?.message !== conditionalErrorMsg[0] ? (
            <span className={styles.warning}>
              Email is required and must be valid. Should contain &quot@&quot to
              be considered valid with no whitespaces.
            </span>
          ) : null}

          {/* Password Input */}
          <label data-test="regPasswordLabel">Password</label>
          <input
            className={styles.input}
            type="password"
            {...register("password", {
              required: true,
              minLength: 8,
              pattern: /(?=.*[A-Z])(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]+/,
            })}
            data-test="registerPassword"
          />
          <div className={styles.requirements}>
            <p
              className={password.length >= 8 ? styles.pass : styles.fail}
              data-test="passwordValidation"
            >
              • At least 8 characters in length.
            </p>
            <p
              className={/[A-Z]/.test(password) ? styles.pass : styles.fail}
              data-test="passwordValidation"
            >
              • Must contain at least 1 capitalized character.
            </p>
            <p
              className={
                /[@#$%^&*!]/.test(password) ? styles.pass : styles.fail
              }
              data-test="passwordValidation"
            >
              • Must contain at least 1 special character.
            </p>
          </div>

          {/* Password Confirmation Input */}
          <label data-test="regPasswordConfirmationLabel">
            Confirm Password
          </label>
          <input
            className={styles.input}
            type="password"
            {...register("passwordConfirmation", {
              required: true,
              validate: (value) => value === watch("password"),
            })}
            data-test="registerPasswordConfirmation"
          />
          <div className={styles.requirements}>
            <p
              className={
                passwordConfirmation.length >= 8 ? styles.pass : styles.fail
              }
              data-test="passwordConfirmationValidation"
            >
              • At least 8 characters in length.
            </p>
            <p
              className={
                /[A-Z]/.test(passwordConfirmation) ? styles.pass : styles.fail
              }
              data-test="passwordConfirmationValidation"
            >
              • Must contain at least 1 capitalized character.
            </p>
            <p
              className={
                /[@#$%^&*!]/.test(passwordConfirmation)
                  ? styles.pass
                  : styles.fail
              }
              data-test="passwordConfirmationValidation"
            >
              • Must contain at least 1 special character.
            </p>
          </div>
        </div>
        {error?.length !== 0 ? <p className={styles.error}>{error}</p> : null}

        {/* Submit Button */}
        <div className={styles.centered}>
          {isSubmitting ? (
            <Loading />
          ) : (
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={areFormRequirementsMet() ? false : true}
              className={
                areFormRequirementsMet() ? styles.enabled : styles.disabled
              }
              data-test="registerFormSubmit"
            >
              Submit
            </button>
          )}
        </div>

        {/* Form Login/Registration Toggle  */}
        <p
          className={styles.toggle}
          onClick={toggleMode}
          data-test="authFormToggle"
        >
          Already have an account? Click Here to Login.
        </p>
      </div>
    </form>
  );
};

export default Register;
