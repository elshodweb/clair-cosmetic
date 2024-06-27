import React, { FC } from "react";
import styles from "./Title.module.scss";
import { OnlyChildrenProps } from "@/types/children.interface";

const Title: FC<OnlyChildrenProps> = ({ children }) => {
  return (
    <div className={styles.title_container}>
      <div className={styles.title}>{children}</div>
    </div>
  );
};

export default Title;
