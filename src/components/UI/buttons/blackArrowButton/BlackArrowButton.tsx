import React, { FC } from "react";
import style from "./BlackArrowButton.module.scss";
import { ButtonProps } from "@/types/button.interface";
import cn from "classnames";

const BlackArrowButton: FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button className={cn(className, style.btn)} onClick={onClick}>
      {children}
    </button>
  );
};

export default BlackArrowButton;
