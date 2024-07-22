import React, { FC, useEffect } from "react";
import styles from "./ModalWrapper.module.scss";
import cn from "classnames";
import IconButton from "@/components/UI/buttons/iconButton/IconButton";
import Image from "next/image";
interface ModalWrapperProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}
const ModalWrapper: FC<ModalWrapperProps> = ({ isOpen, setOpen, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);
  return (
    <div
      onClick={(e) => {
        setOpen(false);
      }}
      className={cn(styles.wrapper, isOpen ? styles.opened : "")}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.screen}>
        <IconButton
          className={styles.exitBtn}
          onClick={() => {
            setOpen(false);
          }}
        >
          <Image
            src={"/images/header/cross.svg"}
            alt="cart"
            width={16}
            height={19}
          />
        </IconButton>
        <section className={styles.section}>{children}</section>
      </div>
    </div>
  );
};

export default ModalWrapper;
