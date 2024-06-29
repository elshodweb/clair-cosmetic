import React, { FC } from "react";
import style from "./OutlineButton.module.scss";
import { ButtonProps } from "@/types/button.interface";
import cn from "classnames";
const OutlineButton: FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button className={cn(style.btn, className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default OutlineButton;
