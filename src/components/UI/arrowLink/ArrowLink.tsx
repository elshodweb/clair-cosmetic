import Link from "next/link";
import React, { FC } from "react";
import styles from "./ArrowLink.module.scss";
interface ArrowLink {
  href: string;
  children: string;
  className?:string;
}
const ArrowLink: FC<ArrowLink> = ({ href, children,className }) => {
  return (
    <Link href={href} className={`${styles.link} ${className}`}>
      {children}
    </Link>
  );
};

export default ArrowLink;
