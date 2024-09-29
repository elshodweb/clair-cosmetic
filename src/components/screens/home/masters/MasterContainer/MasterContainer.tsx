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
    <div className={styles.wrapperRow}>
      <div className={styles.row}>
        {data.map((i) => (
          <div className={styles.slide} key={i.id}>
            <MasterItem setMaster={setId} data={i} />
          </div>
        ))}

        <MasterModal id={id} setMaster={setId} />
      </div>
    </div>
  );
};

export default MasterContainer;
