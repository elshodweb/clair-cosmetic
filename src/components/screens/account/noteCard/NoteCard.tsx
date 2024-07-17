import React from "react";
import styles from "./NoteCard.module.scss";
import OutlineButton from "@/components/UI/buttons/outlineButton/OutlineButton";
const NoteCard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.desctop}>
        <div className={styles.row}>
          <div className={styles.name}>
            HydraFacial: Сервис для ухода за кожей рук
          </div>
          <div className={styles.price}>2700 ₽</div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <div className={styles.time}>23.07</div>
            <div className={styles.info}>
              <div className={styles.date}>19:00</div>
              <div className={styles.location}>Мастер Наталья</div>
            </div>
          </div>
          <div className={styles.btn}>
            <OutlineButton>Позвонить</OutlineButton>
          </div>
        </div>
      </div>
      <div className={styles.mobile}>
        <div className={styles.left}>
          <div className={styles.time}>23.07</div>
          <div className={styles.info}>
            <div className={styles.date}>19:00</div>
            <div className={styles.location}>Мастер Наталья</div>
          </div>
        </div>
        <div className={styles.name}>
          HydraFacial: Сервис для ухода за кожей рук
        </div>
        <div className={styles.bottom}>
          <div className={styles.price}>2700 ₽</div>
          <div className={styles.btn}>
            <OutlineButton>Позвонить</OutlineButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
