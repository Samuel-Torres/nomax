import Image from "next/image";
import styles from "./iconCard.module.scss";
import Link from "next/link";

type cardData = {
  icons: Array<{
    id: number;
    iconImage: string;
    alt: string;
    text: string;
  }>;
};

const iconCard = ({ icons }: cardData) => {
  return (
    <div className={styles.container}>
      {icons.map((item) => (
        <div key={item.id} className={styles.iconComponent}>
          <div className={styles.iconImgContainer}>
            <Image
              className={styles.iconImage}
              src={item.iconImage}
              alt="icon"
              fill={true}
              data-test="iconImg"
            />
          </div>
          <div className={styles.textContainer}>
            <p data-test="iconCardText">{item.text}</p>
          </div>
        </div>
      ))}
      <div className={styles.btnContainer}>
        <Link className={styles.btnLink} href="/auth/login">
          <button className={styles.btn}>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default iconCard;
