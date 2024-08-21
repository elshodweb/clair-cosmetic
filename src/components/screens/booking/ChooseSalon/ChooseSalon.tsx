import React, { FC, useState, useEffect } from "react";
import styles from "./ChooseSalon.module.scss";
import Image from "next/image";
import IconButton from "../../../UI/buttons/iconButton/IconButton";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  setChooseMassterVisible,
  setSalon,
  setSalonChooseVisible,
  setSalonId,
} from "@/store/booking/bookingSlice";
import SelectCard from "@/components/UI/selectCard/SelectCard";
import { fetchSalons } from "@/store/salons/salonSlice";
import BlackButton from "@/components/UI/buttons/blackButton/BlackButton";
const ChooseSalon: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isSalonChooseVisible, service, salonId } = useSelector(
    (state: RootState) => state.booking
  );
  const salons = useSelector((state: RootState) => state.salons.salons);
  const status = useSelector((state: RootState) => state.salons.status);
  function setSelectedOption(id: string | null) {
    dispatch(setSalonId(id));
    dispatch(
      setSalon(
        salons.filter((i) => i.id == id)?.[0]
          ? salons.filter((i) => i.id == id)?.[0]
          : {
              id: null,
              name: "Любой салон",
              city: "Мы сами выберем салон",
              img: null,
            }
      )
    );
  }

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSalons());
    }
  }, [status, dispatch]);

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
        <h5 className={styles.nameService}>{service?.title}</h5>
        <SelectCard
          selectedOptino={salonId}
          id={null}
          title="Любой салон"
          subTitle="Мы сами выберем салон"
          onSelect={setSelectedOption}
        />

        <hr className={styles.hr} />
        {salons.length > 0 &&
          salons.map((i: any) => (
            <SelectCard
              key={i.id}
              selectedOptino={salonId}
              id={i.id}
              title={i.name}
              subTitle={i.city}
              img={i.images[0]}
              onSelect={setSelectedOption}
            />
          ))}
        <BlackButton
          className={styles.btnMain}
          onClick={() => {
            dispatch(setSalonChooseVisible(false));
            dispatch(setChooseMassterVisible(true));
          }}
        >
          Подтвердить выбор салона
        </BlackButton>
        <div className={styles.line}>
          <span></span>
        </div>
        <IconButton
        onClick={() => {
          window.location.href = "tel:+74732029777";
        }}
        className={styles.call}
      >
        <Image alt="icon" width={18} height={18} src={"/images/UI/phone.svg"} />
      </IconButton>
      </div>
    </div>
  );
};

export default ChooseSalon;
