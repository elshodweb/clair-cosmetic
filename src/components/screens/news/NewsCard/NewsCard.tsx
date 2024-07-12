import React, { FC } from "react";
import styles from "./NewsCard.module.scss";
import OutlineButton from "@/components/UI/buttons/outlineButton/OutlineButton";
import Image from "next/image";
interface NewsCardProps {
  small?: boolean;
  setSelectedNews: (id:number) => void;
}
const NewsCard: FC<NewsCardProps> = ({ small, setSelectedNews }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <h2 className={styles.title}>
          Большой книжный фестиваль «Фонарь» и гаражная распродажа
        </h2>
        <h3 className={styles.subtitle}>
          23 июля на площадке @rassvet.bistrobar пройдёт Большой книжный
          фестиваль «Фонарь» и гаражная распродажа.
        </h3>
        <p className={styles.descr}>
          23 июля на площадке @rassvet.bistrobar пройдёт Большой книжный
          фестиваль «Фонарь» и гаражная распродажа. 23 июля на площадке
          @rassvet.bistrobar пройдёт Большой книжный фестиваль «Фонарь» и
          гаражная распродажа.
        </p>
      </div>
      <div className={styles.botom}>
        <OutlineButton onClick={() => setSelectedNews(1)} children={"Читать"} />
        {!small && (
          <div className={styles.img}>
            <Image
              src={"/images/news/item-1.png"}
              alt="news image"
              width={560}
              height={560}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
