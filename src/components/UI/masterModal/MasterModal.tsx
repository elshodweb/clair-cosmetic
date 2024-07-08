import React, { FC, useState } from "react";
import styles from "./MasterModal.module.scss";
import BlackButton from "../buttons/blackButton/BlackButton";
import IconButton from "../buttons/iconButton/IconButton";
import Image from "next/image";
import cn from "classnames";
import MySmallInput from "../mySmallInput/MySmallInput";
interface MasterModalProps {
  id: number | null;
  setMaster: (id: number | null) => void;
}
const MasterModal: FC<MasterModalProps> = ({ setMaster, id }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  return (
    <div
      onClick={(e) => {
        setMaster(null);
      }}
      className={cn(styles.wrapper, id ? styles.opened : "")}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.screen}>
        <div className={styles.content}>
          <div className={styles.head}>
            <div className={styles.about}>О мастере</div>
            <IconButton
              className={""}
              onClick={() => {
                setMaster(null);
              }}
            >
              <Image
                src={"/images/header/cross.svg"}
                alt="cart"
                width={16}
                height={19}
              />
            </IconButton>
          </div>
          <div className={styles.img}>
            <Image
              src={"/images/masters/master.png"}
              width={355}
              height={448}
              alt="master image"
            />
            <button
              className={cn(styles.like, isLiked ? styles.liked : "")}
              onClick={() => {
                setIsLiked(!isLiked);
              }}
            ></button>
          </div>
          <h3 className={styles.title}>Светлана Анисимова</h3>
          <h4 className={styles.prof}>Мастер по маникюру</h4>
          <p className={styles.descr}>
            Работает у нас с самого первого дня — и всё это время получает от
            клиентов только комплименты. Отметим, заслуженные. Пока вы это
            читаете, Саша услышал ещё один комплимент.
          </p>
          <div className={styles.location}>
            <div className={styles.locationImg}>
              <Image
                src={"/images/masters/location.png"}
                alt="location img"
                width={66}
                height={66}
              />
            </div>
            <div className={styles.locationName}>
              <strong>Воронеж</strong>
              <span>Проспект Патриотов, дом 4А</span>
            </div>
          </div>
          <h3 className={styles.title} style={{ marginBottom: 16 }}>
            Услуги
          </h3>
          <p className={styles.descr}>
            Услуги, которые делает мастер Анастасия
          </p>
          <div className={styles.selects}>
            <MySmallInput
              small={true}
              name="HydraFacial Базовый сервис"
              price="5250 ₽"
              onChange={(e) => {
                console.log(e);
              }}
            />
            <MySmallInput
              small={true}
              name="HydraFacial Базовый сервис"
              price="5250 ₽"
              onChange={(e) => {
                console.log(e);
              }}
            />
            <MySmallInput
              small={true}
              name="HydraFacial Базовый сервис"
              price="5250 ₽"
              onChange={(e) => {
                console.log(e);
              }}
            />
            <MySmallInput
              small={true}
              name="HydraFacial Базовый сервис"
              price="5250 ₽"
              onChange={(e) => {
                console.log(e);
              }}
            />
            <MySmallInput
              small={true}
              name="HydraFacial Базовый сервис"
              price="5250 ₽"
              onChange={(e) => {
                console.log(e);
              }}
            />
            <MySmallInput
              small={true}
              name="HydraFacial Базовый сервис"
              price="5250 ₽"
              onChange={(e) => {
                console.log(e);
              }}
            />
            <MySmallInput
              small={true}
              name="HydraFacial Базовый сервис"
              price="5250 ₽"
              onChange={(e) => {
                console.log(e);
              }}
            />
          </div>
          <h3 className={styles.title} style={{ marginBottom: 16 }}>
            Квалификация:
          </h3>
          <p className={styles.descr}>
            УЦ Akzent, обучение медицинскому аппаратному педикюру, маникюру и
            наращиванию ногтей 2017 г. УЦ Akzent, обучение медицинскому
            аппаратному педикюру, маникюру и наращиванию ногтей 2017 г.
          </p>
        </div>
      </div>

      <div onClick={(e) => e.stopPropagation()} className={styles.btn}>
        <BlackButton>Записаться к мастеру</BlackButton>
      </div>
    </div>
  );
};

export default MasterModal;
