import React from "react";
import styles from "./ProductCard.module.scss";
import OutlineButton from "@/components/UI/buttons/outlineButton/OutlineButton";
import Image from "next/image";
const ProductCard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.desctop}>
        <div className={styles.row}>
          <div className={styles.info}>
            <div className={styles.status}>Не доставлен</div>
            <div className={styles.count}>4 товара</div>
          </div>
          <div className={styles.price}>2700 ₽</div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.images}>
            <Image
              width={57}
              height={80}
              alt={"product"}
              src={"/images/account/image1.png"}
            />
            <Image
              width={57}
              height={80}
              alt={"product"}
              src={"/images/account/image2.png"}
            />
            <Image
              width={57}
              height={80}
              alt={"product"}
              src={"/images/account/image3.png"}
            />
            <Image
              width={57}
              height={80}
              alt={"product"}
              src={"/images/account/image4.png"}
            />
          </div>
          <div className={styles.btn}>
            <OutlineButton>Позвонить</OutlineButton>
          </div>
        </div>
      </div>
      <div className={styles.mobile}>
        <div className={styles.info}>
          <div className={styles.status}>Не доставлен</div>
          <div className={styles.count}>4 товара</div>
        </div>
        <div className={styles.images}>
          <Image
            width={57}
            height={80}
            alt={"product"}
            src={"/images/account/image1.png"}
          />
          <Image
            width={57}
            height={80}
            alt={"product"}
            src={"/images/account/image2.png"}
          />
          <Image
            width={57}
            height={80}
            alt={"product"}
            src={"/images/account/image3.png"}
          />
          <Image
            width={57}
            height={80}
            alt={"product"}
            src={"/images/account/image4.png"}
          />
        </div>
        <div className={styles.bottom}>
          <div className={styles.price}>2700 ₽</div>
          <div className={styles.btn}>
            <OutlineButton>Позвонить</OutlineButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
