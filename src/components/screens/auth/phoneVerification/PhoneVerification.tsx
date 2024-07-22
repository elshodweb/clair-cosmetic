import React, { FC, useState } from "react";
import styles from "./PhoneVerification.module.scss";
import Image from "next/image";
import IconButton from "../../../UI/buttons/iconButton/IconButton";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  setFinishedModalVisible,
  setPhoneVerificationVisible,
} from "@/store/auth/authSlice";
import BlackButton from "@/components/UI/buttons/blackButton/BlackButton";
import CountdownTimer from "@/components/UI/timer/Timer";
import { IRegisterData } from "../Auth";
import instance from "@/utils/axiosInstance";

interface PhoneVerificationProps {
  visible: boolean;
  onClose: () => void;
  registerData: IRegisterData;
}

const PhoneVerification: FC<PhoneVerificationProps> = ({
  visible,
  onClose,
  registerData,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [verificationCode, setVerificationCode] = useState<string>("");
  const [againBtnShow, setAgainBtnShow] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState("");

  const handleVerification = async () => {
    try {
      console.log({
        ...registerData,
        confirmation_code: verificationCode,
      });

      const response = await instance.post("/users/", {
        ...registerData,
        // last_name: "string",
        // first_name: "asasd",
        // second_name: "string",
        // full_name: null,
        confirmation_code: verificationCode,
      });
      dispatch(setPhoneVerificationVisible(false));
      dispatch(setFinishedModalVisible(true));
    } catch (error: any) {
      setIsWrong(
        error?.response?.data?.errors?.[0]?.message ||
          "Ошибка при подтверждении номера, попробуйте заново"
      );
    }
  };

  return (
    <div className={`${styles.wrapper} ${visible ? styles.opened : ""}`}>
      <div className={styles.content}>
        <div className={styles.top}>
          <button onClick={onClose} className={styles.back}>
            <Image
              src={"/images/UI/arrow.svg"}
              width={56}
              height={10}
              alt={"arrow"}
            />
          </button>
          <IconButton className={styles.btn} onClick={onClose}>
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
              <strong className={styles.phone}>
                {registerData.phone_number}
              </strong>
            </p>
          )}
          <input
            className={`${styles.input} ${isWrong ? styles.errorInput : ""}`}
            type="text"
            placeholder="Код подтверждения"
            value={verificationCode}
            onChange={(e) => {
              setVerificationCode(e.target.value);
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
          {againBtnShow ? (
            <BlackButton
              className={styles.blackBtn}
              onClick={async () => {
                setAgainBtnShow(false)
                await instance.post("/users/", {
                  ...registerData,
                  // confirmation_code: verificationCode,
                });
              }}
            >
              Выслать код еще раз
            </BlackButton>
          ) : (
            <div className={styles.resend}>
              Выслать письмо повторно через{" "}
              <CountdownTimer
                finish={() => setAgainBtnShow(true)}
                initialTime={303}
              ></CountdownTimer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneVerification;
