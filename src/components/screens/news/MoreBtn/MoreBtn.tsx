import Link from "next/link";
import React, { FC } from "react";
import styles from "./MoreBtn.module.scss";
interface MoreBtnProps {
  onClick: () => void;
  children: string;
}
const MoreBtn: FC<MoreBtnProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className={styles.link}>
      {children}
    </button>
  );
};

export default MoreBtn;
