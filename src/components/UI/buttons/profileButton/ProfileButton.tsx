import React, { FC } from "react";
import style from "./ProfileButton.module.scss";
import { ButtonProps } from "@/types/button.interface";
import cn from "classnames";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ProfileButton: FC<ButtonProps> = ({ children, onClick, className }) => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  return (
    <button  className={cn(className, style.btn)} onClick={onClick}>
      {children}
    </button>
  );
};

export default ProfileButton;
