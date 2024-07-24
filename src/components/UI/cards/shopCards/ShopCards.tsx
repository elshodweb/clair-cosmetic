import React, { useEffect, useState } from "react";
import BigCard from "../bigCard/BigCard";
import styles from "./ShopCards.module.scss";
import SmallCard from "../smallCard/SmallCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

const ShopCards = ({ data }: any) => {
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
      {data.map((el: any, i: number) => {
        if (i == 0 || i == 7) {
          return <BigCard data={el} />;
        }
        return <SmallCard data={el} />;
      })}
    </div>
  ) : (
    <Swiper
      spaceBetween={8}
      centeredSlides={false}
      modules={[FreeMode]}
      freeMode={true}
      breakpoints={{
        0: {
          slidesPerView: 1.1,
        },
        360: {
          slidesPerView: 1.2,
        },
        500: {
          slidesPerView: 1.4,
        },
      }}
      style={{ marginBottom: 12 }}
    >
      {data.map((el: any, i: number) => {
        if (i == 0 || i == 7) {
          return (
            <SwiperSlide>
              <BigCard data={el} />
            </SwiperSlide>
          );
        }
        return (
          <SwiperSlide>
            <SmallCard data={el} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ShopCards;
