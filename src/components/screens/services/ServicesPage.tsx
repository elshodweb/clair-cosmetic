import React from "react";
import style from "./ServicesPage.module.scss";
import Loyaut from "@/components/loyaut/Loyaut";
import Title from "@/components/UI/title/Title";
import SwiperComp from "@/components/UI/slider/SwiperComp";
import ServiceCard from "../../UI/serviceCard/ServiceCard";
import Filters from "./filters/Filters";

const ServicesPage = () => {
  return (
    <div className={style.wrapper}>
      <Loyaut>
        <div className={style.title}>
          <Title>Услуги</Title>
        </div>
        <div className={style.slider}>
          <SwiperComp />
        </div>
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

export default ServicesPage;
