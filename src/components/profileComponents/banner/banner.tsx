import styles from "./banner.module.scss";
import Image from "next/image";

type bannerProps = {
  bannerPhoto: string | null;
  profilePicture: string | null;
};

const Banner = async ({ bannerPhoto, profilePicture }: bannerProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.bannerContainer}>
        <Image
          className={styles.banner}
          src={
            bannerPhoto && bannerPhoto?.length > 0
              ? bannerPhoto
              : "https://res.cloudinary.com/dvz91qyth/image/upload/v1694759266/Nomex/profile/Untitled_design_ve4uvn.png"
          }
          width={1372}
          height={400}
          alt="banner"
        />
        <div className={styles.profilePictureContainer}>
          <Image
            className={styles.profilePicture}
            src={
              profilePicture && profilePicture.length > 0
                ? profilePicture
                : "https://res.cloudinary.com/dvz91qyth/image/upload/v1693247245/Nomex/dashboard/earth-with-thin-waves-pattern_katll8.png"
            }
            width={250}
            height={250}
            alt="profile"
            data-test="googleImage"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
