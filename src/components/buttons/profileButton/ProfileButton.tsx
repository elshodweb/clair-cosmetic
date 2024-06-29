import React, { FC } from "react";
import style from "./ProfileButton.module.scss";
import { ButtonProps } from "@/types/button.interface";
import cn from "classnames";

const ProfileButton: FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button className={cn(className, style.btn)} onClick={onClick}>
      {children}
    </button>
  );
};

export default ProfileButton;
