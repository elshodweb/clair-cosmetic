import React, { FC, useEffect, useState } from "react";
import styles from "./NewsModal.module.scss";
import cn from "classnames";
import IconButton from "@/components/UI/buttons/iconButton/IconButton";
import Image from "next/image";
import instance from "@/utils/axiosInstance";

interface NewsModalProps {
  id: string | null;
  setNews: (id: string | null) => void;
}

const NewsModal: FC<NewsModalProps> = ({ id, setNews }) => {
  const [news, setNewsData] = useState<any>(null); // Replace `any` with your actual news type
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await instance.get(`/news/${id}/`);
          setNewsData(response.data);
        } catch (error) {
          setError("Failed to fetch news.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchNews();

    if (id) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [id]);

  if (id === null) {
    return null;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!news) {
    return null;
  }

  return (
    <div
      onClick={() => setNews(null)}
      className={cn(styles.wrapper, id ? styles.opened : "")}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.screen}>
        <IconButton className={styles.exitBtn} onClick={() => setNews(null)}>
          <Image
            src={"/images/header/cross.svg"}
            alt="cart"
            width={16}
            height={19}
          />
        </IconButton>
        <section className={styles.section}>
          <h2 className={styles.title}>{news.title}</h2>
          <h3 className={styles.subtitle}>{news.preview}</h3>
          <p
            className={styles.descr}
            dangerouslySetInnerHTML={{ __html: news.body }}
          ></p>
        </section>
        <div className={styles.img}>
          {news.images.map((src: string, index: number) => (
            <Image
              key={index}
              src={src}
              alt="news image"
              width={560}
              height={560}
            />
          ))}
        </div>
        <time className={styles.date}>
          {new Date(news.created_at).toLocaleDateString()}
        </time>
      </div>
    </div>
  );
};

export default NewsModal;
