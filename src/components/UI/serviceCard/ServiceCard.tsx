import React, { FC } from "react";
import styles from "./ServiceCard.module.scss";
import Link from "next/link";
import cn from "classnames";
interface ServiceCardProps {
  service: any;
  greenTitle?: boolean;
}
const ServiceCard: FC<ServiceCardProps> = ({ greenTitle, service }) => {
  return (
    <div className={styles.service}>
      <div className={styles.row}>
        <div className={styles.info}>
          <div className={styles.name}>{service.title}</div>
          <div className={cn(styles.subName, greenTitle ? styles.green : "")}>
            {service?.category ? service?.category.title : ""}
          </div>
          <div className={styles.mobTags}>
            {service.description ? service.description : ""}
          </div>
        </div>
        <div className={styles.price}>{service.price_min} ₽</div>
      </div>
      <div className={styles.subInfo}>
        <div className={styles.tags}>
          {service.description ? service.description : ""}
        </div>
        <div className={styles.mobPrice}>{service.price_min} ₽</div>

        <Link href={"/services/" + service.id} className={styles.btn}>
          Записаться
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
