import React, { FC } from "react";
import style from "./BlackButton.module.scss";
import { ButtonProps } from "@/types/button.interface";
import cn from "classnames";
const BlackButton: FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button className={cn(style.btn, className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default BlackButton;
