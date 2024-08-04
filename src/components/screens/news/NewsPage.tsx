import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./NewsPage.module.scss";
import Loyaut from "@/components/loyaut/Loyaut";
import Title from "@/components/UI/title/Title";
import SwiperComp from "@/components/UI/slider/SwiperComp";
import MyTabs from "@/components/UI/myTabs/MyTabs";
import NewsCard from "./NewsCard/NewsCard";
import MoreBtn from "./MoreBtn/MoreBtn";
import NewsModal from "./NewsModal/NewsModal";
import { RootState } from "@/store/store";
import { fetchNewsCategories } from "@/store/news/newsCategorySlice";

const NewsPage = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state.newsCategory);
  const [selectedNews, setSelectedNews] = useState<number | null>(null);

  useEffect(() => {
    // dispatch(fetchNewsCategories());
  }, [dispatch]);

  function filterListener(id: string) {
    // Handle the filter change here
    console.log("Selected filter ID:", id);
  }
  console.log(categories);

  return (
    <div className={styles.wrapper}>
      <Loyaut>
        <NewsModal id={selectedNews} setNews={setSelectedNews} />
        <div className={styles.title}>
          <Title>Услуги</Title>
        </div>
        <div className={styles.slider}>
          <SwiperComp />
        </div>
        <MyTabs filterListener={filterListener} data={categories} />
        <div className={styles.list}>
          <div className={styles.row}>
            <div className={styles.column}>
              <NewsCard setSelectedNews={setSelectedNews} />
              <NewsCard setSelectedNews={setSelectedNews} small={true} />
            </div>
            <div className={styles.column}>
              <NewsCard setSelectedNews={setSelectedNews} small={true} />
              <NewsCard setSelectedNews={setSelectedNews} />
            </div>
            <div className={styles.column}>
              <NewsCard setSelectedNews={setSelectedNews} />
              <NewsCard setSelectedNews={setSelectedNews} small={true} />
            </div>
            <div className={styles.column}>
              <NewsCard setSelectedNews={setSelectedNews} small={true} />
              <NewsCard setSelectedNews={setSelectedNews} />
            </div>
          </div>
        </div>
        <div className={styles.btn}>
          <MoreBtn onClick={() => {}} children="Показать еще" />
        </div>
      </Loyaut>
    </div>
  );
};

export default NewsPage;
