import React, { FC } from "react";
import style from "./ProfileButton.module.scss";
import { ButtonProps } from "@/types/button.interface";
import cn from "classnames";
import Link from "next/link";

const ProfileButton: FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <Link href={'/account'} className={cn(className, style.btn)} onClick={onClick}>
      {children}
    </Link>
  );
};

export default ProfileButton;
