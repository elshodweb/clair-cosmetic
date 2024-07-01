import Link from "next/link";
import React, { FC } from "react";
import styles from "./ArrowLink.module.scss";
interface ArrowLink {
  href: string;
  children: string;
}
const ArrowLink: FC<ArrowLink> = ({ href, children }) => {
  return (
    <Link href={href} className={styles.link}>
      {children}
    </Link>
  );
};

export default ArrowLink;
