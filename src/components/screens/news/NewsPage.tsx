// src/components/screens/news/NewsPage.tsx

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
import { AppDispatch, RootState } from "@/store/store";
import {
  fetchNews,
  selectNews,
  selectNewsStatus,
  selectNewsError,
} from "@/store/news/newsSlice";
import { fetchNewsCategories } from "@/store/news/newsCategorySlice";
import SmallTitle from "@/components/UI/smallTitle/SmallTitle";

const NewsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.newsCategory);
  const news = useSelector(selectNews);
  const newsStatus = useSelector(selectNewsStatus);
  const newsError = useSelector(selectNewsError);
  const [selectedNews, setSelectedNews] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(""); // Default category ID for filtering

  useEffect(() => {
    dispatch(fetchNewsCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchNews({ categoryIds: selectedCategory, page: 1, pageSize: 8 })
    );
  }, [dispatch, selectedCategory]);

  function filterListener(id: string) {
    setSelectedCategory(id);
    console.log("Selected filter ID:", id);
  }

  // console.log(news);

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

        {newsStatus === "loading" && <p>Loading...</p>}

        {newsStatus === "failed" && <p>Error: {newsError}</p>}
        {news.length > 0 ? (
          <>
            <div className={styles.list}>
              <div className={styles.row}>
                {news.map((item, index) => {
                  if (index % 2 == 0)
                    return (
                      <div className={styles.column} key={item.id}>
                        <NewsCard
                          setSelectedNews={setSelectedNews}
                          title={item.title}
                          preview={item.preview}
                          image={item.images[0]}
                          small={false}
                        />
                        {news[index + 1] && (
                          <NewsCard
                            setSelectedNews={setSelectedNews}
                            title={news[index + 1].title}
                            preview={news[index + 1].preview}
                            image={news[index + 1].images[0]}
                            small={true}
                          />
                        )}
                      </div>
                    );
                })}
              </div>
            </div>
            <div className={styles.btn}>
              <MoreBtn onClick={() => {}} children="Показать еще" />
            </div>
          </>
        ) : (
          <div className={styles.emptyListMessage}>
            <SmallTitle>Нововости по этой категории не сушествует</SmallTitle>
          </div>
        )}
      </Loyaut>
    </div>
  );
};

export default NewsPage;
