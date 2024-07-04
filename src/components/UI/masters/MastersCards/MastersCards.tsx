import React from "react";
import MasterItem from "../MasterItem/MasterItem";
import styles from "./MastersCards.module.scss";
const data = [
  {
    id: 1,
    name: "Светлана",
    isLiked: true,
    profession: "Мастер по маникюру",
    img: "/images/masters/master.png",
  },
  {
    id: 2,
    name: "Анастасия",
    isLiked: false,
    profession: "Визажист",
    img: "/images/masters/master.png",
  },
  {
    id: 3,
    name: "Ксения",
    isLiked: false,
    profession: "Стилист",
    img: "/images/masters/master.png",
  },
  {
    id: 4,
    name: "Юрий",
    isLiked: false,
    profession: "Парикмахер",
    img: "/images/masters/master.png",
  },
  {
    id: 5,
    name: "Юрий",
    isLiked: false,
    profession: "Парикмахер",
    img: "/images/masters/master.png",
  },
  {
    id: 6,
    name: "Юрий",
    isLiked: false,
    profession: "Парикмахер",
    img: "/images/masters/master.png",
  },
];
const MastersCards = () => {
  return (
    <div className={styles.row}>
      {data.map((i) => (
        <MasterItem data={i} />
      ))}
    </div>
  );
};

export default MastersCards;
