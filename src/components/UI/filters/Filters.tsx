import React from "react";
import styles from "./Filters.module.scss";
import FilterMenu from "../filterMenu/FilterMenu";
import CardsTab from "../cardsTab/CardsTab";
import MyTabs from "../myTabs/MyTabs";
const data = [
  { title: "Тело" },
  { title: "Ногти" },
  { title: "Волосы" },
  { title: "Лицо" },
];
const tabs = [
  { id: 1, title: "Эстетическая косметология" },
  { id: 2, title: "Терапевтическая косметология" },
  { id: 3, title: "Перманентный макиях" },
  { id: 4, title: "Уход за ресницами" },
  { id: 5, title: "Уход за бровями" },
  { id: 6, title: "Makeup" },
  { id: 7, title: "Пирсинг" },
];
const Filters = () => {
  function tabfunc(title: string) {}
  return (
    <div className={styles.wrapper}>
      <input className={styles.input} type="text" placeholder="Поиск" />
      <FilterMenu data={data} filterListener={tabfunc} />
      <div className={styles.tabs}>
        <CardsTab data={tabs} />
      </div>
    </div>
  );
};

export default Filters;
