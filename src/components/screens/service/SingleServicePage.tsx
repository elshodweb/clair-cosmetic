import React from "react";
import styles from "./SingleServicePage.module.scss";
import Title from "@/components/UI/title/Title";
import SelectService from "./selectService/SelectService";
import Loyaut from "@/components/loyaut/Loyaut";
import SmallTitle from "@/components/UI/smallTitle/SmallTitle";
const SingleServicePage = () => {
  return (
    <div className={styles.wrapper}>
      <Loyaut>
        <h3 className={styles.subtitle}>Эстетическая косметология</h3>
        <Title children={"УХОДЫ ЗА ЛИЦОМ"} />
        <SelectService />
        <div className={styles.masters}>
          <SmallTitle>Кто делает</SmallTitle>
          
        </div>
      </Loyaut>
    </div>
  );
};

export default SingleServicePage;
