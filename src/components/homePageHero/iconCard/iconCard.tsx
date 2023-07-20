import Image from "next/image";
import styles from "./iconCard.module.scss";

type cardData = {
  header: string;
  icons: Array<{
    id: number;
    iconImage: string;
    alt: string;
    text: string;
  }>;
};

const iconCard = ({ header, icons }: cardData) => {
  return (
    <div className={styles.container}>
      <h1>{header}</h1>
      {icons.map((item) => (
        <div key={item.id} className={styles.iconComponent}>
          <div className={styles.iconImgContainer}>
            <Image
              className={styles.iconImage}
              src={item.iconImage}
              alt="icon"
              fill={true}
            />
          </div>
          <h3>{item.text}</h3>
        </div>
      ))}
    </div>
  );
};

export default iconCard;
