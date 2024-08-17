import React, { FC, useState, useEffect } from "react";
import styles from "./ChooseSalon.module.scss";
import Image from "next/image";
import IconButton from "../../../UI/buttons/iconButton/IconButton";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setSalonChooseVisible } from "@/store/booking/bookingSlice";
const ChooseSalon: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isSalonChooseVisible } = useSelector(
    (state: RootState) => state.booking
  );

  return (
    <div
      className={`${styles.wrapper} ${
        isSalonChooseVisible ? styles.opened : ""
      }`}
    >
      <div className={styles.content}>
        <div className={styles.top}>
          <button
            onClick={() => {
              dispatch(setSalonChooseVisible(false));
            }}
            className={styles.back}
          >
            <Image
              src={"/images/UI/arrow.svg"}
              width={56}
              height={10}
              alt={"arrow"}
            />
          </button>
          <IconButton
            className={styles.btn}
            onClick={() => {
              dispatch(setSalonChooseVisible(false));
            }}
          >
            <Image
              src={"/images/header/cross.svg"}
              alt="cross"
              width={16}
              height={19}
            />
          </IconButton>
        </div>
        <h4 className={styles.title}>Онлайн-запись </h4>
        <h5 className={styles.subtitle}>Выбор салона</h5>
            
      </div>
    </div>
  );
};

export default ChooseSalon;
