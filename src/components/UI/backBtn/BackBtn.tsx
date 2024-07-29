import React, { FC } from "react";
import styles from "./BackBtn.module.scss";
import { ButtonProps } from "@/types/button.interface";
const BackBtn: FC<ButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.btn}>
      Назад
    </button>
  );
};

export default BackBtn;
