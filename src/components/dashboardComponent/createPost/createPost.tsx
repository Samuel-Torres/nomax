import { useRef, useState } from "react";
import styles from "./createPost.module.scss";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Users } from "@prisma/client";
import { fetchError } from "../../../app/lib/exceptions";
import { useSWRConfig } from "swr";
import { unstable_serialize } from "swr/infinite";
import { getKey } from "@/app/globalState/posts";
import { toast } from "react-toastify";

import { toastifyError } from "@/utils/toastifyError";

type createPostProps = {
  isCreatingPost: boolean;
  toggleForm: () => void;
  loggedInUser: Users;
  setError: Function;
  setIsError: Function;
};

const CreatePost = ({
  isCreatingPost,
  toggleForm,
  loggedInUser,
  setError,
  setIsError,
}: createPostProps) => {
  const [imgSrc, setImgSrc] = useState<any>("");
  const { handleSubmit, control, setValue } = useForm();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { mutate } = useSWRConfig();
  const successResponses = [
    "🔥Great job! Your post is live.",
    "📰 Awesome work! Your post has been published.",
    "🔥 You're on fire! Post created successfully.",
    "😊 Congratulations! Your post is up.",
    "😊 Well done! Your post is now live.",
    "😊 Way to go! Your post has been published.",
    "😊🔨 You're nailing it! Post created successfully.",
    "🤯 Fantastic! Your post is now up.",
    "👏 Keep it up! Your post has been published.",
    "👏 Bravo! Your post is live and ready to be seen.",
  ];

  const toastifySuccess = () => {
    toast.success(
      successResponses[Math.floor(Math.random() * successResponses.length)],
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
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("file", data.image);
    formData.append("upload_preset", "nomax-uploads");
    let imageSecureUrl: string;
    // let videoSecureUrl: string;

    setImgSrc("");

    const payload = {
      postBody: data.text || "",
      authorId: loggedInUser.id,
      imageSrc: "",
      // videoSrc: ""
    };
    // If Image url is present w/ or without text:
    if (data.image.length > 0) {
      await axios
        .post(
          "https://api.cloudinary.com/v1_1/dvz91qyth/image/upload",
          formData
        )
        .then(async (response) => {
          imageSecureUrl = response.data.secure_url;
          // videoSecureUrl = response?.data?.secure_url;

          if (response.status === 200) {
            await axios
              .post(
                "/api/posts",
                imageSecureUrl ? { ...payload, imageSrc: imageSecureUrl } : null
              )
              .then((res) => {
                setImgSrc("");
                setValue("text", "");
                setValue("image", "");
                toggleForm();
                toastifySuccess();
                mutate(unstable_serialize(getKey));
              });
          }
        })
        .catch((error) => {
          setImgSrc("");
          setValue("text", "");
          setValue("image", "");
          toastifyError();
          setError(new fetchError(error));
          setIsError(true);
        });
    } else {
      await axios
        .post("/api/posts", payload)
        .then((res) => {
          setImgSrc("");
          setValue("text", "");
          setValue("image", "");
          toggleForm();
          toastifySuccess();
          mutate(unstable_serialize(getKey));
        })
        .catch((error) => {
          setImgSrc("");
          setValue("text", "");
          setValue("image", "");
          toastifyError();
          setError(new fetchError(error));
          setIsError(true);
        });
    }
  };

  const handleImageUpload = (changeEvent: any) => {
    const reader = new FileReader();

    reader.onload = (onLoadEvent) => {
      setValue("image", onLoadEvent.target?.result);
      setImgSrc(onLoadEvent.target?.result);
    };

    reader.readAsDataURL(changeEvent.target?.files[0]);
  };

  const clearImgSrc = () => {
    setImgSrc("");
  };

  const clearNToggleForm = () => {
    setImgSrc("");
    setValue("text", "");
    setValue("image", "");
    toggleForm();
  };

  return (
    <form
      className={`${styles.container} ${
        isCreatingPost ? styles.expanded : ""
      } ${imgSrc.length > 0 ? styles.imgIsPresent : ""}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      {isCreatingPost ? (
        <div>
          <Controller
            name="text"
            control={control}
            defaultValue=""
            render={({ field }) => (
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
                <textarea {...field} placeholder="Start your post here..." />
              </div>
            )}
          />
          <Controller
            name="image"
            control={control}
            defaultValue=""
            render={() => (
              <div className={styles.uploadContainer}>
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
            )}
          />
        </div>
      ) : (
        <div className={styles.inputBtnContainer}>
          <button onClick={toggleForm} className={styles.inputBtn}>
            Create Post
          </button>
        </div>
      )}
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
