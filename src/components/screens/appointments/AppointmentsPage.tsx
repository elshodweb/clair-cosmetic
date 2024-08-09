import React from "react";
import styles from "./AppointmentsPage.module.scss";
import Loyaut from "@/components/loyaut/Loyaut";
import BackBtn from "@/components/UI/backBtn/BackBtn";
import Title from "@/components/UI/title/Title";
import SmallTitle from "@/components/UI/smallTitle/SmallTitle";
import { useRouter } from "next/router";
import NoteFullCard from "../account/noteFullCard/NoteFullCard";
const AppointmentsPage = () => {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <Loyaut>
        <div className={styles.content}>
          <BackBtn
            onClick={() => {
              router.push("/account");
            }}
          />
          <Title className={styles.title}>Все записи</Title>
          <div className={styles.column}>
            <SmallTitle className={styles.smallTitle}>Будет</SmallTitle>
            <div className={styles.notes}>
              <NoteFullCard />
              <NoteFullCard />
              <NoteFullCard />
            </div>
          </div>
          <div className={styles.column}>
            <SmallTitle className={styles.smallTitle}>Было</SmallTitle>
            <div className={styles.notes}>
              <NoteFullCard />
              <NoteFullCard />
              <NoteFullCard />
            </div>
          </div>
        </div>
      </Loyaut>
    </div>
  );
};

export default AppointmentsPage;
