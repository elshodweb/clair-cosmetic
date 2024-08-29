import { FC } from "react";
import styles from "./Item.price.module.scss";
import Link from "next/link";

const ItemPrice: FC<any> = ({ data }) => {
  const { title, price_min, description } = data;
  return (
    <div className={styles.list_item}>
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.text}>{description}</div>
      </div>
      <Link href={'/services'} className={styles.price_button}>
        <div>от {price_min}₽</div>
      </Link>
    </div>
  );
};

export default ItemPrice;
