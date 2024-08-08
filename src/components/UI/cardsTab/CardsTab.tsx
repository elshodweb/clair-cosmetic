import styles from "./CardsTab.module.scss";
import { FC, useState, useEffect } from "react";
interface TabProps {
  data: any;
  filterListener?: (id: string) => void;
  selectedCategory: string | null;
}
const CardsTab: FC<TabProps> = ({ data, filterListener, selectedCategory }) => {
  const filterHandler = (title: string) => {
    filterListener && filterListener(title);
  };

  return (
    <div className={styles.container}>
      {data.map((item: any) => (
        <button
          key={item.id}
          style={{
            backgroundColor: `${
              item.id === selectedCategory ? "#1B1B1A" : "transparent"
            }`,
            color: `${item.id === selectedCategory ? "#fff" : "#000"}`,
          }}
          className={styles.filter_item}
          onClick={() => {
            filterHandler(item.id);
          }}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default CardsTab;
