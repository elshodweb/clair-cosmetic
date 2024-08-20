import { ButtonProps } from "@/types/button.interface";
import React, { FC } from "react";
import styles from "./Hour.module.scss";
const Hour: FC<ButtonProps> = ({ children, className, onClick, disabled }) => {
  return (
    <button disabled={disabled} className={`${styles.btn} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Hour;
