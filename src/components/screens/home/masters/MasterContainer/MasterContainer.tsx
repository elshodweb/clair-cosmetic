import React, { useState } from "react";
import styles from "./MasterContainer.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import MasterItem from "../MasterItem/MasterItem";
import MasterModal from "@/components/UI/masterModal/MasterModal";
// const data = [
//   {
//     id: 1,
//     name: "Светлана",
//     isLiked: true,
//     profession: "Мастер по маникюру",
//     img: "/images/masters/master.png",
//   },
//   {
//     id: 2,
//     name: "Анастасия",
//     isLiked: false,
//     profession: "Мастер по маникюру",
//     img: "/images/masters/master.png",
//   },
//   {
//     id: 3,
//     name: "Ксения",
//     isLiked: false,
//     profession: "Стилист",
//     img: "/images/masters/master.png",
//   },
//   {
//     id: 4,
//     name: "Юрий",
//     isLiked: false,
//     profession: "Парикмахер",
//     img: "/images/masters/master.png",
//   },
//   {
//     id: 5,
//     name: "Юрий",
//     isLiked: false,
//     profession: "Парикмахер",
//     img: "/images/masters/master.png",
//   },
//   {
//     id: 6,
//     name: "Юрий",
//     isLiked: false,
//     profession: "Парикмахер",
//     img: "/images/masters/master.png",
//   },
// ];

const MasterContainer = ({ data }: any) => {
  const [id, setId] = useState<number | null>(null);
  return (
    <div className={styles.wrapper}>
      <Swiper
        spaceBetween={8}
        slidesPerView={"auto"}
        modules={[FreeMode]}
        freeMode={true}
        breakpoints={{
          0: {
            slidesPerView: 1.1,
          },

          460: {
            slidesPerView: 1.3,
          },
          768: {
            slidesPerView: 2.2,
          },
          1080: {
            slidesPerView: 3.2,
          },
          1440: {
            slidesPerView: 4.2,
          },
        }}
      >
        {data.map((i: any) => (
          <SwiperSlide className={styles.slide} key={i.id}>
            <MasterItem setMaster={setId} data={i} />
          </SwiperSlide>
        ))}

        <MasterModal id={id} setMaster={setId} />
      </Swiper>
    </div>
  );
};

export default MasterContainer;
