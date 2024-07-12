import React, { FC, useState } from "react";
import styles from "./Btn.module.scss";
import { OnlyChildrenProps } from "@/types/children.interface";

interface BtnProps extends OnlyChildrenProps {}
const Btn: FC<BtnProps> = ({ children }) => {
  const [isOn, setIsOn] = useState<boolean>(true);

  return (
    <button
      onClick={() => {
        setIsOn(!isOn);
      }}
      className={`${styles.btn} ${isOn ? styles.on : ""}`}
    >
      {children}
    </button>
  );
};

export default Btn;
