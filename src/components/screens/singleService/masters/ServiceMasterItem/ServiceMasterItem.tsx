import Image from "next/image";
import React, { FC } from "react";
import styles from "./ServiceMasterItem.module.scss";

interface master {
  id: number;
  name: string;
  profession: string;
  img: string;
  address: string;
}
interface MasterProps {
  data: master;
}
const ServiceMasterItem: FC<MasterProps> = ({ data }) => {
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

      <div className={styles.info}>
        <div className={styles.name}>{data.name}</div>
        <div className={styles.profession}>{data.profession}</div>
        <div className={styles.address}>{data.address}</div>
      </div>
    </div>
  );
};

export default ServiceMasterItem;
