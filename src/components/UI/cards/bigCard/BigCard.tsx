import React, { useEffect, useState } from "react";
import styles from "./BigCard.module.scss";
import Image from "next/image";
import Like from "../../like/Like";
import Link from "next/link";
import { http } from "@/utils/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
const BigCard = ({ data }: any) => {
  const [isLiked, setIsLike] = useState<boolean>(false);
  useEffect(() => {
    setIsLike(data.is_favorite);
  }, [data.is_favorite]);
  const { isAuth } = useSelector((state: RootState) => state.auth);

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
        {data.images[0]?.image && (
          <Image
            src={data.images[0]?.image || "/"}
            alt="product img"
            height={240}
            width={160}
            priority
          />
        )}
      </Link>
      <div className={styles.row}>
        <div className={styles.price}>
          <strong>{data.price} ₽ </strong>
        </div>
        <div
          onClick={() => {
            if (isAuth) {
              const token =
                typeof window !== "undefined"
                  ? localStorage.getItem("accessToken")
                  : null;

              if (isLiked) {
                http(token).delete("/products/favorites/" + data.id);
              } else {
                http(token).post("/products/favorites/", {
                  product: data.id,
                });
              }
              setIsLike(!isLiked);
            }
          }}
        >
          <Like isLiked={isLiked} />
        </div>
      </div>
    </div>
  );
};

export default BigCard;
