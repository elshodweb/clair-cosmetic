import React, { FC } from "react";
import styles from "./SelectService.module.scss";
import MyInput from "@/components/UI/myInput/MyInput";
import BlackArrowButton from "@/components/UI/buttons/blackArrowButton/BlackArrowButton";
const SelectService: FC<any> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.descr}>{data.description}</p>
      <div className={styles.basket}>
        <div className={styles.selects}>
          {data.services_at_same_time.length > 0 &&
            data.services_at_same_time
              .slice(0, 8)
              .map((i: any, index: number) => (
                <MyInput
                  key={index}
                  name={i.title}
                  price={i.price}
                  description={i.description}
                  onChange={(i: any) => {}}
                />
              ))}
        </div>
        <BlackArrowButton>Добавить в корзину</BlackArrowButton>
      </div>
    </div>
  );
};

export default SelectService;
