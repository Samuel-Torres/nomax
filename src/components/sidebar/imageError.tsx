import React from "react";
import Image from "next/image";
import styles from "./imageError.module.scss";

type ErrorProps = {
  reset: () => void;
};

const ImageError = ({ reset }: ErrorProps) => {
  return (
    <div className={styles.container}>
      <Image
        src="https://res.cloudinary.com/dvz91qyth/image/upload/v1693680614/Nomex/dashboard/error_clodv1.png"
        width={150}
        height={150}
        alt="error"
      />
      <p>
        We&#39;re sorry these things happen. An issue occurred on our end. We
        will work to fix the issue soon!
      </p>
      <button className={styles.btn} type="button" onClick={reset}>
        Try Again
      </button>
    </div>
  );
};

export default ImageError;
