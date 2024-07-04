import React from "react";
import styles from "./NewsDecor.module.scss";
import Title from "../../title/Title";
const NewsDecor = () => {
  return (
      <div className={styles.decoration}>
        <h2 className={styles.decoration_title}>
          Мы создаем <span className={styles.yellow}>уникальный</span> опыт,
          который оставляет <span className={styles.blue}>лучшие</span>{" "}
          воспоминания
        </h2>
        <div className={styles.title}>
        <Title children={"новости"} />
        </div>
      </div>
  );
};

export default NewsDecor;
