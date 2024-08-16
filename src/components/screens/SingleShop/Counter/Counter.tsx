import React, { FC, useState, useEffect } from "react";
import styles from "./Counter.module.scss";
import { ButtonProps } from "@/types/button.interface";

interface CounterProps extends ButtonProps {
  getQuantity: (quantity: number) => void;
  count: number;
}

const Counter: FC<CounterProps> = ({ className, count, getQuantity }) => {
  const [num, setNum] = useState<number>(count);

  useEffect(() => {
    getQuantity(num);
  }, [num, getQuantity]);

  return (
    <div className={`${styles.counter} ${className}`}>
      <button
        onClick={() => {
          if (num > 1) {
            setNum(num - 1);
          }
        }}
      >
        -
      </button>
      <span>{num}</span>
      <button
        onClick={() => {
          setNum(num + 1);
        }}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
