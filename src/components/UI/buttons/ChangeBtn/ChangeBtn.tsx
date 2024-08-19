import React, { FC } from "react";
import styles from "./ChangeBtn.module.scss";
import Image from "next/image";
import { ButtonProps } from "@/types/button.interface";

const ChangeBtn: FC<ButtonProps> = ({ className, onClick }) => {
  return (
    <button onClick={onClick} className={`${className} ${styles.btn} `}>
      <Image width={13} height={13} alt="pen" src={"/images/UI/pen.svg"} />
      <span>Изменить</span>
    </button>
  );
};

export default ChangeBtn;
