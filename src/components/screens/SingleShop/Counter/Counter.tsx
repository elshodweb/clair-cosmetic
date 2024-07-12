"use client";
import React, { useState } from "react";
import styles from "./Counter.module.scss";
const Counter = () => {
  const [num, setNum] = useState<number>(1);
  return (
    <div className={styles.counter}>
      <button
        onClick={() => {
          if (0 < num) {
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
