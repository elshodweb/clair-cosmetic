import React, { useState } from "react";
import styles from "./MasterContainer.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import MasterItem from "../MasterItem/MasterItem";
import MasterModal from "@/components/UI/masterModal/MasterModal";

interface MasterContainerProps {
  data: any[];
}

const MasterContainer: React.FC<MasterContainerProps> = ({ data }) => {
  const [id, setId] = useState<string | null>(null);

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
            slidesPerView: 4.5,
          },
        }}
      >
        {data.map((i) => (
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
