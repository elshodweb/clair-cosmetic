import React from "react";
import styles from "./ShopPage.module.scss";
import Loyaut from "@/components/loyaut/Loyaut";
import Title from "@/components/UI/title/Title";
import SwiperComp from "@/components/UI/slider/SwiperComp";
import Filters from "./filters/Filters";
import BigCard from "@/components/UI/cards/bigCard/BigCard";
import SmallCard from "@/components/UI/cards/smallCard/SmallCard";
import Pagination from "./Pagination/Pagination";
const ShopPage = () => {
  return (
    <div className={styles.wrapper}>
      <Loyaut>
        <div className={styles.hero}>
          <Title>магазин</Title>
          <div className={styles.news}>
            <SwiperComp />
          </div>
        </div>
        <div className={styles.products}>
          <Filters />
          <div className={styles.cards}>
            <BigCard />
            <SmallCard />
            <SmallCard />
            <SmallCard />
            <SmallCard />
            <SmallCard />
            <SmallCard />
            <SmallCard />
            <SmallCard />
            <SmallCard />
            <SmallCard />
            <SmallCard />
            <BigCard />
          </div>
          <Pagination />
        </div>
      </Loyaut>
    </div>
  );
};

export default ShopPage;
