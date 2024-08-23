import React, { FC, useState } from "react";
import styles from "./FinishedBooking.module.scss";
import ModalWrapper from "@/components/UI/modalWrapper/ModalWrapper";
import Image from "next/image";
import BlackButton from "@/components/UI/buttons/blackButton/BlackButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setLoginVisible } from "@/store/auth/authSlice";
import { setFinishing } from "@/store/booking/bookingSlice";
import IconButton from "@/components/UI/buttons/iconButton/IconButton";
import { setBasketVisible } from "@/store/basket/basketSlice";
import OutlineButton from "@/components/UI/buttons/outlineButton/OutlineButton";
import { useRouter } from "next/router";

const FinishedBooking = () => {
  const { finishing } = useSelector((state: RootState) => state.booking);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useRouter();

  function onClose() {
    dispatch(setFinishing(false));
  }
  return (
    <div className={styles.wrapper}>
      <ModalWrapper
        children={
          <>
            <div onClick={onClose} className={styles.back}>
              <Image
                src={"/images/UI/arrow.svg"}
                width={56}
                height={10}
                alt={"arrow"}
              />
            </div>
            <div className={styles.order}>
              <h2 className={styles.title}>Готово!</h2>
              <Image
                className={styles.img}
                src={"/images/UI/star.png"}
                alt="cart"
                width={399}
                height={150}
              />
            </div>
            <h3 className={styles.subtitle}>
              В ближайшее время с вами свяжется администратор, чтобы подтвердить
              заказ
            </h3>
            <BlackButton
              className={styles.btn}
              onClick={() => {
                onClose();
                dispatch(setBasketVisible(true));
              }}
            >
              Вернуться в корзину
            </BlackButton>
            <OutlineButton
              className={styles.btn}
              onClick={() => {
                onClose();
                navigation.push("/");
              }}
            >
              Перейти на главную
            </OutlineButton>
          </>
        }
        isOpen={finishing}
        setOpen={onClose}
      ></ModalWrapper>
    </div>
  );
};

export default FinishedBooking;
