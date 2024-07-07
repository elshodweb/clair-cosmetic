import React, { FC } from "react";
import styles from "./SmallTitle.module.scss";
import { OnlyChildrenProps } from "@/types/children.interface";

const SmallTitle: FC<OnlyChildrenProps> = ({ children }) => {
  return <h3 className={styles.title}>{children}</h3>;
};

export default SmallTitle;