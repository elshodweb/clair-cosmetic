"use client";
import React, {
  FC,
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import styles from "./MySmallInput.module.scss";
import cn from "classnames";

interface InputRadioProps {
  small?: boolean;
  name: string;
  price: string;
  id: string;
  isSelected:boolean;
  onChange: Dispatch<SetStateAction<string>>;
}

const MySmallInput: FC<InputRadioProps> = ({
  small,
  name,
  id,
  price,
  isSelected,
  onChange,
}) => {
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
    onChange(id);
  }

  return (
    <div
      className={cn(
        styles.input,
        isSelected ? styles.checked : "",
        small ? styles.small : ""
      )}
    >
      <input type="checkbox" checked={isSelected} onChange={onClick} />
      <span className={styles.name}>{name}</span>
      <span className={styles.price}>{price}</span>
    </div>
  );
};

export default MySmallInput;
