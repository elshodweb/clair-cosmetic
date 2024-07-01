import React, { FC } from "react";
import style from "./Container.module.scss";
import { OnlyChildrenProps } from "@/types/children.interface";

const Container: FC<OnlyChildrenProps> = ({ children }) => {
  return <div className={style.wrapper}>{children}</div>;
};

export default Container;
