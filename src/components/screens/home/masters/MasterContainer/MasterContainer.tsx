import React from "react";
import styles from "./MasterContainer.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import Image from "next/image";
import MasterItem from "../MasterItem/MasterItem";
const data = [
  {
    id: 1,
    name: "Светлана",
    isLiked: true,
    profession: "Мастер по маникюру",
    img: "/images/masters/master.png",
  },
  {
    id: 2,
    name: "Анастасия",
    isLiked: false,
    profession: "Визажист",
    img: "/images/masters/master.png",
  },
  {
    id: 3,
    name: "Ксения",
    isLiked: false,
    profession: "Стилист",
    img: "/images/masters/master.png",
  },
  {
    id: 4,
    name: "Юрий",
    isLiked: false,
    profession: "Парикмахер",
    img: "/images/masters/master.png",
  },
  {
    id: 5,
    name: "Юрий",
    isLiked: false,
    profession: "Парикмахер",
    img: "/images/masters/master.png",
  },
  {
    id: 6,
    name: "Юрий",
    isLiked: false,
    profession: "Парикмахер",
    img: "/images/masters/master.png",
  },
];
const MasterContainer = () => {
  return (
    <div className={styles.wrapper}>
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
          768: {
            slidesPerView: 2,
          },
          1080: {
            slidesPerView: 3,
          },
          1440: {
            slidesPerView: 4,
          },
        }}
      >
        {data.map((i) => (
          <SwiperSlide className={styles.slide} key={i.id}>
            <MasterItem data={i} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MasterContainer;
