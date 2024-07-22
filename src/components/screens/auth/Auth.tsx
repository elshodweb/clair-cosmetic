"use client";
import React, { useEffect, useState } from "react";
import styles from "./Auth.module.scss";
import { verifyToken, refreshToken } from "@/utils/axiosInstance";
import LoginModal from "@/components/screens/auth/loginModal/LoginModal";
import RegisterModal from "./registerModal/RegisterModal";
import PhoneVerification from "./phoneVerification/PhoneVerification";
import AccountData from "./accountData/AccountData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  setAuth,
  setLoginVisible,
  setRegisterVisible,
  setPhoneVerificationVisible,
  setAccountDataVisible,
  setFinishedModalVisible,
} from "@/store/auth/authSlice";
import FinishedModal from "./finishedModal/FinishedModal";
export interface IRegisterData {
  phone_number: string;
  email: string;
  full_name: string;
  city: string;
  password: string;
  re_password: string;
}

const Auth = () => {
  const [registerData, setRegisterData] = useState<IRegisterData>({
    phone_number: "78212332222",
    email: "user@example.com",
    full_name: "string dasd    ",
    city: "s",
    password: "ssstring",
    re_password: "ssstring",
  });
  const dispatch = useDispatch<AppDispatch>();
  const {
    isLoginVisible,
    isRegisterVisible,
    isPhoneVerificationVisible,
    isAccountDataVisible,
    isFinishedModalVisible,
    isAuth,
  } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const authenticate = async () => {
      const refreshed = await verifyToken();
      if (refreshed) {
        dispatch(setAuth(true));
      } else {
        dispatch(setAuth(false));
      }
    };
    authenticate();
  }, []);

  if (isAuth === null) return null; // показываем загрузку или ничего, пока не получено состояние аутентификации

  return (
    <div className={styles.wrapper}>
      <LoginModal
        visible={isLoginVisible}
        onClose={() => dispatch(setLoginVisible(false))}
      />
      <RegisterModal
        registerData={registerData}
        setRegisterData={setRegisterData}
        visible={isRegisterVisible}
        onClose={() => dispatch(setRegisterVisible(false))}
      />
      <AccountData
        registerData={registerData}
        setRegisterData={setRegisterData}
        visible={isAccountDataVisible}
        onClose={() => dispatch(setAccountDataVisible(false))}
      />
      <PhoneVerification
        registerData={registerData}
        visible={isPhoneVerificationVisible}
        onClose={() => dispatch(setPhoneVerificationVisible(false))}
      />
      <FinishedModal
        visible={isFinishedModalVisible}
        onClose={() => dispatch(setFinishedModalVisible(false))}
      />
    </div>
  );
};

export default Auth;
