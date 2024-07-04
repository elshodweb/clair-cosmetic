import React from "react";
import style from "./MastersPage.module.scss";
import Loyaut from "@/components/loyaut/Loyaut";
import Title from "@/components/UI/title/Title";
import SwiperComp from "@/components/UI/slider/SwiperComp";
import Filters from "@/components/UI/filters/Filters";
import ServiceCard from "./components/ServiceCard";

const MastersPage = () => {
  return (
    <div className={style.wrapper}>
      <Loyaut>
        <Title>Услуги</Title>
        <SwiperComp />
        <div className={style.row}>
          <div className={style.filters}>
            <Filters />
          </div>
          <div className={style.list}>
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
          </div>
        </div>
      </Loyaut>
    </div>
  );
};

export default MastersPage;
