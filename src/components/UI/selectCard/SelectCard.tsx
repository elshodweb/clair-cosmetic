import React, { FC } from "react";
import styles from "./SelectCard.module.scss";
import Image from "next/image";
interface SelectCardProps {
  title: string;
  subTitle: string;
  img?: string;
  id?: string | null;
  onSelect: (id: string | null) => void;
  selectedOptino: string | null;
}
const SelectCard: FC<SelectCardProps> = ({
  subTitle,
  title,
  img,
  id,
  selectedOptino,
  onSelect,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.img}>
        {img && <Image src={img} alt="option" width={60} height={85} />}
      </div>
      <div className={styles.row}>
        <div className={styles.left}>
          <h4 className={styles.name}>{title}</h4>
          <h5 className={styles.subName}>{subTitle}</h5>
        </div>
        <div className={styles.right}>
          <div className={`${styles.input}  `}>
            <input
              type="checkbox"
              checked={id == selectedOptino}
              onChange={() => {
                onSelect(id ? id : null);
              }}
            />
          </div>
          <button className={styles.moreBtn}>Подробнее</button>
        </div>
      </div>
    </div>
  );
};

export default SelectCard;
