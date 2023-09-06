import { useRef } from "react";
import styles from "./createPost.module.scss";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";

type createPostProps = {
  isCreatingPost: boolean;
  toggleForm: () => void;
};

const CreatePost = ({ isCreatingPost, toggleForm }: createPostProps) => {
  const { handleSubmit, control, setValue, getValues } = useForm();
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Declare the ref type explicitly
  const onSubmit = (data: any) => {
    console.log(data);
  };

  // className={`${styles.transitionContainer} ${
  //   isCreatingPost ? styles.expanded : ""
  // }`}

  return (
    <form
      className={`${styles.container} ${isCreatingPost ? styles.expanded : ""}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Controller
          name="image"
          control={control}
          defaultValue=""
          render={({ field }) =>
            isCreatingPost ? (
              <div className={styles.uploadContainer}>
                <div className={styles.exit}>
                  <Image
                    className={styles.deleteIcon}
                    src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693421983/Nomex/dashboard/delete_lzxfe3.png"
                    width={20}
                    height={20}
                    alt="exit"
                    onClick={toggleForm}
                  />
                </div>
                <textarea placeholder="Start your post here..." />
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={(input) => {
                    // Use input directly as HTMLInputElement
                    if (input) {
                      input.addEventListener("change", (e) => {
                        field.onChange(e);
                        const file = (e.target as HTMLInputElement)?.files?.[0];
                        if (file) {
                          setValue("image", file);
                        }
                      });
                      fileInputRef.current = input;
                    }
                  }}
                />
                <div className={styles.uploadBtn}>
                  <Image
                    className={styles.deleteIcon}
                    src="https://res.cloudinary.com/dvz91qyth/image/upload/v1694031326/Nomex/dashboard/image-_w6snno.png"
                    width={30}
                    height={30}
                    alt="upload"
                    onClick={() => fileInputRef.current?.click()} // Use optional chaining
                  />
                  {getValues("image") && (
                    <p>Selected File: {getValues("image").name}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className={styles.inputBtnContainer}>
                <button onClick={toggleForm} className={styles.inputBtn}>
                  Create Post
                </button>
              </div>
            )
          }
        />
      </div>
      {isCreatingPost ? (
        <div className={styles.submitContainer}>
          <button className={styles.submitBtn} type="submit">
            Submit
          </button>
        </div>
      ) : null}
    </form>
  );
};

export default CreatePost;
