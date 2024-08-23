import React, { FC, useState } from "react";
import styles from "./PaymentModal.module.scss";
import Link from "next/link";
import BlackButton from "../../UI/buttons/blackButton/BlackButton";
import Image from "next/image";
import IconButton from "../../UI/buttons/iconButton/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  setAuth,
  setLoginVisible,
  setRegisterVisible,
} from "@/store/auth/authSlice";
import instance from "@/utils/axiosInstance";
import {
  setBasketVisible,
  setPaymentVisible,
} from "@/store/basket/basketSlice";
import FilterMenu from "@/components/screens/SingleShop/filterMenu/FilterMenu";

const PaymentModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [FIO, setFIO] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [adress, setAdress] = useState<string>("");

  const [isWrong, setIsWrong] = useState(false);
  const { isPaynentVisible } = useSelector((state: RootState) => state.basket);
  const [typePayment, setTypePaymnet] = useState("Курьером");
  function onClose() {
    dispatch(setPaymentVisible(false));
  }
  const handlePayment = async () => {
    try {
      // const response = await instance.post("***", {
      //   phone_number: FIO,
      // });

      dispatch(setPaymentVisible(false));
    } catch (error) {}
  };

  return (
    <div
      className={`${styles.wrapper} ${isPaynentVisible ? styles.opened : ""}`}
    >
      <div className={styles.content}>
        <div className={styles.top}>
          <button
            onClick={() => {
              onClose();
              dispatch(setBasketVisible(true));
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
          <IconButton className={styles.btn} onClick={() => onClose()}>
            <Image
              src={"/images/header/cross.svg"}
              alt="cart"
              width={16}
              height={19}
            />
          </IconButton>
        </div>
        <Image
          className={styles.rainBow}
          src={"/images/login/rainbow.png"}
          alt="cart"
          width={399}
          height={150}
        />
        <h2 className={styles.hi}>доставка и получатель</h2>
        <FilterMenu
          className={styles.filter}
          currentTab={typePayment}
          onTabChange={(title: any) => setTypePaymnet(title)}
          tabs={[
            {
              title: "Курьером",
            },
            {
              title: "Самовывоз",
            },
          ]}
        />
        <div className={styles.mob}>
          <h5 className={`${styles.error} ${isWrong ? styles.show : ""}`}>
            {}
          </h5>
          <input
            className={`${styles.input} ${isWrong ? styles.errorInput : ""}`}
            type="text"
            placeholder="Фамилия, имя, отчество"
            value={FIO}
            onChange={(e) => {
              setFIO(e.target.value);
              setIsWrong(false);
            }}
          />
          <input
            className={`${styles.input} ${isWrong ? styles.errorInput : ""}`}
            type="text"
            placeholder="Город"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setIsWrong(false);
            }}
          />
          <input
            className={`${styles.input} ${isWrong ? styles.errorInput : ""}`}
            type="text"
            placeholder="Адрес"
            value={adress}
            onChange={(e) => {
              setAdress(e.target.value);
              setIsWrong(false);
            }}
          />
          <div className={styles.overal}>
            <div className={styles.label}>Итого: </div>
            <div className={styles.value}> 8 250 ₽</div>
          </div>
          <BlackButton className={styles.blackBtn} onClick={handlePayment}>
            Оплатить
          </BlackButton>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
