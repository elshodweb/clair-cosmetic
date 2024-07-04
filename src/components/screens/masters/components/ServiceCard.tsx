import React from "react";
import styles from "./ServiceCard.module.scss";
const ServiceCard = () => {
  return (
    <div className={styles.service}>
      <div className={styles.row}>
        <div className={styles.info}>
          <div className={styles.name}>Уход за кожей</div>
          <div className={styles.subName}>косметология</div>
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

        <button className={styles.btn}>Записаться</button>
      </div>
    </div>
  );
};

export default ServiceCard;
