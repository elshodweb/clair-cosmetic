import React, { FC, useEffect, useState } from "react";
import MasterItem from "../MasterItem/MasterItem";
import styles from "./MastersCards.module.scss";
import MasterModal from "@/components/UI/masterModal/MasterModal";

const MastersCards: FC<{ data: any }> = ({ data }) => {
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
      {data.map((i: any) => (
        <MasterItem key={i.id} setMaster={setId} data={i} />
      ))}
      <MasterModal id={id} setMaster={setId} />
    </div>
  );
};

export default MastersCards;
