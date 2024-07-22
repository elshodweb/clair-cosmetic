import React, { useEffect } from "react";
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

const Auth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    isLoginVisible,
    isRegisterVisible,
    isPhoneVerificationVisible,
    isAccountDataVisible,
    isFinishedModalVisible,
    isAuth,
  } = useSelector((state: RootState) => state.auth);

  const fetchUserInfo = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      dispatch(setAuth(false));
      // dispatch(setLoginVisible(true));
      return;
    }

    const isValid = await verifyToken(token);
    if (!isValid) {
      dispatch(setAuth(false));
      dispatch(setLoginVisible(true));
    } else {
      dispatch(setAuth(true));
      // dispatch(setLoginVisible(false));
    }
  };

  useEffect(() => {
    const authenticate = async () => {
      const refreshed = await refreshToken();
      if (refreshed) {
        await fetchUserInfo();
      } else {
        dispatch(setAuth(false));
        // dispatch(setLoginVisible(true));
      }
    };

    authenticate();
  }, [dispatch]);

  if (isAuth === null) return null; // показываем загрузку или ничего, пока не получено состояние аутентификации

  return (
    <div className={styles.wrapper}>
      <LoginModal
        visible={isLoginVisible}
        onClose={() => dispatch(setLoginVisible(false))}
      />
      <RegisterModal
        visible={isRegisterVisible}
        onClose={() => dispatch(setRegisterVisible(false))}
      />
      <AccountData
        visible={isAccountDataVisible}
        onClose={() => dispatch(setAccountDataVisible(false))}
      />
      <PhoneVerification
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
