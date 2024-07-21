import React, { FC, useState } from "react";
import styles from "./LoginModal.module.scss";
import Link from "next/link";
import BlackButton from "../../../UI/buttons/blackButton/BlackButton";
import Image from "next/image";
import IconButton from "../../../UI/buttons/iconButton/IconButton";
import axios from "axios"; // Импортируем axios instance

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
}

const LoginModal: FC<LoginModalProps> = ({ visible, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isWrong, setIsWrong] = useState(false);
  const handleLogin = async () => {
    try {
      console.log({ phone_number: phoneNumber, password: password });
      const response = await axios.post(
        "https://ba745807670a.vps.myjino.ru/api/v1/auth/jwt/create/",
        {
          phone_number: phoneNumber,
          password: password,
        }
      );
      console.log(response);

      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;

      // Сохраняем токены в localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Закрываем модальное окно при успешном входе
      onClose();
    } catch (error) {
      setIsWrong(true);
      console.error("Ошибка при входе:", error);
    }
  };

  return (
    <div className={`${styles.wrapper} ${visible ? styles.opened : ""}`}>
      <div className={styles.content}>
        <div className={styles.top}>
          <button onClick={() => onClose()} className={styles.back}>
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
        <h2 className={styles.hi}>Привет!</h2>
        <div className={styles.mob}>
          <h5 className={`${styles.error} ${isWrong ? styles.show : ""}`}>
            Такой почты нет
          </h5>
          <input
            className={`${styles.input} ${isWrong ? styles.errorInput : ""}`}
            type="text"
            placeholder="Почта"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setIsWrong(false);
            }}
          />
          <input
            className={`${styles.input} ${isWrong ? styles.errorInput : ""} `}
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsWrong(false);
            }}
          />
          <Link className={`${styles.forget}`} href={"/forget-pas"}>
            Забыли пароль?
          </Link>
          <BlackButton className={styles.blackBtn} onClick={handleLogin}>
            Войти
          </BlackButton>
          <div className={styles.question}>
            <span>Нет аккаунта?</span>
            <Link href={"/register"}>Зарегистрироваться</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
