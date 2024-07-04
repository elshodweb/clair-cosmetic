import React from "react";
import style from "./HomeScreen.module.scss";
import Loyaut from "@/components/loyaut/Loyaut";
import Title from "@/components/UI/title/Title";
import SwiperComp from "@/components/UI/slider/SwiperComp";
import AccordionUsage from "@/components/UI/accordion/MyAccordion";
import ArrowLink from "@/components/UI/arrowLink/ArrowLink";
import MyTabs from "@/components/UI/myTabs/MyTabs";
import ShopCards from "@/components/UI/cards/shopCards/ShopCards";
import MasterContainer from "@/components/UI/masters/MasterContainer/MasterContainer";
import NewsDecor from "@/components/UI/news/NewsDecor/NewsDecor";
import NewsCards from "@/components/UI/news/NewsCards/NewsCards";
import Salon from "@/components/UI/salon/Salon";

const dataShops = [
  { title: "Персональные предложения" },
  { title: "Акции" },
  { title: "Новинки" },
  { title: "Подборки" },
  { title: "Уход за волосами" },
];

const dataMasters = [
  { title: "Персональные предложения" },
  { title: "Избранное" },
  { title: "Стайлинг" },
  { title: "Визажисты" },
  { title: "Парикмахеры" },
];
const HomeScreen = () => {
  function filterListener(params: string) {
    console.log(params);
  }
  function filterListenerMaster(params: string) {
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
          <ShopCards />
          <ArrowLink href="/" children="Посмотреть магазин" />
        </div>
        <div className={style.masters}>
          <div className={style.row}>
            <Title>мастера</Title>
            <MyTabs filterListener={filterListenerMaster} data={dataMasters} />
          </div>
          <MasterContainer />
          <ArrowLink href="/" children="Все мастера" />
        </div>
        <div className={style.masters}>
          <NewsDecor />
          <NewsCards />
          <ArrowLink href="/" children="Все новости" />
        </div>
        <div className={style.salon}>
          <Title>салоны</Title>
          <Salon />
        </div>
      </Loyaut>
    </div>
  );
};

export default HomeScreen;
