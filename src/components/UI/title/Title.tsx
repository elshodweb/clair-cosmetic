import React, { FC } from "react";
import styles from "./Title.module.scss";
import { OnlyChildrenProps } from "@/types/children.interface";

const Title: FC<OnlyChildrenProps> = ({ children ,className}) => {
  return (
    <div className={`${styles.title_container} ${className}`}>
      <div className={styles.title}>{children}</div>
    </div>
  );
};

export default Title;
