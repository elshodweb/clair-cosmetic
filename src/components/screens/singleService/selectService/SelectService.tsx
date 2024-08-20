import React, { FC } from "react";
import styles from "./SelectService.module.scss";
import MyInput from "@/components/UI/myInput/MyInput";
import BlackArrowButton from "@/components/UI/buttons/blackArrowButton/BlackArrowButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  setSalonChooseVisible,
  setService,
} from "@/store/booking/bookingSlice";

const SelectService: FC<any> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();

  const addToCart = async () => {
    
    dispatch(setService(data));
    dispatch(setSalonChooseVisible(true));
  };

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
        <BlackArrowButton onClick={addToCart}>
          Добавить в корзину
        </BlackArrowButton>
      </div>
    </div>
  );
};

export default SelectService;
