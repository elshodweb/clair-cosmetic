"use client";
import React, { FC, useState, useEffect, useRef } from "react";
import styles from "./MyInput.module.scss";
import cn from "classnames";

interface InputRadioProps {
  name: string;
  price: string;
  onChange: (val: boolean) => void;
}

const MyInput: FC<any> = ({ name, price, onChange, description }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isOpenedInfo, setIsOpenedInfo] = useState<boolean>(false);
  const infoRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
        setIsOpenedInfo(false);
      }
    }

    if (isOpenedInfo) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenedInfo]);

  function onClick(e: any) {
    onChange(!isSelected);
    setIsSelected(!isSelected);
  }

  return (
    <div className={cn(styles.input, isSelected ? styles.checked : "")}>
      <input type="checkbox" checked={isSelected} onChange={onClick} />
      <span className={styles.name}>{name}</span>
      <span className={styles.price}>{price}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (!isOpenedInfo) {
            setIsOpenedInfo(!isOpenedInfo);
          }
        }}
        className={cn(styles.btn, isOpenedInfo ? styles.btnActive : "")}
      >
        i
      </button>
      <p
        ref={infoRef}
        className={cn(styles.info, isOpenedInfo ? styles.isOpened : "")}
      >
        {description}
        {price}
      </p>
    </div>
  );
};

export default MyInput;
