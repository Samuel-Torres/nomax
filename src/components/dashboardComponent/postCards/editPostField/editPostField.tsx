import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styles from "../postCard.module.scss";
import axios from "axios";

type editPostProps = {
  postId: number;
  postBeforeEdit: string | null;
  toggleEditingState: Function;
};

type EditPostValues = {
  post: string;
};

const EditPostField = ({ postId, postBeforeEdit }: editPostProps) => {
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
    // const payload = { id: postId, postBody: data.post };
    console.log("PAYLOAD: ", { id: postId, postBody: data.post });
    axios
      .put("http://localhost:3000/api/posts", {
        id: postId,
        postBody: data.post,
      })
      .then((response: any) => {
        console.log("CLIENT RES: ", response);
      })
      .catch((err: any) => console.log("CLIENT ERR: ", err));
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
          validate: (value) => value.trim().length > 0,
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
