import React, { FC, useState } from "react";
import styles from "./RegisterModal.module.scss";
import BlackButton from "../../../UI/buttons/blackButton/BlackButton";
import Image from "next/image";
import IconButton from "../../../UI/buttons/iconButton/IconButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  setAccountDataVisible,
  setLoginVisible,
  setRegisterVisible,
} from "@/store/auth/authSlice";
import ModalWrapper from "@/components/UI/modalWrapper/ModalWrapper";
import { IRegisterData } from "../Auth";

interface RegisterModalProps {
  visible: boolean;
  onClose: () => void;
  registerData: IRegisterData;
  setRegisterData: (a: IRegisterData) => void;
}

const RegisterModal: FC<RegisterModalProps> = ({
  visible,
  onClose,
  registerData,
  setRegisterData,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const [isWrong, setIsWrong] = useState("");
  const [isAcceptOffer, setAcceptOffer] = useState(false);
  const [isAcceptNews, setAcceptNews] = useState(false);

  const handleRegister = async (e?: any) => {
    e.preventDefault();
    const isPhoneNumber =
      registerData.phone_number.length === 11 &&
      (registerData.phone_number[0] === "7" ||
        registerData.phone_number[0] === "8");
    if (!isPhoneNumber) {
      setIsWrong("Введите правильную телефон номер");
    } else if (registerData.password.length < 8) {
      setIsWrong("Введите не менее 8 символов для пароля");
    } else if (!registerData?.email?.includes("@")) {
      setIsWrong("Введите правильную почту");
    } else {
      dispatch(setRegisterVisible(false));
      dispatch(setAccountDataVisible(true));
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
        <form className={styles.mob}>
          <h5 className={`${styles.error} ${isWrong ? styles.show : ""}`}>
            {isWrong}
          </h5>
          <input
            className={`${styles.input} ${isWrong ? styles.errorInput : ""}`}
            type="email"
            placeholder="Почта"
            value={registerData.email}
            onChange={(e) => {
              setRegisterData({ ...registerData, email: e.target.value });
              setIsWrong("");
            }}
            required
          />
          <input
            className={`${styles.input} ${isWrong ? styles.errorInput : ""}`}
            type="number"
            placeholder="Телефон"
            value={registerData.phone_number}
            onChange={(e) => {
              setRegisterData({
                ...registerData,
                phone_number: e.target.value,
              });
              setIsWrong("");
            }}
            required
          />
          <input
            className={`${styles.input} ${isWrong ? styles.errorInput : ""} `}
            type="password"
            placeholder="Придумайте пароль"
            value={registerData.password}
            onChange={(e) => {
              setRegisterData({
                ...registerData,
                password: e.target.value,
                re_password: e.target.value,
              });
              setIsWrong("");
            }}
            min={8}
            required
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
            onClick={handleRegister}
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
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
