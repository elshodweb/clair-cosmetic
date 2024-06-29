import React, { FC } from "react";
import style from "./MobileButton.module.scss";
import { ButtonProps } from "@/types/button.interface";
import cn from "classnames";
import Image from "next/image";
interface MobileButtonProps extends ButtonProps {
  img: string;
}
const MobileButton: FC<MobileButtonProps> = ({ onClick, className, img }) => {
  return (
    <button className={cn(style.btn, className)} onClick={onClick}>
      <Image src={img} alt="profile photo" width={35} height={35} />
      <span className={style.stick}></span>
    </button>
  );
};

export default MobileButton;
