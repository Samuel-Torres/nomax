"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./onBoardingForm.module.scss";

enum personaTypes {
  PASSPORTBRO,
  DIGITALNOMAD,
  EXPAT,
  TOURIST,
  BACKPACKER,
}

type FormValues = {
  password: string;
  confirmPassword: string;
  bio: string;
  persona: personaTypes;
  jobTitle: string;
  companyName: string;
  userName: string;
};

const OnBoardingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<FormValues>();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // const { email, password } = data;
  };

  return (
    <>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <h1>OnBoarding</h1>

          <label>Password</label>
          <input
            className={styles.input}
            type="password"
            {...register("password", {
              required: true,
              minLength: 8,
              validate: (value) => value.trim().length > 0,
            })}
          />
          {errors.password && (
            <span className={styles.warning}>
              Password is required, must be at least 8 characters long, and
              cannot contain white spaces.
            </span>
          )}

          <label>Confirm Password</label>
          <input
            className={styles.input}
            type="password"
            {...register("confirmPassword", {
              required: true,
              minLength: 8,
              validate: (value) =>
                value.trim().length > 0 && value === password,
            })}
          />
          {errors.confirmPassword && (
            <span className={styles.warning}>
              {errors.confirmPassword.type === "required"
                ? "Confirm Password is required and must be at least 8 characters long."
                : "Passwords do not match."}
            </span>
          )}

          {/* <label>Password</label>
          <input
            className={styles.input}
            type="password"
            {...register("password", {
              required: true,
              validate: (value) => value.trim().length > 0,
            })}
          />
          <label>Confirm Password</label>
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
          )} */}

          <label>Bio</label>
          <textarea
            className={styles.input}
            {...register("bio", {
              required: true,
              minLength: 25,
              maxLength: 500,
              validate: (value) => value.trim().length > 0,
            })}
          />
          {errors.bio && (
            <span className={styles.warning}>
              Bio is required and must be between 25 and 500 characters.
            </span>
          )}

          <label>Persona</label>
          <select
            className={styles.input}
            {...register("persona", { required: true })}
          >
            <option value={personaTypes.PASSPORTBRO}>PassportBro</option>
            <option value={personaTypes.DIGITALNOMAD}>DigitalNomad</option>
            <option value={personaTypes.EXPAT}>Expat</option>
            <option value={personaTypes.TOURIST}>Tourist</option>
            <option value={personaTypes.BACKPACKER}>Backpacker</option>
          </select>
          {errors.persona && (
            <span className={styles.warning}>Please select a persona.</span>
          )}

          <label>Job Title</label>
          <input
            className={styles.input}
            type="text"
            {...register("jobTitle", {
              required: true,
              minLength: 3,
              validate: (value) => value.trim().length > 0,
            })}
          />
          {errors.jobTitle && (
            <span className={styles.warning}>
              Job Title is required and must be at least 3 characters long.
            </span>
          )}

          <label>Company Name</label>
          <input
            className={styles.input}
            type="text"
            {...register("companyName", {
              required: true,
              validate: (value) => value.trim().length > 0,
            })}
          />
          {errors.companyName && (
            <span className={styles.warning}>Company Name is required.</span>
          )}

          <label>User Name</label>
          <input
            className={styles.input}
            type="text"
            {...register("userName", {
              required: true,
              minLength: 8,
              validate: (value) => value.trim().length > 0,
            })}
          />
          {errors.userName && (
            <span className={styles.warning}>
              User Name is required and must be at least 8 characters long.
            </span>
          )}
        </div>
        <button
          disabled={Object.keys(errors).length > 0}
          onClick={handleSubmit(onSubmit)}
          className={styles.authBtn}
        >
          Login
        </button>
      </form>
    </>
  );
};

export default OnBoardingForm;
