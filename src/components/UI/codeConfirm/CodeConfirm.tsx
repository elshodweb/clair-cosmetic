import React, { FC, useState, useEffect } from "react";
import styles from "./CodeConfirm.module.scss";
import Image from "next/image";
import IconButton from "../buttons/iconButton/IconButton";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setCodeConfirmVisible } from "@/store/auth/authSlice";
import BlackButton from "@/components/UI/buttons/blackButton/BlackButton";
import { http } from "@/utils/axiosInstance";

const CodeConfirm: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isCodeConfirmVisible } = useSelector(
    (state: RootState) => state.auth
  );

  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isWrong, setIsWrong] = useState("");

  const handleVerification = async () => {
    try {
      const response = await http.post("/users/confirm/", {
        confirmation_code: verificationCode,
      });
      if (response.status < 300) {
        dispatch(setCodeConfirmVisible(false));
      }
    } catch (error: any) {
      setIsWrong(
        error?.response?.data?.errors?.[0]?.message ||
          "Ошибка при подтверждении номера, попробуйте заново"
      );
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${
        isCodeConfirmVisible ? styles.opened : ""
      }`}
    >
      <div className={styles.content}>
        <div className={styles.top}>
          <button
            onClick={() => {
              dispatch(setCodeConfirmVisible(false));
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
              dispatch(setCodeConfirmVisible(false));
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
        <Image
          className={styles.rainBow}
          src={"/images/authModals/thunder.png"}
          alt="cart"
          width={399}
          height={150}
        />
        <h2 className={styles.hi}>ПОДТВЕРДИТЕ НОМЕР</h2>
        <div className={styles.mob}>
          <h5 className={`${styles.error} ${isWrong ? styles.show : ""}`}>
            {isWrong}
          </h5>
          {!isWrong && (
            <p className={styles.subtitle}>
              Введите код, который мы отправили на номер{" "}
              <strong className={styles.phone}></strong>
            </p>
          )}
          <input
            className={`${styles.input} ${isWrong ? styles.errorInput : ""}`}
            type="text"
            placeholder="Код подтверждения"
            value={verificationCode}
            onChange={(e) => {
              setVerificationCode(e.currentTarget.value);
              setIsWrong("");
            }}
          />
          <BlackButton
            disabled={!!(!verificationCode ? true : false)}
            className={styles.blackBtn}
            onClick={handleVerification}
          >
            Подтвердить
          </BlackButton>
        </div>
      </div>
    </div>
  );
};

export default CodeConfirm;
