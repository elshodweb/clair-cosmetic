import React, { FC, useState } from "react";
import styles from "./AccountData.module.scss";
import Image from "next/image";
import IconButton from "../../../UI/buttons/iconButton/IconButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import BlackButton from "@/components/UI/buttons/blackButton/BlackButton";
import { IRegisterData } from "../Auth";
import instance from "@/utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {
  setAccountDataVisible,
  setPhoneVerificationVisible,
  setRegisterVisible,
} from "@/store/auth/authSlice";
interface AccountDataProps {
  visible: boolean;
  onClose: () => void;
  registerData: IRegisterData;
  setRegisterData: (a: IRegisterData) => void;
}
function validateName(input: string) {
  const regex = /^[A-Za-z]+\s+[A-Za-z]+$/;

  if (regex.test(input)) {
    return true;
  } else {
    return false;
  }
}
const AccountData: FC<AccountDataProps> = ({
  visible,
  onClose,
  registerData,
  setRegisterData,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const notify = (err: string | undefined) =>
    toast.error(err || "Что то пошло не так, попробуйте снова");
  const [isWrong, setIsWrong] = useState("");

  const handleLogin = async () => {
    try {
      const response = await instance.post("/users/", {
        ...registerData,
      });

      dispatch(setAccountDataVisible(false));
      dispatch(setPhoneVerificationVisible(true));
    } catch (error: any) {
      notify(error?.response?.data?.errors?.[0]?.message);
      setRegisterData({
        city: "",
        email: "",
        full_name: "",
        password: "",
        phone_number: "",
        re_password: "",
      });
      dispatch(setAccountDataVisible(false));
      dispatch(setRegisterVisible(true));
    }
  };

  const handleSave = () => {
    if (!validateName(registerData.full_name)) {
      setIsWrong("Введите правильную имю и фамилию");
    } else {
      handleLogin();
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
          <h5 className={`${styles.error} ${isWrong ? styles.show : ""}`}>
            {isWrong}
          </h5>
          <input
            className={`${styles.input} ${isWrong ? styles.errorInput : ""}`}
            type="text"
            placeholder="Имя и фамилия"
            value={registerData.full_name}
            onChange={(e) => {
              setRegisterData({
                ...registerData,
                full_name: e.target.value,
              });
              setIsWrong("");
            }}
            required
          />
          <input
            className={`${styles.input} ${isWrong ? styles.errorInput : ""}`}
            type="text"
            placeholder="Город"
            value={registerData.city}
            onChange={(e) => {
              setRegisterData({
                ...registerData,
                city: e.target.value,
              });
              setIsWrong("");
            }}
            required
          />
          <BlackButton
            disabled={
              !!(!(registerData.city && registerData.full_name) ? true : false)
            }
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
