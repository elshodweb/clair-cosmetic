"use client"; // <===== REQUIRED
import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import Image from "next/image";
import style from "./SliderComp.module.scss";
import { FreeMode } from "swiper/modules";
const trends = [
  { name: "Тренды лета", id: 1, img: "/images/slider/1.png" },
  { name: "Тренды лета", id: 2, img: "/images/slider/2.png" },
  { name: "Тренды лета", id: 3, img: "/images/slider/3.png" },
  { name: "Тренды лета", id: 4, img: "/images/slider/1.png" },
  { name: "Тренды лета", id: 5, img: "/images/slider/2.png" },
  { name: "Тренды лета", id: 6, img: "/images/slider/3.png" },
  { name: "Тренды лета", id: 7, img: "/images/slider/1.png" },
];
const SwiperComp = () => {
  return (
    <Swiper
      spaceBetween={12}
      slidesPerView={"auto"}
      modules={[FreeMode]}
      freeMode={true}
      breakpoints={{
        0: {
          freeMode: false,
          slidesPerView: 1,
        },
        800: {
          slidesPerView: 2.3,
        },
        1120: {
          slidesPerView: 3.2,
        },
        1440: {
          slidesPerView: 4.2,
        },
      }}
    >
      {trends.map((i) => (
        <SwiperSlide className={style.slide} key={i.id}>
          <div className={style.row}>
            <div className={style.name}>{i.name}</div>
            <button className={style.btn}>
              <Image
                src={"/images/stories/right.svg"}
                alt="right"
                width={15}
                height={15}
              />
            </button>
          </div>
          <Image
            className={style.img}
            src={i.img}
            alt="trends"
            width={324}
            height={420}
            priority
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComp;
