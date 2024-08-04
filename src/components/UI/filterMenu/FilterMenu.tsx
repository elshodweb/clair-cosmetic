import styles from "./Filter.module.scss";
import { FC, useState } from "react";

interface props {
  data: Array<{ title: string }>;
  filterListener?: (title: string) => void;
}

const FilterMenu: FC<props> = ({ data, filterListener }) => {
  const [currentFilter, setCurentFilter] = useState(0);
  const changeFilter = (index: number) => {
    setCurentFilter(index);
  };
  const filterHandler = (title: string) => {
    filterListener && filterListener(title);
  };

  return (
    <div className={styles.container}>
      {data.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              backgroundColor: `${
                index == currentFilter ? "#1B1B1A" : "transparent"
              }`,
              color: `${index == currentFilter ? "#fff" : "#000"}`,
            }}
            className={styles.filter_item}
            onClick={() => {
              changeFilter(index), filterHandler(item.title);
            }}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
};

export default FilterMenu;
