import React from "react";
import style from "./MastersPage.module.scss";
import Loyaut from "@/components/loyaut/Loyaut";
import Title from "@/components/UI/title/Title";
import Filters from "@/components/UI/filters/Filters";
import MastersCards from "@/components/UI/masters/MastersCards/MastersCards";

const MastersPage = () => {
  return (
    <div className={style.wrapper}>
      <Loyaut>
        <div className={style.title}>
          <Title>Мастера</Title>
        </div>
        <div className={style.row}>
          <div className={style.filters}>
            <Filters />
          </div>
          <div className={style.list}>
            <MastersCards />
          </div>
        </div>
      </Loyaut>
    </div>
  );
};

export default MastersPage;
