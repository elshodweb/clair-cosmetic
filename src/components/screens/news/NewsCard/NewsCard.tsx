// src/components/screens/news/NewsCard/NewsCard.tsx

import React, { FC } from "react";
import styles from "./NewsCard.module.scss";
import OutlineButton from "@/components/UI/buttons/outlineButton/OutlineButton";
import Image from "next/image";

interface NewsCardProps {
  small?: boolean;
  setSelectedNews: (id: number) => void;
  title: string;
  preview: string;
  image: string;
}

const NewsCard: FC<NewsCardProps> = ({ small, setSelectedNews, title, preview, image }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <h2 className={styles.title}>{title}</h2>
        <h3 className={styles.descr}>{preview}</h3>
      </div>
      <div className={styles.botom}>
        <OutlineButton onClick={() => setSelectedNews(1)} children={"Читать"} />
        {!small && (
          <div className={styles.img}>
            <Image src={image} alt="news image" width={560} height={560} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
