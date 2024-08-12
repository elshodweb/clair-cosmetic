import React from "react";
import styles from "./HistoryPage.module.scss";
import Loyaut from "@/components/loyaut/Loyaut";
import BackBtn from "@/components/UI/backBtn/BackBtn";
import Title from "@/components/UI/title/Title";
import SmallTitle from "@/components/UI/smallTitle/SmallTitle";
import { useRouter } from "next/router";
import ProductHistoryCard from "./productHistoryCard/ProductHistoryCard";

const HistoryPage = () => {
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
          <Title className={styles.title}>Мои заказы</Title>
          <div className={styles.column}>
            <SmallTitle className={styles.smallTitle}>Мои заказы</SmallTitle>
            <div className={styles.notes}>
              <ProductHistoryCard />
              <ProductHistoryCard />
              <ProductHistoryCard />
            </div>
          </div>
          <div className={styles.column}>
            <SmallTitle className={styles.smallTitle}>Было</SmallTitle>
            <div className={styles.notes}>
              <ProductHistoryCard />
              <ProductHistoryCard />
              <ProductHistoryCard />
            </div>
          </div>
        </div>
      </Loyaut>
    </div>
  );
};

export default HistoryPage;
