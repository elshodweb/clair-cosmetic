import React from "react";
import styles from "./SingleShopPage.module.scss";
import Loyaut from "@/components/loyaut/Loyaut";
import SmallTitle from "@/components/UI/smallTitle/SmallTitle";
import SmallCard from "@/components/UI/cards/smallCard/SmallCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import Product from "./Product/Product";
const SingleShop = () => {
  return (
    <div className={styles.wrapper}>
      <Loyaut>
        <Product />
        <SmallTitle>Рекомендации</SmallTitle>
        <div className={styles.row}>
          <Swiper
            spaceBetween={15}
            modules={[FreeMode]}
            freeMode={true}
            breakpoints={{
              0: {
                freeMode: false,
                slidesPerView: 1,
              },
              600: {
                slidesPerView: 2,
              },
              900: {
                slidesPerView: 3,
              },
              1150: {
                slidesPerView: 4,
              },
              1400: {
                slidesPerView: 5,
              },
            }}
          >
            <SwiperSlide className={styles.slide}>
              <SmallCard />
            </SwiperSlide>
            <SwiperSlide className={styles.slide}>
              <SmallCard />
            </SwiperSlide>
            <SwiperSlide className={styles.slide}>
              <SmallCard />
            </SwiperSlide>
            <SwiperSlide className={styles.slide}>
              <SmallCard />
            </SwiperSlide>
            <SwiperSlide className={styles.slide}>
              <SmallCard />
            </SwiperSlide>
            <SwiperSlide className={styles.slide}>
              <SmallCard />
            </SwiperSlide>
          </Swiper>
        </div>
        <SmallTitle>Просмотрено</SmallTitle>
        <div className={styles.row}>
          <Swiper
            spaceBetween={15}
            modules={[FreeMode]}
            freeMode={true}
            breakpoints={{
              0: {
                freeMode: false,
                slidesPerView: 1,
              },
              600: {
                slidesPerView: 2,
              },
              900: {
                slidesPerView: 3,
              },
              1150: {
                slidesPerView: 4,
              },
              1400: {
                slidesPerView: 5,
              },
            }}
          >
            <SwiperSlide className={styles.slide}>
              <SmallCard />
            </SwiperSlide>
            <SwiperSlide className={styles.slide}>
              <SmallCard />
            </SwiperSlide>
            <SwiperSlide className={styles.slide}>
              <SmallCard />
            </SwiperSlide>
            <SwiperSlide className={styles.slide}>
              <SmallCard />
            </SwiperSlide>
            <SwiperSlide className={styles.slide}>
              <SmallCard />
            </SwiperSlide>
            <SwiperSlide className={styles.slide}>
              <SmallCard />
            </SwiperSlide>
          </Swiper>
        </div>
      </Loyaut>
    </div>
  );
};

export default SingleShop;
