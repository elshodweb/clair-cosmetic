import React, { FC, useState } from "react";
import styles from "./PhoneVerification.module.scss";
import Image from "next/image";
import IconButton from "../../../UI/buttons/iconButton/IconButton";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setPhoneVerificationVisible } from "@/store/auth/authSlice";
import BlackButton from "@/components/UI/buttons/blackButton/BlackButton";
import CountdownTimer from "@/components/UI/timer/Timer";

interface PhoneVerificationProps {
  visible: boolean;
  onClose: () => void;
}

const PhoneVerification: FC<PhoneVerificationProps> = ({
  visible,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const phoneNumber = "+7 000 000-00-00"; // Должно быть передано через пропсы или глобальное состояние
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [againBtnShow, setAgainBtnShow] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState(false);

  const handleVerification = async () => {
    try {
      console.log({ verification_code: verificationCode });
      const response = await axios.post(
        "https://ba745807670a.vps.myjino.ru/api/v1/auth/verify_phone/",
        {
          verification_code: verificationCode,
          phone_number: phoneNumber,
        }
      );
      console.log(response);

      // Закрываем модальное окно при успешном подтверждении
      dispatch(setPhoneVerificationVisible(false));
    } catch (error) {
      setIsWrong(true);
      console.error("Ошибка при подтверждении номера:", error);
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
            Неправильный код
          </h5>
          {!isWrong && (
            <p className={styles.subtitle}>
              Введите код, который мы отправили на номер{" "}
              <strong className={styles.phone}>{phoneNumber}</strong>
            </p>
          )}
          <input
            className={`${styles.input} ${isWrong ? styles.errorInput : ""}`}
            type="text"
            placeholder="Код подтверждения"
            value={verificationCode}
            onChange={(e) => {
              setVerificationCode(e.target.value);
              setIsWrong(false);
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
              onClick={() => setAgainBtnShow(false)}
            >
              Выслать код еще раз
            </BlackButton>
          ) : (
            <div className={styles.resend}>
              Выслать письмо повторно через{" "}
              <CountdownTimer
                finish={() => setAgainBtnShow(true)}
                initialTime={30}
              ></CountdownTimer>{" "}
              секунд
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneVerification;
