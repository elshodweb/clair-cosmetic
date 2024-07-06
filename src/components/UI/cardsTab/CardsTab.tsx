import styles from "./CardsTab.module.scss";
import { FC, useState, useEffect } from "react";
interface TabProps {
  data: Array<{ title: string }>;
  filterListener?: (title: string) => void;
}
const CardsTab: FC<TabProps> = ({ data, filterListener }) => {
  const [currentFilter, setCurentFilter] = useState(3);

  const changeFilter = (index: number) => {
    setCurentFilter(index);
  };

  const filterHandler = (title: string) => {
    filterListener && filterListener(title);
  };

  return (
    <div className={styles.container}>
      {data.map((item, index) => (
        <button
          key={index}
          style={{
            backgroundColor: `${index === currentFilter ? "#1B1B1A;" : ";"}`,
            color: `${index === currentFilter ? "#fff;" : ";"}`,
          }}
          className={styles.filter_item}
          onClick={() => {
            changeFilter(index);
            filterHandler(item.title);
          }}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default CardsTab;
