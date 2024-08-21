import React, { FC, useState, useEffect } from "react";
import styles from "./ChooseMaster.module.scss";
import Image from "next/image";
import IconButton from "../../../UI/buttons/iconButton/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  setChooseMassterVisible,
  setConfirmMassterVisible,
  setMaster,
  setMasterId,
  setSalonChooseVisible,
} from "@/store/booking/bookingSlice";
import SelectCard from "@/components/UI/selectCard/SelectCard";
import BlackButton from "@/components/UI/buttons/blackButton/BlackButton";
import instance from "@/utils/axiosInstance";
const ChooseMaster: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isChooseMassterVisible, service, salonId,salon, masterId } = useSelector(
    (state: RootState) => state.booking
  );
  
  const [masters, setMasters] = useState<any>();
  useEffect(() => {
    async function fetchMasters() {
      
      let url = "/staffs/";
      if (salonId) {
        url += "?salon_ids=" + salonId;
      }
      const response = await instance.get(url);
      if (response.data.results.length > 0) {
        setMasters(response.data.results);
      }
    }
    fetchMasters();
  }, [dispatch, salonId, service]);

  function setSelectedOption(id: string | null) {
    dispatch(setMasterId(id));
    if (masters?.length > 0) {
      dispatch(
        setMaster(
          masters?.filter((i: any) => i.id == id)?.[0]
            ? masters?.filter((i: any) => i.id == id)?.[0]
            : {
                id: null,
                name: "Любой мастер",
                specialization: { title: "Мы сами выберем мастера" },
                avatar: "/images/profile/profile.png",
              }
        )
      );
    }
  }

  return (
    <div
      className={`${styles.wrapper} ${
        isChooseMassterVisible ? styles.opened : ""
      }`}
    >
      <div className={styles.content}>
        <div className={styles.top}>
          <button
            onClick={() => {
              dispatch(setSalonChooseVisible(true));
              dispatch(setChooseMassterVisible(false));
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
              dispatch(setChooseMassterVisible(false));
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
        <h5 className={styles.subtitle}>Выбор мастера</h5>
        <h5 className={styles.nameService}>{service?.title}</h5>
        <SelectCard
          selectedOptino={masterId}
          id={null}
          img="/images/profile/profile.png"
          title="Любой мастер"
          subTitle="Мы сами выберем мастера"
          onSelect={setSelectedOption}
        />

        <hr className={styles.hr} />
        {masters?.length > 0 ? (
          masters.map((i: any) => (
            <SelectCard
              key={i.id}
              selectedOptino={masterId}
              id={i.id}
              title={i.name}
              subTitle={i?.specialization?.title}
              img={i.avatar}
              onSelect={setSelectedOption}
            />
          ))
        ) : (
          <h5 className={styles.subtitle}>Нет мастер для этого услуга</h5>
        )}
        <BlackButton
          onClick={() => {
            dispatch(setChooseMassterVisible(false));
            dispatch(setConfirmMassterVisible(true));
          }}
          className={styles.btnMain}
        >
          Подтвердить выбор мастера
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
          <Image
            alt="icon"
            width={18}
            height={18}
            src={"/images/UI/phone.svg"}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default ChooseMaster;
