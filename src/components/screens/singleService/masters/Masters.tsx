import React from "react";
import styles from "./Masters.module.scss";
import ServiceMasterItem from "./ServiceMasterItem/ServiceMasterItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import 'swiper/css'
const data = [
  {
    id: 1,
    name: "Светлана",
    isLiked: true,
    profession: "Мастер по маникюру",
    img: "/images/masters/master.png",
    address: "Салон на проспекте Революции, дом 9А",
  },
  {
    id: 2,
    name: "Анастасия",
    isLiked: false,
    profession: "Визажист",
    img: "/images/masters/master.png",
    address: "Салон на проспекте Революции, дом 9А",
  },
  {
    id: 3,
    name: "Ксения",
    isLiked: false,
    profession: "Стилист",
    img: "/images/masters/master.png",
    address: "Салон на проспекте Революции, дом 9А",
  },
  {
    id: 4,
    name: "Юрий",
    isLiked: false,
    profession: "Парикмахер",
    img: "/images/masters/master.png",
  address:'Салон на проспекте Революции, дом 9А',
  },
  // {
  //   id: 5,
  //   name: "Юрий",
  //   isLiked: false,
  //   profession: "Парикмахер",
  //   img: "/images/masters/master.png",
  // address:'Салон на проспекте Революции, дом 9А',
  // },
  // {
  //   id: 6,
  //   name: "Юрий",
  //   isLiked: false,
  //   profession: "Парикмахер",
  //   img: "/images/masters/master.png",
  // address:'Салон на проспекте Революции, дом 9А',
  // },
];
const Masters = () => {
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
            slidesPerView: 4,
          },
        }}
      >
        {data.map((i) => (
          <SwiperSlide className={styles.slide} key={i.id}>
            <ServiceMasterItem data={i} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Masters;
