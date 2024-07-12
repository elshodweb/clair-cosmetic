import React, { useState } from "react";
import styles from "./NewsPage.module.scss";
import Loyaut from "@/components/loyaut/Loyaut";
import Title from "@/components/UI/title/Title";
import SwiperComp from "@/components/UI/slider/SwiperComp";
import MyTabs from "@/components/UI/myTabs/MyTabs";
import NewsCard from "./NewsCard/NewsCard";
import MoreBtn from "./MoreBtn/MoreBtn";
import NewsModal from "./NewsModal/NewsModal";
const dataShops = [
  { title: "Персональные предложения" },
  { title: "Акции" },
  { title: "Новинки" },
  { title: "Подборки" },
  { title: "Уход за волосами" },
];

const NewsPage = () => {
  function filterListener(params: string) {}
  const [selectedNews, setSelectedNews] = useState<number | null>(null);
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
        <MyTabs filterListener={filterListener} data={dataShops} />
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
        <MoreBtn  onClick={() => {}} children="Показать еще" />
        </div>
      </Loyaut>
    </div>
  );
};

export default NewsPage;
