import React from "react";
import styles from "./AppointmentsPage.module.scss";
import Loyaut from "@/components/loyaut/Loyaut";
import BackBtn from "@/components/UI/backBtn/BackBtn";
import Title from "@/components/UI/title/Title";
import SmallTitle from "@/components/UI/smallTitle/SmallTitle";
const AppointmentsPage = () => {
  return (
    <div className={styles.wrapper}>
      <Loyaut>
        <div className={styles.content}>
          <BackBtn />
          <Title className={styles.title}>Все записи</Title>
          <div className={styles.column}>
            <SmallTitle className={styles.smallTitle}>Будет</SmallTitle>
          </div>
        </div>
      </Loyaut>
    </div>
  );
};

export default AppointmentsPage;
