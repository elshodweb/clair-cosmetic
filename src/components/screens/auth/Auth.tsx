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
  setCodeConfirmVisible,
} from "@/store/auth/authSlice";
import FinishedModal from "./finishedModal/FinishedModal";
import CodeConfirm from "@/components/UI/codeConfirm/CodeConfirm";
export interface IRegisterData {
  phone_number: string;
  email: string;
  full_name: string;
  city: string;
  password: string;
  re_password: string;
}

// phone_number: "78212332224",
//     email: "user@example.com",
//     full_name: "string dasd",
//     city: "s",
//     password: "ssstring",
//     re_password: "ssstring",
const Auth = () => {
  const [registerData, setRegisterData] = useState<IRegisterData>({
    phone_number: "",
    email: "",
    full_name: "",
    city: "",
    password: "",
    re_password: "",
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

  if (isAuth === null || isAuth) return null;
  function cleanInputs() {
    setRegisterData({
      phone_number: "",
      email: "",
      full_name: "",
      city: "",
      password: "",
      re_password: "",
    });
  }
  return (
    <div className={styles.wrapper}>
      <LoginModal
        visible={isLoginVisible}
        onClose={() => {
          dispatch(setLoginVisible(false));
          cleanInputs();
        }}
      />
      
      <RegisterModal
        registerData={registerData}
        setRegisterData={setRegisterData}
        visible={isRegisterVisible}
        onClose={() => {
          dispatch(setRegisterVisible(false));
          cleanInputs();
        }}
      />
      <AccountData
        registerData={registerData}
        setRegisterData={setRegisterData}
        visible={isAccountDataVisible}
        onClose={() => {
          dispatch(setAccountDataVisible(false));
          cleanInputs();
        }}
      />
      <PhoneVerification
        registerData={registerData}
        visible={isPhoneVerificationVisible}
        onClose={() => {
          dispatch(setPhoneVerificationVisible(false));
          cleanInputs();
        }}
      />
      <FinishedModal
        visible={isFinishedModalVisible}
        onClose={() => {
          dispatch(setFinishedModalVisible(false));
          cleanInputs();
        }}
      />
    </div>
  );
};

export default Auth;
