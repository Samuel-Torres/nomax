import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styles from "../postCard.module.scss";
import axios from "axios";
import { fetchError } from "@/app/lib/exceptions";

type editPostProps = {
  postId: number;
  postBeforeEdit: string | null;
  setError: Function;
  setIsError: Function;
};

type EditPostValues = {
  post: string | null;
};

const EditPostField = ({
  postId,
  postBeforeEdit,
  setError,
  setIsError,
}: editPostProps) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<EditPostValues>({
    defaultValues: { post: postBeforeEdit },
  });

  const onSubmit: SubmitHandler<EditPostValues> = (data) => {
    console.log("PAYLOAD: ", { id: postId, postBody: data.post });
    axios
      .put("/api/posts", {
        id: postId,
        postBody: data.post,
      })
      .then((response: any) => {
        if (response.status === 200) {
          console.log("RESPONSE: ", response);
          window.location.reload();
        } else {
          setError(new fetchError());
          setIsError(true);
        }
      })
      .catch((err: any) => {
        console.log("ERROR: ", err.response.status);
        if (
          err.response.status === 404 ||
          err.response.status === 500 ||
          err.status === 400 ||
          err.status === 500
        ) {
          setError(new fetchError());
          setIsError(true);
        }
      });
  };

  return (
    <form className={styles.editContainer}>
      <label>Edit Your Post</label>
      <Controller
        name="post"
        control={control}
        rules={{
          required: true,
          minLength: 25,
          maxLength: 1500,
          validate: (value) => (value ? value.trim().length > 0 : false),
        }}
        render={({ field }) => (
          <>
            <textarea
              {...field}
              className={styles.input}
              onChange={(e) => {
                field.onChange(e);
              }}
              onBlur={() => {
                field.onBlur();
              }}
              value={field.value || ""}
            />
            <div
              style={{
                color:
                  field.value &&
                  typeof field.value === "string" &&
                  field.value.length >= 25 &&
                  field.value.length <= 1500
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
      {errors.post && (
        <span className={styles.warning}>
          Bio is required and must be between 25 and 1500 characters.
        </span>
      )}

      <button
        disabled={Object.keys(errors).length > 0}
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </button>
    </form>
  );
};

export default EditPostField;
