"use client";
import styles from "./photoCardList.module.scss";
import { useUserPhotos } from "@/app/globalState/photos";
import { Photos, Users } from "@prisma/client";

// sub-components:
import PhotoCard from "./photoCard";
import Error from "@/app/dashboard/error";

import { reset } from "@/utils/reset";

type photoCardListProps = {
  user: Users;
};

const PhotoCardList = ({ user }: photoCardListProps) => {
  const { photos, error, setError, isError, setIsError, isLoading } =
    useUserPhotos(user.id);

  console.log("PHOTOS: ", photos);

  return (
    <div className={styles.container}>
      {photos &&
        photos?.map((photo: Photos) => {
          return (
            <PhotoCard
              id={photo.id}
              imageSrc={photo.imageSrc}
              description={photo.description}
              createdAt={photo.createdAt}
              userId={photo.userId}
              key={photo.id}
            />
          );
        })}
      {isError && error && (
        <Error
          error={error}
          reset={() => reset(setIsError)}
          pageType="profile"
        />
      )}
    </div>
  );
};

export default PhotoCardList;
