import React, { FC, useState } from "react";
import styles from "./AccountData.module.scss";
import Image from "next/image";
import IconButton from "../../../UI/buttons/iconButton/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setAccountDataVisible } from "@/store/auth/authSlice";
import BlackButton from "@/components/UI/buttons/blackButton/BlackButton";

interface AccountDataProps {
  visible: boolean;
  onClose: () => void;
}

const AccountData: FC<AccountDataProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const handleSave = () => {
    // Сохранение данных аккаунта
    dispatch(setAccountDataVisible(false));
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
        <div className={styles.img}>
          <Image
            src={"/images/authModals/eye.png"}
            alt="cart"
            width={272}
            height={193}
          />
        </div>
        <h2 className={styles.hi}>ДАННЫЕ АККАУНТА</h2>
        <div className={styles.mob}>
          <input
            className={styles.input}
            type="text"
            placeholder="Имя и фамилия"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Город"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <BlackButton
            disabled={!!(!(city && name) ? true : false)}
            className={styles.blackBtn}
            onClick={handleSave}
          >
            Сохранить
          </BlackButton>
        </div>
      </div>
    </div>
  );
};

export default AccountData;
