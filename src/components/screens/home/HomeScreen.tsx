import React from "react";
import style from "./HomeScreen.module.scss";
import Loyaut from "@/components/loyaut/Loyaut";
import Title from "@/components/UI/title/Title";
import SwiperComp from "@/components/UI/slider/SwiperComp";
import AccordionUsage from "@/components/UI/accordion/MyAccordion";
import ArrowLink from "@/components/UI/arrowLink/ArrowLink";
import MyTabs from "@/components/UI/myTabs/MyTabs";

const dataShops = [
  { title: "Персональные предложения" },
  { title: "Акции" },
  { title: "Новинки" },
  { title: "Подборки" },
  { title: "Уход за волосами" },
];
const HomeScreen = () => {
  function filterListener(params: string) {
    console.log(params);
  }
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
          <ArrowLink href="/">Посмотреть магазин</ArrowLink>
        </div>
        <div className={style.shop}>
          <div className={style.row}>
            <Title>магазин</Title>
            <MyTabs filterListener={filterListener} data={dataShops} />
          </div>
        </div>
      </Loyaut>
    </div>
  );
};

export default HomeScreen;
