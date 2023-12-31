"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { personaTypes } from "@prisma/client";
import axios from "axios";
import styles from "./onBoardingForm.module.scss";
import { useSession } from "next-auth/react";
import { useLoggedInUser } from "@/app/globalState/user";
import { toast } from "react-toastify";

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
  const session = useSession();
  const data = useLoggedInUser();

  const updateUserSuccessResponses = [
    "🔄 User information successfully updated.",
    "👍 User profile updated successfully.",
    "✨ User details have been modified.",
    "🌟 User information successfully changed.",
    "🎉 User profile updated!",
    "👌 Successfully updated user information.",
    "👋 Updated user details.",
    "💼 User profile successfully modified.",
    "🚀 User information has been updated.",
    "👏 User details have been successfully changed.",
  ];

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const password = watch("password");

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { password, bio, persona, companyName, userName, jobTitle } = data;
    axios
      .put(`/api/users/${session.data?.user?.email}`, {
        password,
        bio,
        persona,
        companyName,
        userName,
        jobTitle,
      })
      .then((res) => {
        toast.success(
          updateUserSuccessResponses[
            Math.floor(Math.random() * updateUserSuccessResponses.length)
          ],
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        window.location.reload();
      })
      .catch((err) => {
        toast.error(
          err.response.data.message
            ? `😢 ${err.response.data.message}`
            : "😢 An issue occurred on our end please check back later ",
          {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      });
  };

  return (
    <>
      <div className={styles.overlay} data-test="onBoardingForm">
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.scrollingContainer}>
            <h1>Onboarding</h1>

            <div className={styles.inputContainer}>
              {!data?.user?.password ? (
                <div>
                  <label>Password</label>
                  <input
                    className={styles.input}
                    type="password"
                    placeholder="create a new password"
                    {...register("password", {
                      required: true,
                      minLength: 8,
                      validate: (value) => value.trim().length > 0,
                    })}
                  />

                  {errors.password && (
                    <span className={styles.warning}>
                      Password is required, must be at least 8 characters long,
                      and cannot contain white spaces.
                    </span>
                  )}

                  <label>Confirm Password</label>
                  <input
                    className={styles.input}
                    type="password"
                    placeholder="verify new password"
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
                </div>
              ) : null}

              <div className={styles.inputContainer}>
                <label>Persona</label>
                <select
                  className={styles.input}
                  {...register("persona", { required: true })}
                >
                  {Object.values(personaTypes).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.persona && (
                  <span className={styles.warning}>
                    Please select a persona.
                  </span>
                )}
              </div>

              <label>Job Title</label>
              <input
                className={styles.input}
                type="text"
                placeholder={`${data?.user?.jobTitle}`}
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
                placeholder={`${data?.user?.companyName}`}
                {...register("companyName", {
                  required: true,
                  validate: (value) => value.trim().length > 0,
                })}
              />
              {errors.companyName && (
                <span className={styles.warning}>
                  Company Name is required.
                </span>
              )}

              <label>User Name</label>
              <input
                className={styles.input}
                type="text"
                placeholder={`${data?.user?.userName}`}
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

            <label>Bio</label>
            <Controller
              name="bio"
              control={control}
              defaultValue={data?.user?.bio !== null ? data?.user?.bio : ""}
              rules={{
                required: true,
                minLength: 25,
                maxLength: 500,
                validate: (value) => value.trim().length > 0,
              }}
              render={({ field }) => (
                <>
                  <textarea
                    {...field}
                    className={styles.input}
                    placeholder={`Your current bio: \n \n ${data?.user?.bio}... \n \n keep in mind your bio must be between 25 & 500 characters long.`}
                    onChange={(e) => {
                      field.onChange(e); // Update the form state when textarea value changes
                    }}
                    onBlur={() => {
                      field.onBlur(); // Trigger validation when textarea loses focus
                    }}
                  />
                  {/* Display the character count and style it based on the validation */}
                  <div
                    style={{
                      color:
                        field.value &&
                        typeof field.value === "string" &&
                        field.value.length >= 25 &&
                        field.value.length <= 500
                          ? "green"
                          : "red",
                    }}
                  >
                    <p className={styles.counter}>
                      {field.value ? field.value.length : 0} / 500
                    </p>
                  </div>
                </>
              )}
            />
            {errors.bio && (
              <span className={styles.warning}>
                Bio is required and must be between 25 and 500 characters.
              </span>
            )}

            <button
              disabled={Object.keys(errors).length > 0}
              onClick={handleSubmit(onSubmit)}
              className={styles.btn}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default OnBoardingForm;
