import React, { useEffect } from "react";
import styles from "./NewsCards.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchNews } from "@/store/news/homeNewsSlice";

const NewsCards = ({ data }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const homeNews = useSelector((state: RootState) => state.homeNews.news);

  const statusNews = useSelector((state: RootState) => state.homeNews.status);
  const errorNews = useSelector((state: RootState) => state.homeNews.news);

  useEffect(() => {
    if (statusNews === "idle") {
      dispatch(fetchNews());
    }
  }, [statusNews, dispatch]);

  // if (statusNews === "failed") return <div>Error: {errorNews}</div>;
  if (statusNews === "loading") return <div>Loading...</div>;
  return (
    <div className={styles.row}>
      <div className={styles.bigCard}>
        <div className={styles.title}>{homeNews?.[0]?.title}</div>
        <div className={styles.text}>{homeNews?.[0]?.preview}</div>
      </div>
      <div className={styles.cards}>
        <div className={styles.smallCard}>
          <div className={styles.title}> {homeNews?.[1]?.title}</div>
        </div>
        <div className={styles.smallCard}>
          <div className={styles.title}> {homeNews?.[2]?.title}</div>
        </div>
      </div>
    </div>
  );
};

export default NewsCards;
