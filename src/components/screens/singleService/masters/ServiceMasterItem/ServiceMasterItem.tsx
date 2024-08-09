import Image from "next/image";
import React, { FC } from "react";
import styles from "./ServiceMasterItem.module.scss";

interface MasterProps {
  data: any;
}
const ServiceMasterItem: FC<MasterProps> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <Image
          className={styles.img}
          src={data?.avatar ? data.avatar : "/images/masters/master.png"}
          alt="trends"
          width={324}
          height={420}
        />
      </div>
      <button className={styles.like}></button>

      <div className={styles.info}>
        <div className={styles.name}>{data.name}</div>
        <div className={styles.profession}>{data.specialization.title}</div>
      </div>
    </div>
  );
};

export default ServiceMasterItem;
