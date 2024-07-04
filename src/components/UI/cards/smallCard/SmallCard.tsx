import React, { useState } from "react";
import styles from "./SmallCard.module.scss";
import Image from "next/image";
import Like from "../../like/Like";
const SmallCard = () => {
  const [isLiked, setIsLike] = useState<boolean>(false);
  return (
    <div className={styles.wrapper}>
      <div className={styles.titles}>
        <h4 className={styles.title}>Holiday.Plumping</h4>
        <h5 className={styles.subtitle}>KEVIN MURPHY </h5>
      </div>
      <div className={styles.img}>
        <Image
          src={"/images/products/1.png"}
          alt="product img"
          height={240}
          width={160}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.price}>
          <strong>8 800 ₽ </strong>
          <span>12 800 ₽</span>
        </div>
        <div
          onClick={() => {
            setIsLike(!isLiked);
          }}
        >
          <Like isLiked={isLiked} />
        </div>
      </div>
    </div>
  );
};

export default SmallCard;
