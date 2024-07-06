import React from "react";
import styles from "./NewsCards.module.scss";

const NewsCards = () => {
  return (
    <div className={styles.row}>
      <div className={styles.bigCard}>
        <div className={styles.title}>
          Этой весной Clair исполняется 15 лет!
        </div>
        <div className={styles.text}>
          <p>
            За эти годы в наших салонах случилось больше магии, чем в самом
            Хогвартсе, и мы решили, что одного дня будет совсем недостаточно,
            чтобы отпраздновать событие такого масштаба!
          </p>

          <p>
            Поэтому на этот раз мы подготовили для тебя целый марафон дней
            любимых брендов
          </p>
        </div>
      </div>
      <div className={styles.cards}>
        <div className={styles.smallCard}>
          <div className={styles.title}>Новинки для лица</div>
        </div>
        <div className={styles.smallCard}>
          <div className={styles.title}>Большой книжный фестиваль «Фонарь» </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCards;
