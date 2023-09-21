import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styles from "../postCard.module.scss";
import axios from "axios";
import { fetchError } from "@/app/lib/exceptions";
import { KeyedMutator } from "swr";
import { useSWRConfig } from "swr";
import { unstable_serialize } from "swr/infinite";
import { getKey } from "@/app/globalState/posts";

type editPostProps = {
  postId: number;
  postBeforeEdit: string | null;
  setError: Function;
  setIsError: Function;
  isEditing: {
    isEditing: boolean;
    type: string;
    originalComment: string;
    commentId: number | null;
  };
  loggedInUserId: number;
  commentMutate: KeyedMutator<any>;
  toggleEditingState: (
    type: string,
    originalComment: string,
    commentId: number | null
  ) => void;
};

type EditPostValues = {
  post: string | null;
};

const EditPostField = ({
  postId,
  postBeforeEdit,
  setError,
  setIsError,
  isEditing,
  loggedInUserId,
  commentMutate,
  toggleEditingState,
}: editPostProps) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<EditPostValues>({
    defaultValues:
      isEditing.type === "post"
        ? { post: postBeforeEdit }
        : { post: isEditing.originalComment },
  });
  const { mutate } = useSWRConfig();

  const onSubmit: SubmitHandler<EditPostValues> = (data, event) => {
    event?.preventDefault();
    if (isEditing.type === "post") {
      axios
        .put("/api/posts", {
          id: postId,
          postBody: data.post,
        })
        .then((response: any) => {
          if (response.status === 200) {
            mutate(unstable_serialize(getKey));
            toggleEditingState("", "", null);
          }
        })
        .catch((err: any) => {
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
    }
    if (isEditing.type === "comment") {
      console.log(isEditing.commentId);
      axios
        .put(`/api/comments/${isEditing.commentId}`, {
          postBody: data.post,
        })
        .then((response: any) => {
          if (response.status === 200) {
            commentMutate(`/api/comments/${isEditing.commentId}`);
            toggleEditingState("", "", null);
          }
        })
        .catch((err: any) => {
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
    }
    if (isEditing.type === "addComment") {
      axios
        .post("/api/comments/", {
          postBody: data.post,
          loggedInUserId: loggedInUserId,
          postId: postId,
        })
        .then((response: any) => {
          console.log("RES: ", response);
          if (response.status === 200) {
            commentMutate(`/api/comments/${isEditing.commentId}`);
            toggleEditingState("", "", null);
          }
        })
        .catch((err: any) => {
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
    }
  };

  return (
    <form className={styles.editContainer}>
      {isEditing.type === "post" && <label>Edit Your Post</label>}
      {isEditing.type === "comment" && <label>Edit Your Comment</label>}
      {isEditing.type === "addComment" && <label>Leave A Comment</label>}
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
