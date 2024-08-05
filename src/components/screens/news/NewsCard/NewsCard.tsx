// src/components/screens/news/NewsCard/NewsCard.tsx

import React, { FC, ReactNode } from "react";
import styles from "./NewsCard.module.scss";
import OutlineButton from "@/components/UI/buttons/outlineButton/OutlineButton";
import Image from "next/image";

interface NewsCardProps {
  small?: boolean;
  setSelectedNews: (id: string) => void;
  title: string;
  subtitle: string;
  preview: ReactNode;
  image: string;
  id: string;
}

const NewsCard: FC<NewsCardProps> = ({
  small,
  setSelectedNews,
  title,
  preview,
  image,
  id,
  subtitle,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <h2 className={styles.title}>{title}</h2>
        <h2 className={styles.subtitle}>{subtitle}</h2>
        <p className={styles.descr}>{preview}</p>
      </div>
      <div className={styles.botom}>
        <OutlineButton
          onClick={() => setSelectedNews(id)}
          children={"Читать"}
        />
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
