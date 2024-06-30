import { FC } from "react";
import styles from "./ServiceItem.module.scss";
import ItemPrice from "./itemPrice/ItemPrice";
import Link from "next/link";

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
  return (
    <div
      className={styles.container}
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
              <img
                style={{ display: `${index == isOpen ? "block" : "none"}` }}
                src="./images/services/girl-mobile.png"
                alt="girl"
              />
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
