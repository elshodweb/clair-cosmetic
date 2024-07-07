import React from "react";
import styles from "./SingleServicePage.module.scss";
import Title from "@/components/UI/title/Title";
import SelectService from "./selectService/SelectService";
import Loyaut from "@/components/loyaut/Loyaut";
import SmallTitle from "@/components/UI/smallTitle/SmallTitle";
import Masters from "./masters/Masters";
import TakeAway from "./takeAway/TakeAway";
import ArrowLink from "@/components/UI/arrowLink/ArrowLink";
import TakeHome from "./takeHome/TakeHome";
const SingleServicePage = () => {
  return (
    <div className={styles.wrapper}>
      <Loyaut>
        <h3 className={styles.subtitle}>Эстетическая косметология</h3>
        <Title children={"УХОДЫ ЗА ЛИЦОМ"} />
        <SelectService />
        <div className={styles.masters}>
          <SmallTitle>Кто делает</SmallTitle>
          <Masters />
        </div>
        <div className={styles.take}>
          <SmallTitle>Возьми вместе</SmallTitle>
          <TakeAway />
          <ArrowLink children="Все услуги" href="/services" />
        </div>
        <div className={styles.take}>
          <SmallTitle>Возьми домой</SmallTitle>
          <TakeHome />
          <ArrowLink children="Магазин" href="/shop" />
        </div>
        
      </Loyaut>
    </div>
  );
};

export default SingleServicePage;
