import React, { FC, useState } from "react";
import styles from "./RegisterModal.module.scss";
import Link from "next/link";
import BlackButton from "../../../UI/buttons/blackButton/BlackButton";
import Image from "next/image";
import IconButton from "../../../UI/buttons/iconButton/IconButton";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setLoginVisible, setRegisterVisible } from "@/store/auth/authSlice";
import ModalWrapper from "@/components/UI/modalWrapper/ModalWrapper";
import SmallTitle from "@/components/UI/smallTitle/SmallTitle";

interface RegisterModalProps {
  visible: boolean;
  onClose: () => void;
}

const RegisterModal: FC<RegisterModalProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isWrong, setIsWrong] = useState(false);
  const [isAcceptOffer, setAcceptOffer] = useState(false);
  const [isAcceptNews, setAcceptNews] = useState(false);

  const handleRegister = async () => {
    try {
      console.log({
        email: email,
        phone_number: phoneNumber,
        password: password,
      });
      const response = await axios.post(
        "https://ba745807670a.vps.myjino.ru/api/v1/auth/users/",
        {
          email: email,
          phone_number: phoneNumber,
          password: password,
        }
      );
      console.log(response);

      // Закрываем модальное окно при успешной регистрации
      onClose();
    } catch (error) {
      setIsWrong(true);
      console.error("Ошибка при регистрации:", error);
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${visible ? styles.opened : ""} ${
        isModalOpen ? styles.noWrapperOpacity : ""
      }`}
    >
      <ModalWrapper isOpen={isModalOpen} setOpen={setModalOpen}>
        <div className={styles.title}>Документация</div>
        <ol className={styles.list}>
          <li>Политика конфиденциальности</li>
          <li>Политика конфиденциальности</li>
          <li>Политика конфиденциальности</li>
          <li>Политика конфиденциальности</li>
          <li>Политика конфиденциальности</li>
          <li>Политика конфиденциальности</li>
          <li>Политика конфиденциальности</li>
          <li>Политика конфиденциальности</li>
          <li>Политика конфиденциальности</li>
          <li>Политика конфиденциальности</li>
        </ol>
      </ModalWrapper>

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
          src={"/images/authModals/flowers.png"}
          alt="cart"
          width={399}
          height={150}
        />
        <h2 className={styles.hi}>Добро пожаловать!</h2>
        <div className={styles.mob}>
          <h5 className={`${styles.error} ${isWrong ? styles.show : ""}`}>
            Ошибка при регистрации
          </h5>
          <input
            className={`${styles.input} ${isWrong ? styles.errorInput : ""}`}
            type="text"
            placeholder="Почта"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsWrong(false);
            }}
          />
          <input
            className={`${styles.input} ${isWrong ? styles.errorInput : ""}`}
            type="text"
            placeholder="Телефон"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setIsWrong(false);
            }}
          />
          <input
            className={`${styles.input} ${isWrong ? styles.errorInput : ""} `}
            type="password"
            placeholder="Придумайте пароль"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsWrong(false);
            }}
          />
          <label className={styles.acceptOffer}>
            <input
              type="checkbox"
              checked={isAcceptOffer}
              onChange={() => setAcceptOffer(!isAcceptOffer)}
            />
            <div>
              Даю согласие на
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setModalOpen(true);
                }}
              >
                обработку персональных данных и договор оферты
              </span>
            </div>
          </label>

          <label className={styles.acceptNews}>
            <input
              type="checkbox"
              checked={isAcceptNews}
              onChange={() => setAcceptNews(!isAcceptNews)}
            />
            <div>Хочу получать новости об акциях самым первым</div>
          </label>
          <BlackButton
            disabled={!(isAcceptNews && isAcceptOffer) ? true : false}
            onClick={() => {
              handleRegister();
            }}
            className={styles.blackBtn}
          >
            Зарегистрироваться
          </BlackButton>
          <div className={styles.question}>
            <span>Уже есть аккаунт?</span>
            <button
              onClick={() => {
                dispatch(setRegisterVisible(false));
                dispatch(setLoginVisible(true));
              }}
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
