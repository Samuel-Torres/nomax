import Image from "next/image";
import React from "react";
import styles from "./photoCard.module.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { KeyedMutator, mutate } from "swr";

import convertDateToRelative from "@/utils/convertDateToRelativeTime";

type PhotoCardProps = {
  id: number;
  imageSrc: string;
  description: string | null;
  createdAt: Date;
  userId: number;
  mutate: KeyedMutator<string>;
};

const PhotoCard = ({
  id,
  imageSrc,
  description,
  createdAt,
  userId,
}: PhotoCardProps) => {
  const deletePhotoSuccessResponses = [
    "🗑️ Photo successfully deleted.",
    "👋 Farewell, photo! It's been removed.",
    "🎉 Photo successfully removed from view.",
    "🚮 Successfully deleted your photo.",
    "🚫 Your photo has been removed.",
    "👏 Photo successfully eliminated.",
    "👋 Farewell, photo! You've been deleted.",
    "👌 Successfully removed your photo.",
    "✨ Your photo is no more.",
    "👍 Photo successfully expunged from existence.",
  ];

  const deletePhoto = (photoId: number) => {
    axios
      .delete(`/api/photos/${photoId}`)
      .then((response) => {
        toast.success(
          deletePhotoSuccessResponses[
            Math.floor(Math.random() * deletePhotoSuccessResponses.length)
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
        mutate(`/api/photos/${userId}`);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message
            ? `😢 ${error.response.data.message}`
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
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image className={styles.img} src={imageSrc} fill alt="user upload" />
      </div>
      <div className={styles.actionContainer}>
        <p className={styles.date}>{convertDateToRelative(createdAt)}</p>
        <Image
          onClick={() => deletePhoto(id)}
          className={styles.delete}
          src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693419097/Nomex/dashboard/trash_pglfuc.png"
          width={25}
          height={25}
          alt="user upload"
        />
      </div>
      <p className={styles.desc}>{description}</p>
    </div>
  );
};

export default PhotoCard;
