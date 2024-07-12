import React from "react";
import Dropdown from "../Dropdown/Dropdown";
import Btn from "../Btn/Btn";
import styles from './Filters.module.scss'
const Filters = () => {
  return (
    <div className={styles.row}>
      <Dropdown />
      <Btn children={"Скидки"} />
      <Btn children={"Тип продукта"} />
      <Dropdown />
    </div>
  );
};

export default Filters;
