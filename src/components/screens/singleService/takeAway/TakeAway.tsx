import React from "react";
import styles from "./TakeAway.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import ServiceCard from "@/components/UI/serviceCard/ServiceCard";

const TakeAway = () => {
  return (
    <div className={styles.row}>
      <Swiper
        spaceBetween={12}
        modules={[FreeMode]}
        freeMode={true}
        breakpoints={{
          0: {
            freeMode: false,
            slidesPerView: 1,
          },
          1200: {
            slidesPerView: 2.1,
          },
        }}
      >
        <SwiperSlide className={styles.slide}>
          <ServiceCard greenTitle={true} />
        </SwiperSlide>

        <SwiperSlide className={styles.slide}>
          <ServiceCard greenTitle={true} />
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <ServiceCard greenTitle={true} />
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <ServiceCard greenTitle={true} />
        </SwiperSlide>
        {/* ))} */}
      </Swiper>
    </div>
  );
};

export default TakeAway;
