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
  fetchMoreNews,
  selectNews,
  selectNewsStatus,
  selectNewsError,
  selectCurrentPage,
  incrementPage,
  selectTotalCount,
} from "@/store/news/newsSlice";
import { fetchNewsCategories } from "@/store/news/newsCategorySlice";
import SmallTitle from "@/components/UI/smallTitle/SmallTitle";

const NewsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.newsCategory);
  const news = useSelector(selectNews);
  const newsStatus = useSelector(selectNewsStatus);
  const newsError = useSelector(selectNewsError);
  const currentPage = useSelector(selectCurrentPage);
  const totalCount = useSelector(selectTotalCount);
  const [selectedNews, setSelectedNews] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(""); // ID категории по умолчанию

  useEffect(() => {
    dispatch(fetchNewsCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchNews({ categoryIds: selectedCategory, page: 1, pageSize: 8 })
    );
  }, [dispatch, selectedCategory]);

  const handleLoadMore = () => {
    dispatch(incrementPage()); // Увеличение номера страницы
    dispatch(
      fetchMoreNews({
        categoryIds: selectedCategory,
        page: currentPage + 1,
        pageSize: 8,
      })
    );
  };

  function filterListener(id: string) {
    setSelectedCategory(id); // Устанавливаем категорию и сбрасываем новости
  }

  const hasMoreNews = totalCount > news.length;

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

        {newsStatus === "loading" && <p>Загрузка...</p>}

        {newsStatus === "failed" && <p>Ошибка: {newsError}</p>}
        {news.length > 0 ? (
          <>
            <div className={styles.list}>
              <div className={styles.row}>
                {news.map((item, index) => {
                  if (index % 2 === 0)
                    return (
                      <div className={styles.column} key={item.id}>
                        <NewsCard
                          setSelectedNews={setSelectedNews}
                          id={item.id}
                          title={item.title}
                          subtitle={item.preview}
                          preview={item.body}
                          image={item.images[0]}
                          small={false}
                        />
                        {news[index + 1] && (
                          <NewsCard
                            setSelectedNews={setSelectedNews}
                            title={news[index + 1].title}
                            subtitle={news[index + 1].preview}
                            preview={news[index + 1].body}
                            image={news[index + 1].images[0]}
                            id={news[index + 1].id}
                            small={true}
                          />
                        )}
                      </div>
                    );
                })}
              </div>
            </div>
            {hasMoreNews && (
              <div className={styles.btn}>
                <MoreBtn onClick={handleLoadMore} children="Показать еще" />
              </div>
            )}
          </>
        ) : (
          <div className={styles.emptyListMessage}>
            <SmallTitle>Новостей по этой категории не существует</SmallTitle>
          </div>
        )}
      </Loyaut>
    </div>
  );
};

export default NewsPage;
