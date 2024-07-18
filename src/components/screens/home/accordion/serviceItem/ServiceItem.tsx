"use client";
import { FC, useEffect, useState } from "react";
import styles from "./ServiceItem.module.scss";
import ItemPrice from "./itemPrice/ItemPrice";
import Link from "next/link";
import Image from "next/image";

interface props {
  index: number;
  isOpen: any;
  title: string;
  content: string;
  clickHandler: (index: any) => void;
}

const ServiceItem: FC<props> = ({
  content,
  title,
  index,
  isOpen,
  clickHandler,
}) => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 850);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 850);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`${styles.container} ${index == isOpen ? styles.activeContainer : ""}`}
      style={{
        background: `linear-gradient(180deg, #FFF 0%, ${
          index == isOpen ? "#FFEDFF" : "#FFEDFF"
        } 100%)`,
      }}
    >
      <div onClick={() => clickHandler(index)} className={styles.header}>
        <div className={styles.header_inner}>
          <h2 className={styles.title}>{title}</h2>
          <button>
            <img
              className={
                index == isOpen ? styles.arrow_top : styles.arrow_bottom
              }
              src="./images/services/arrow.svg"
              alt="arrow"
            />
          </button>
        </div>
      </div>

      <div className={index == isOpen ? styles.body_open : styles.body_close}>
        <div className={styles.body_inner}>
          <div className={styles.info}>
            <div className={styles.text}>{content}</div>
            <div className={styles.img_container}>
              {isDesktop ? (
                <Image
                  style={{ display: `${index == isOpen ? "block" : "none"}` }}
                  src="/images/home/girl.png"
                  alt="girl"
                  width={253}
                  height={284}
                />
              ) : (
                <Image
                  style={{ display: `${index == isOpen ? "block" : "none"}` }}
                  src="/images/home/girl-m.png"
                  alt="girl"
                  width={170}
                  height={193}
                />
              )}
            </div>
          </div>

          <div className={styles.price_list}>
            <ItemPrice />
            <ItemPrice />
            <ItemPrice />
            <ItemPrice />
            <div className={styles.button_container}>
              <Link href="/face">
                <button className={styles.showAll_button}>
                  Посмотреть все
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
