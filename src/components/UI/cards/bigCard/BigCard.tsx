import React, { useState } from "react";
import styles from "./BigCard.module.scss";
import Image from "next/image";
import Like from "../../like/Like";
import Link from "next/link";
const BigCard = ({ data }: any) => {
  const [isLiked, setIsLike] = useState<boolean>(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.titles}>
        <Link href={"/shop/" + data.id} className={styles.title}>
          {data.title}
        </Link>
        {data?.brand?.title && (
          <h5 className={styles.subtitle}>{data.brand.title}</h5>
        )}
      </div>
      <Link href={"/shop/" + data.id} className={styles.img}>
        <Image
          src={data.images[0]?.image || "/"}
          alt="product img"
          height={240}
          width={160}
          priority
        />
      </Link>
      <div className={styles.row}>
        <div className={styles.price}>
          <strong>{data.price} ₽ </strong>
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

export default BigCard;
