import React, { FC, useState } from "react";
import styles from "./FinishedModal.module.scss";
import ModalWrapper from "@/components/UI/modalWrapper/ModalWrapper";
import Image from "next/image";
import BlackButton from "@/components/UI/buttons/blackButton/BlackButton";

interface FinishedModalProps {
  visible: boolean;
  onClose: () => void;
}
const FinishedModal: FC<FinishedModalProps> = ({ onClose, visible }) => {
  return (
    <div className={styles.wrapper}>
      <ModalWrapper
        children={
          <>
            <h2 className={styles.title}>ура!</h2>
            <Image
              className={styles.rainBow}
              src={"/images/authModals/heart.png"}
              alt="cart"
              
              width={399}
              height={150}
            />
            <h3 className={styles.subtitle}>Аккаунт успешно создан</h3>
            <BlackButton onClick={onClose}>Вперед</BlackButton>
          </>
        }
        isOpen={visible}
        setOpen={onClose}
      ></ModalWrapper>
    </div>
  );
};

export default FinishedModal;
