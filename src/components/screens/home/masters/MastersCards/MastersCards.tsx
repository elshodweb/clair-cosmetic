import React, { useEffect, useState } from "react";
import MasterItem from "../MasterItem/MasterItem";
import styles from "./MastersCards.module.scss";
import MasterModal from "@/components/UI/masterModal/MasterModal";
const data = [
  {
    id: 1,
    name: "Светлана",
    isLiked: true,
    profession: "Мастер по маникюру",
    avatar: "/images/masters/master.png",
  },
  {
    id: 2,
    name: "Анастасия",
    isLiked: false,
    profession: "Визажист",
    avatar: "/images/masters/master.png",
  },
  {
    id: 3,
    name: "Ксения",
    isLiked: false,
    profession: "Стилист",
    avatar: "/images/masters/master.png",
  },
  {
    id: 4,
    name: "Юрий",
    isLiked: false,
    profession: "Парикмахер",
    avatar: "/images/masters/master.png",
  },
  {
    id: 5,
    name: "Юрий",
    isLiked: false,
    profession: "Парикмахер",
    avatar: "/images/masters/master.png",
  },
  {
    id: 6,
    name: "Юрий",
    isLiked: false,
    profession: "Парикмахер",
    avatar: "/images/masters/master.png",
  },
];
const MastersCards = () => {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (id !== null) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [id]);

  return (
    <div className={styles.row}>
      {data.map((i) => (
        <MasterItem key={i.id} setMaster={setId} data={i} />
      ))}
      <MasterModal id={id} setMaster={setId} />
    </div>
  );
};

export default MastersCards;
