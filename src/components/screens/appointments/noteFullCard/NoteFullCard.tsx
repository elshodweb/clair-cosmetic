import React from "react";
import styles from "./NoteFullCard.module.scss";
import OutlineButton from "@/components/UI/buttons/outlineButton/OutlineButton";
const NoteFullCard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <div className={styles.left_row}>
          <div className={styles.name}>
            HydraFacial: Сервис для ухода за кожей рук
          </div>
          <div className={styles.timer}>Через 2 часа</div>
        </div>
        <div className={`${styles.right_row} ${styles.desctop}`}>
          <div className={styles.price}>2700 ₽</div>
          <div className={styles.master}>Мастер Наталья</div>
        </div>
      </div>
      
      <div className={`${styles.left} ${styles.mobile}`}>
          <div className={styles.time_info}>
            <div className={styles.time}>23.07</div>|
            <div className={styles.date}>19:00</div>
          </div>
          <div className={styles.location}>
            Воронеж, Проспект Революции, д. 9А
          </div>
        </div>
      <div className={styles.bottom}>
      <div className={`${styles.right_row} ${styles.mobile}`}>
          <div className={styles.price}>2700 ₽</div>
          <div className={styles.master}>Мастер Наталья</div>
        </div>
        <div className={`${styles.left} ${styles.desctop}`}>
          <div className={styles.time_info}>
            <div className={styles.time}>23.07</div>|
            <div className={styles.date}>19:00</div>
          </div>
          <div className={styles.location}>
            Воронеж, Проспект Революции, д. 9А
          </div>
        </div>
        <div className={styles.btn}>
          <OutlineButton>Позвонить</OutlineButton>
        </div>
      </div>
    </div>
  );
};

export default NoteFullCard;
