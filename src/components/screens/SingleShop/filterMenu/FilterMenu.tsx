import styles from "./Filter.module.scss";
import { FC } from "react";

interface Tab {
  title: string;
}

interface FilterMenuProps {
  currentTab: string;
  tabs: Tab[];
  onTabChange: (title: string) => void;
}

const FilterMenu: FC<FilterMenuProps> = ({ tabs, onTabChange, currentTab }) => {
  const handleTabChange = (title: string) => {
    onTabChange(title);
  };

  return (
    <div className={styles.container}>
      {tabs.map((tab) => (
        <div
          key={tab.title}
          style={{
            backgroundColor: tab.title === currentTab ? "#1B1B1A" : "transparent",
            color: tab.title === currentTab ? "#fff" : "#000",
          }}
          className={styles.filter_item}
          onClick={() => handleTabChange(tab.title)}
        >
          {tab.title}
        </div>
      ))}
    </div>
  );
};

export default FilterMenu;
