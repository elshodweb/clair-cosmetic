import React, { FC } from "react";
import style from "./SocialButton.module.scss";
import { ButtonProps } from "@/types/button.interface";
import cn from "classnames";
import Link from "next/link";

const SocialButton: FC<SocialButton> = ({ href, children, className }) => {
  return (
    <Link href={href} className={cn(style.btn, className)}>
      {children}
    </Link>
  );
};

export default SocialButton;

interface SocialButton extends ButtonProps {
  href: string;
}
