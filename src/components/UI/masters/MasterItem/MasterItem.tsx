import Image from "next/image";
import React, { FC } from "react";
import styles from "./MasterItem.module.scss";

interface master {
  id: number;
  name: string;
  profession: string;
  img: string;
}
interface MasterProps {
  data: master;
}
const MasterItem: FC<MasterProps> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <Image
        className={styles.img}
        src={data.img}
        alt="trends"
        width={324}
        height={420}
      />
      <button className={styles.like}></button>

      <div className={styles.row}>
        <div className={styles.info}>
          <div className={styles.name}>{data.name}</div>
          <div className={styles.profession}>{data.profession}</div>
        </div>
        <button className={styles.btn}>Запись</button>
      </div>
    </div>
  );
};

export default MasterItem;
