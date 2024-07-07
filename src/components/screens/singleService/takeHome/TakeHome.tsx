import React from "react";
import styles from "./TakeHome.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import SmallCard from "@/components/UI/cards/smallCard/SmallCard";
const TakeHome = () => {
  return (
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
        {/* {data.map((i) => ( */}
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

        {/* ))} */}
      </Swiper>
    </div>
  );
};

export default TakeHome;
