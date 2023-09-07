import { useRef, useState } from "react";
import styles from "./createPost.module.scss";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";

type createPostProps = {
  isCreatingPost: boolean;
  toggleForm: () => void;
};

const CreatePost = ({ isCreatingPost, toggleForm }: createPostProps) => {
  const [imgSrc, setImgSrc] = useState<any>("");
  const { handleSubmit, control } = useForm();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (data: any) => {
    console.log("PASSED IN DATA: ", data);
  };

  const handleImageUpload = (changeEvent: any) => {
    const reader = new FileReader();

    reader.onload = (onLoadEvent) => {
      setImgSrc(onLoadEvent.target?.result);
    };

    reader.readAsDataURL(changeEvent.target?.files[0]);
  };

  const clearImgSrc = () => {
    setImgSrc("");
  };

  const clearNToggleForm = () => {
    setImgSrc("");
    toggleForm();
  };

  console.log("GET VAL: ", imgSrc);
  return (
    <form
      className={`${styles.container} ${
        isCreatingPost ? styles.expanded : ""
      } ${imgSrc.length > 0 ? styles.imgIsPresent : ""}`}
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
                    onClick={clearNToggleForm}
                  />
                </div>
                <textarea placeholder="Start your post here..." />
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                  ref={(input) => {
                    fileInputRef.current = input;
                  }}
                />
                <div className={styles.uploadBtn}>
                  <Image
                    className={styles.deleteIcon}
                    src="https://res.cloudinary.com/dvz91qyth/image/upload/v1694031326/Nomex/dashboard/image-_w6snno.png"
                    width={30}
                    height={30}
                    alt="upload"
                    onClick={() => fileInputRef.current?.click()}
                  />
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
        <>
          <div
            className={`${styles.imgContainer} ${
              imgSrc ? styles.expanded : ""
            }`}
          >
            {imgSrc?.length > 0 && (
              <>
                <div>
                  <Image
                    className={styles.clear}
                    src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693421983/Nomex/dashboard/delete_lzxfe3.png"
                    width={20}
                    height={20}
                    alt="clear-img-src"
                    onClick={clearImgSrc}
                  />
                </div>
                <Image
                  src={imgSrc}
                  width={200}
                  height={200}
                  alt="selectedImg"
                />
              </>
            )}
          </div>
          <div className={styles.submitContainer}>
            <button className={styles.submitBtn} type="submit">
              Submit
            </button>
          </div>
        </>
      ) : null}
    </form>
  );
};

export default CreatePost;
