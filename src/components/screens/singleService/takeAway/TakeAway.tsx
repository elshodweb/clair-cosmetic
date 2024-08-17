import React, { FC } from "react";
import styles from "./TakeAway.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import ServiceCard from "@/components/UI/serviceCard/ServiceCard";

const TakeAway: FC<any> = ({ services }) => {
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
        {services.length > 0 &&
          services.map((i: any) => (
            <SwiperSlide key={i.id} className={styles.slide}>
              <ServiceCard service={i} key={i.id} greenTitle={true} />
            </SwiperSlide>
          ))}

        {/* ))} */}
      </Swiper>
    </div>
  );
};

export default TakeAway;
