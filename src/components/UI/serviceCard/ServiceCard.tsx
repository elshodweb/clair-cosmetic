import React, { FC } from "react";
import styles from "./ServiceCard.module.scss";
import Link from "next/link";
import cn from "classnames";
interface ServiceCardProps {
  greenTitle?: boolean;
}
const ServiceCard: FC<ServiceCardProps> = ({ greenTitle }) => {
  return (
    <div className={styles.service}>
      <div className={styles.row}>
        <div className={styles.info}>
          <div className={styles.name}>Уход за кожей</div>
          <div className={cn(styles.subName, greenTitle ? styles.green : "")}>
            косметология
          </div>
          <div className={styles.mobTags}>
            <span>HydraFacial</span>
            <span>Icoone Laser</span>
            <span>OnMacabim</span>
          </div>
        </div>
        <div className={styles.price}>от 1000 ₽</div>
      </div>
      <div className={styles.subInfo}>
        <div className={styles.tags}>
          <span>HydraFacial</span>
          <span>Icoone Laser</span>
          <span>OnMacabim</span>
        </div>
        <div className={styles.mobPrice}>от 1000 ₽</div>

        <Link href={"/services/" + "asd"} className={styles.btn}>
          Записаться
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;