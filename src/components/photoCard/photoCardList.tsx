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
  const { photos, error, setError, isError, setIsError, isLoading, mutate } =
    useUserPhotos(user.id);

  return (
    <div className={styles.container}>
      {photos &&
        photos?.map((photo: Photos) => {
          return (
            <PhotoCard
              key={photo.id}
              id={photo.id}
              imageSrc={photo.imageSrc}
              description={photo.description}
              createdAt={photo.createdAt}
              userId={photo.userId}
              mutate={mutate}
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
