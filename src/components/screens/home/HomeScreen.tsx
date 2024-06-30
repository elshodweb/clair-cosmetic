import React from "react";
import style from "./HomeScreen.module.scss";
import Loyaut from "@/components/loyaut/Loyaut";
import Title from "@/components/UI/title/Title";
import SwiperComp from "@/components/slider/SwiperComp";
import AccordionUsage from "@/components/accordion/MyAccordion";

const HomeScreen = () => {
  return (
    <div className={style.wrapper}>
      <Loyaut>
        <div className={style.hi}>
          <Title>
            <span>СЕГОДНЯ ТЫ</span>
            <span className={style.space}>ПРЕКРАСНА</span>
          </Title>
        </div>
        <div className={style.trends}>
          <SwiperComp />
        </div>
        <div className={style.services}>
          <Title>Услуги</Title>
          <AccordionUsage />
        </div>
      </Loyaut>
    </div>
  );
};

export default HomeScreen;
