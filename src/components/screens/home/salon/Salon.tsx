import React from "react";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./Salon.module.scss";
import Image from "next/image";
const address = [
  "г. Воронеж, проспект Революции, дом 9А",
  "г. Воронеж, проспект Революции, дом 9А",
  "г. Воронеж, проспект Революции, дом 9А",
  "г. Воронеж, проспект Революции, дом 9А",
  "г. Воронеж, проспект Революции, дом 9А",
  "г. Воронеж, проспект Революции, дом 9А",
];
const Salon = () => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={"auto"}
      modules={[FreeMode]}
      freeMode={true}
      breakpoints={{
        0: {
          slidesPerView: 1.1,
        },
        650: {
          slidesPerView: 1.5,
        },
        1040: {
          slidesPerView: 2,
        },

        1400: {
          slidesPerView: 2.2,
        },
      }}
    >
      {address.map((i) => (
        <SwiperSlide className={style.slide} key={Math.random()}>
          <div className={style.wrapper}>
            <Image
              className={style.img}
              src={"/images/salon/1.png"}
              alt="salon"
              width={660}
              height={350}
            />

            <div className={style.name}>{i}</div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Salon;
