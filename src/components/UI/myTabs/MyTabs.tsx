import styles from "./MyTabs.module.scss";
import { FC, useState, useEffect } from "react";
interface TabProps {
  data:any[];
  filterListener?: (id: string) => void;
}
const MyTabs: FC<TabProps> = ({ data, filterListener }) => {
  const [currentFilter, setCurentFilter] = useState("");

  const changeFilter = (id: string) => {
    setCurentFilter(id);
  };

  const filterHandler = (id: string) => {
    filterListener && filterListener(id);
  };

  return (
    <div className={styles.container}>
      {data.map((item) => (
        <button
          key={item.id}
          style={{
            backgroundColor: `${item.id === currentFilter ? "#1B1B1A" : "transparent"}`,
            color: `${item.id === currentFilter ? "#fff" : "#000"}`,
          }}
          className={styles.filter_item}
          onClick={() => {
            changeFilter(item.id);
            filterHandler(item.id);
          }}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default MyTabs;
