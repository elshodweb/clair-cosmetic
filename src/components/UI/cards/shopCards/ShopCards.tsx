import React, { useEffect, useState } from "react";
import BigCard from "../bigCard/BigCard";
import styles from "./ShopCards.module.scss";
import SmallCard from "../smallCard/SmallCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ShopCards = () => {
  const [isClient, setIsClient] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsDesktop(window.innerWidth >= 580);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 580);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isClient) {
    return null; // or some loading spinner
  }

  return isDesktop ? (
    <div className={styles.row}>
      <BigCard />
      <SmallCard />
      <SmallCard />
      <SmallCard />
      <SmallCard />
      <SmallCard />
      <SmallCard />
      <BigCard />
    </div>
  ) : (
    <Swiper
      spaceBetween={12}
      slidesPerView={1}
      centeredSlides={true}
      style={{ marginBottom: 12 }}
    >
      <SwiperSlide>
        <BigCard />
      </SwiperSlide>
      <SwiperSlide>
        <SmallCard />
      </SwiperSlide>
      <SwiperSlide>
        <SmallCard />
      </SwiperSlide>
      <SwiperSlide>
        <SmallCard />
      </SwiperSlide>
      <SwiperSlide>
        <SmallCard />
      </SwiperSlide>
      <SwiperSlide>
        <SmallCard />
      </SwiperSlide>
      <SwiperSlide>
        <SmallCard />
      </SwiperSlide>
      <SwiperSlide>
        <BigCard />
      </SwiperSlide>
    </Swiper>
  );
};

export default ShopCards;
