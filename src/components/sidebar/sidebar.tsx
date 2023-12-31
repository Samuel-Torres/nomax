"use client";
import React from "react";
import styles from "./sidebar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { unstable_serialize } from "swr/infinite";
import { getKey } from "@/app/globalState/posts";
import { mutate } from "swr";

// components:
import LogoutBtn from "../logout/logoutBtn";
import ImageError from "./imageError";
import BallSpinner from "../loadingStateComponents/ballSpinner";

// fetch:
import { useLoggedInUser } from "@/app/globalState/user";

import { revalidateQueries } from "@/app/globalState/middleware";

function Sidebar() {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isEditingPhoto, setIsEditingPhoto] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imgSrc, setImgSrc] = useState<any>("");
  const { data: session } = useSession();
  const [isError, setIsError] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [id, setId] = useState<number>();
  const data = useLoggedInUser();
  const { handleSubmit, control, setValue } = useForm();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("file", data.image);
    formData.append("upload_preset", "nomax-uploads");
    let imageSecureUrl: string;

    const payload = {
      id: id,
      email: session?.user?.email,
      profilePicture: "",
    };

    if (data.image.length > 0) {
      await axios
        .post(
          "https://api.cloudinary.com/v1_1/dvz91qyth/image/upload",
          formData
        )
        .then(async (response) => {
          imageSecureUrl = response.data.secure_url;

          if (response.status === 200) {
            console.log("FRONT END RAN");
            await axios
              .put(
                "/api/users/",
                imageSecureUrl
                  ? {
                      ...payload,
                      profilePicture: imageSecureUrl,
                    }
                  : null
              )
              .then((res) => {
                revalidateQueries();
                setIsEditingPhoto(false);
                setIsSubmitting(false);
                mutate(unstable_serialize(getKey));
              })
              .catch((error) => {
                setIsError(true);
                setIsSubmitting(false);
              });
          }
        })
        .catch((error) => {
          setIsError(true);
          setIsSubmitting(false);
        });
    }
  };

  const handleMouseHover = () => {
    setIsHovering(!isHovering);
  };

  const handleImageUpload = (changeEvent: any) => {
    const reader = new FileReader();

    reader.onload = (onLoadEvent) => {
      setValue("image", onLoadEvent.target?.result);
      setImgSrc(onLoadEvent.target?.result);
    };

    setIsEditingPhoto(true);

    reader.readAsDataURL(changeEvent.target?.files[0]);
  };

  const reset = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <Controller
        name="image"
        control={control}
        defaultValue=""
        render={() => (
          <>
            {isError ? (
              <ImageError reset={reset} />
            ) : (
              <form className={styles.imageContainer}>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                  ref={(input) => {
                    fileInputRef.current = input;
                  }}
                />
                {data?.isLoadingUser ? (
                  <BallSpinner />
                ) : (
                  <Image
                    className={styles.icon}
                    src={
                      data?.user?.profilePicture
                        ? data?.user?.profilePicture
                        : "https://res.cloudinary.com/dvz91qyth/image/upload/v1693247245/Nomex/dashboard/earth-with-thin-waves-pattern_katll8.png"
                    } // set fallback image here to stop warning in browser.
                    priority={false}
                    width={80}
                    height={80}
                    alt="profile"
                    data-test="googleImage"
                  />
                )}
                <div
                  className={styles.iconContainer}
                  onMouseEnter={handleMouseHover}
                  onMouseLeave={handleMouseHover}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {isHovering ? (
                    <Image
                      className={styles.editIcon}
                      src={
                        "https://res.cloudinary.com/dvz91qyth/image/upload/v1694716457/Nomex/dashboard/edit_qtrt4q.png"
                      }
                      width={35}
                      height={35}
                      alt="edit"
                      data-test="googleImage"
                    />
                  ) : (
                    <Image
                      className={styles.editIcon}
                      src={
                        "https://res.cloudinary.com/dvz91qyth/image/upload/v1694717162/Nomex/dashboard/edit_2_kozxzu.png"
                      }
                      width={35}
                      height={35}
                      alt="edit"
                      data-test="googleImage"
                    />
                  )}
                </div>
                {isEditingPhoto &&
                  (isSubmitting ? (
                    <div className={styles.centered}>
                      <BallSpinner />
                    </div>
                  ) : (
                    <button
                      className={styles.submitBtn}
                      onClick={handleSubmit(onSubmit)}
                      type="button"
                    >
                      Submit
                    </button>
                  ))}
              </form>
            )}
          </>
        )}
      />

      <div className={styles.linkContainer}>
        <Link className={styles.link} href="/dashboard">
          <Image
            className={styles.icon}
            src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693256653/Nomex/dashboard/home_befu43.png"
            width={30}
            height={30}
            alt="google"
            data-test="home"
          />
          <p className={styles.linkText}>Home</p>
        </Link>
        <Link
          className={styles.link}
          href={`/dashboard/profile/${data?.user?.id}`}
        >
          <Image
            className={styles.icon}
            src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693247774/Nomex/dashboard/user_gtq9lo.png"
            width={30}
            height={30}
            alt="google"
            data-test="profile"
          />
          <p className={styles.linkText}>Profile</p>
        </Link>
        {/* <Link className={styles.link} href="/dashboard/blogs">
          <Image
            className={styles.icon}
            src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693248320/Nomex/dashboard/blog_vrb3il.png"
            width={30}
            height={30}
            alt="google"
            data-test="blog"
          />
          <p className={styles.linkText}>Blogs</p>
        </Link> */}

        <Link className={styles.link} href="/dashboard/settings">
          <Image
            className={styles.icon}
            src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693248373/Nomex/dashboard/settings_iyfkfn.png"
            width={30}
            height={30}
            alt="google"
            data-test="settings"
          />
          <p className={styles.linkText}>Settings</p>
        </Link>
      </div>
      <div className={styles.logoutContainer}>
        <LogoutBtn />
      </div>
    </div>
  );
}

export default Sidebar;
