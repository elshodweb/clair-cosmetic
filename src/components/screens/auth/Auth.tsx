import React, { FC, useEffect, useState } from "react";
import styles from "./Auth.module.scss";
import { verifyToken, refreshToken } from "@/utils/axiosInstance";
import LoginModal from "@/components/screens/auth/loginModal/LoginModal";
import RegisterModal from "./registerModal/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  setAuth,
  setLoginVisible,
  setRegisterVisible,
} from "@/store/auth/authSlice";

const Auth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoginVisible, isRegisterVisible, isAuth } = useSelector(
    (state: RootState) => state.auth
  );

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
      // dispatch(setLoginVisible(true));
    } else {
      dispatch(setAuth(true));
      dispatch(setLoginVisible(false));
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
  }, [setAuth]);

  if (isAuth) return;
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
    </div>
  );
};

export default Auth;
