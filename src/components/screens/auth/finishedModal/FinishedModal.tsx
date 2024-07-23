import React, { FC, useState } from "react";
import styles from "./FinishedModal.module.scss";
import ModalWrapper from "@/components/UI/modalWrapper/ModalWrapper";
import Image from "next/image";
import BlackButton from "@/components/UI/buttons/blackButton/BlackButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setLoginVisible } from "@/store/auth/authSlice";

interface FinishedModalProps {
  visible: boolean;
  onClose: () => void;
}
const FinishedModal: FC<FinishedModalProps> = ({ onClose, visible }) => {
  
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className={styles.wrapper}>
      <ModalWrapper
        children={
          <>
            <div onClick={onClose} className={styles.back}>
              <Image
                src={"/images/UI/arrow.svg"}
                width={56}
                height={10}
                alt={"arrow"}
              />
            </div>
            <div  className={styles.order}>
            <h2 className={styles.title}>ура!</h2>
            <Image
              className={styles.img}
              src={"/images/authModals/heart.png"}
              alt="cart"
              width={399}
              height={150}
            />
            </div>
            <h3 className={styles.subtitle}>Аккаунт успешно создан</h3>
            <BlackButton className={styles.btn} onClick={()=>{
              onClose();
              dispatch(setLoginVisible(true));
            }}>
              Вперед
            </BlackButton>
          </>
        }
        isOpen={visible}
        setOpen={onClose}
      ></ModalWrapper>
    </div>
  );
};

export default FinishedModal;
