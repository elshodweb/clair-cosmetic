import React, { FC, useState } from "react";
import styles from "./MasterModal.module.scss";
import BlackButton from "../buttons/blackButton/BlackButton";
import IconButton from "../buttons/iconButton/IconButton";
import Image from "next/image";
import cn from "classnames";
import Like from "../like/Like";
import classNames from "classnames";
interface MasterModalProps {
  id: number | null;
  setMaster: (id: number | null) => void;
}
const MasterModal: FC<MasterModalProps> = ({ setMaster, id }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  return (
    <div className={cn(styles.wrapper, id ? styles.opened : "")}>
      <div className={styles.screen}>
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
              className={classNames(styles.like, isLiked ? styles.liked : "")}
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
        </div>
        <div className={styles.btn}>
          <BlackButton>Записаться к мастеру</BlackButton>
        </div>
      </div>
    </div>
  );
};

export default MasterModal;
