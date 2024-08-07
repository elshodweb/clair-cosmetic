import Image from "next/image";
import React, { Dispatch, FC, SetStateAction } from "react";
import styles from "./MasterItem.module.scss";

interface MasterProps {
  data: any;
  setMaster: Dispatch<SetStateAction<string | null>>;
}
const MasterItem: FC<MasterProps> = ({ data, setMaster }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.img}>
        <Image
          src={data?.avatar ? data.avatar : "/images/masters/master.png"}
          alt="trends"
          width={324}
          height={420}
        />
      </div>
      <button className={styles.like}></button>

      <div className={styles.row}>
        <div className={styles.info}>
          <div className={styles.name}>{data.name}</div>
          <div className={styles.profession}>{data.specialization.title}</div>
        </div>
        <button
          onClick={() => {
            setMaster(data.id);
          }}
          className={styles.btn}
        >
          Запись
        </button>
      </div>
    </div>
  );
};

export default MasterItem;
