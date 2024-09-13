import React, { FC } from "react";
import styles from "./Masters.module.scss";
import ServiceMasterItem from "./ServiceMasterItem/ServiceMasterItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
const Masters: FC<any> = ({ staffs }) => {
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
          768: {
            slidesPerView: 2,
          },
          1080: {
            slidesPerView: 3,
          },
          1440: {
            slidesPerView: 4.5,
          },
        }}
      >
        {staffs.map((i: any) => (
          <SwiperSlide className={styles.slide} key={i.id}>
            <ServiceMasterItem data={i} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Masters;
