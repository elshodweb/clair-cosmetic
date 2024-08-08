import styles from "./Filter.module.scss";
import { FC } from "react";

interface props {
  currentCategory: string;
  data: any;
  filterListener?: (slug: string) => void;
}

const FilterMenu: FC<props> = ({ data, filterListener, currentCategory }) => {
  const filterHandler = (slug: string) => {
    filterListener && filterListener(slug);
  };

  return (
    <div className={styles.container}>
      {data.map((item: any) => {
        return (
          <div
            key={item.slug}
            style={{
              backgroundColor: `${
                item.slug == currentCategory ? "#1B1B1A" : "transparent"
              }`,
              color: `${item.slug == currentCategory ? "#fff" : "#000"}`,
            }}
            className={styles.filter_item}
            onClick={() => {
              filterHandler(item.slug);
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
