import React, { FC } from "react";
import ModalWrapper from "@/components/UI/modalWrapper/ModalWrapper";
import styles from "./logoutModal.module.scss";
import BlackButton from "@/components/UI/buttons/blackButton/BlackButton";
import OutlineButton from "@/components/UI/buttons/outlineButton/OutlineButton";
import { useRouter } from "next/router";
interface LogoutModalProps {
  isOpenLogoutModal: boolean;
  setOpenLogoutModal: (e: boolean) => void;
}
const LogoutModal: FC<LogoutModalProps> = ({
  isOpenLogoutModal,
  setOpenLogoutModal,
}) => {
  const router = useRouter();
  return (
    <ModalWrapper isOpen={isOpenLogoutModal} setOpen={setOpenLogoutModal}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Вы хотите выйти из профиля?</h1>
        <BlackButton
          className={styles.btn}
          onClick={() => {
            setOpenLogoutModal(false);
          }}
        >
          Нет, я хочу вернуться
        </BlackButton>
        <OutlineButton
          className={styles.btn}
          onClick={() => {
            setOpenLogoutModal(false);
            window.localStorage.removeItem("accessToken");
            window.localStorage.removeItem("refreshToken");
            router.push("/");
          }}
        >
          Да, я хочу выйти
        </OutlineButton>
      </div>
    </ModalWrapper>
  );
};

export default LogoutModal;
