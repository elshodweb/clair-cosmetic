import React, { FC } from "react";
import styles from "./ConfirmMaster.module.scss";
import Image from "next/image";
import IconButton from "../../../UI/buttons/iconButton/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  setChooseMassterVisible,
  setChooseTimeVisible,
  setConfirmMassterVisible,
  setSalonChooseVisible,
} from "@/store/booking/bookingSlice";
import BlackButton from "@/components/UI/buttons/blackButton/BlackButton";
import ChangeBtn from "@/components/UI/buttons/ChangeBtn/ChangeBtn";
import { formatDateTime } from "@/utils/formatData";
import { http } from "@/utils/axiosInstance";
import { setBasketVisible, switchBasket } from "@/store/basket/basketSlice";

const ConfirmMaster: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    isConfirmMassterVisible,
    service,
    time,
    salon,
    salonId,
    masterId,
    master,
  } = useSelector((state: RootState) => state.booking);

  const submitBasket = async () => {
    try {
      await http.post("/services/cart/", {
        service: service.id ? service.id : null,
        salon: salonId ? salonId : null,
        staff: masterId ? masterId : null,
        datetime: time ? time : null,
      });
    } catch (error) {}
  };
  return (
    <div
      className={`${styles.wrapper} ${
        isConfirmMassterVisible ? styles.opened : ""
      }`}
    >
      <div className={styles.content}>
        <div className={styles.top}>
          <button
            onClick={() => {
              dispatch(setConfirmMassterVisible(false));
              if (time.length > 0) {
                dispatch(setChooseTimeVisible(true));
              } else {
                dispatch(setChooseMassterVisible(true));
              }
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
              dispatch(setConfirmMassterVisible(false));
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
        <h5 className={styles.subtitle}>Проверьте себя</h5>
        {service && (
          <div className={styles.service}>
            <div className={styles.serviceName}>{service.title}</div>
            <div className={styles.servicePrice}>{service.price_min}₽</div>
          </div>
        )}
        <div className={styles.timeWrapper}>
          <div className={styles.time}>
            {time ? formatDateTime(time) : "Выбрать время"}
          </div>
          {/* <button className={styles.removeBtn}>
            <Image
              width={20}
              height={20}
              alt="trash"
              src={"/images/shop/trash.svg"}
            />
          </button> */}
        </div>
        <hr className={styles.hr} />
        {master && (
          <div className={styles.materWrapper}>
            <div className={styles.masterImg}>
              {master?.avatar && (
                <Image
                  src={master?.avatar}
                  alt="option"
                  width={80}
                  height={110}
                />
              )}
            </div>
            <div className={styles.masterDetails}>
              <div className={styles.masterName}>{master.name}</div>
              <div className={styles.masterProf}>
                {master?.specialization?.title}
              </div>
              <ChangeBtn
                onClick={() => {
                  dispatch(setConfirmMassterVisible(false));
                  dispatch(setChooseMassterVisible(true));
                }}
              />
              {/* <button className={styles.removeBtn}>
                <Image
                  width={20}
                  height={20}
                  alt="trash"
                  src={"/images/shop/trash.svg"}
                />
              </button> */}
            </div>
          </div>
        )}
        <hr className={styles.hr} />
        {salon && (
          <div className={styles.materWrapper}>
            <div className={styles.masterImg}>
              {salon?.images?.[0] && (
                <Image
                  src={salon?.images[0]}
                  alt="option"
                  width={80}
                  height={110}
                />
              )}
            </div>
            <div className={styles.masterDetails}>
              <div className={styles.masterName}>{salon.name}</div>
              <div className={styles.masterProf}>{salon.city}</div>
              <ChangeBtn
                onClick={() => {
                  dispatch(setConfirmMassterVisible(false));
                  dispatch(setSalonChooseVisible(true));
                }}
              />
            </div>
          </div>
        )}

        <h4 className={styles.overall}>
          <span>Итого:</span>
          <span>{service.price_min}₽</span>
        </h4>
        <BlackButton
          onClick={() => {
            dispatch(setConfirmMassterVisible(false));
            if (time.length > 0) {
              submitBasket();
              dispatch(setBasketVisible(true));
              dispatch(switchBasket("Услуги"));
            } else {
              dispatch(setChooseTimeVisible(true));
            }
          }}
          className={styles.btnMain}
        >
          Выбрать дату и время
        </BlackButton>
        <div className={styles.line}>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default ConfirmMaster;