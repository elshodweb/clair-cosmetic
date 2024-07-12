import React, { FC, useEffect } from "react";
import styles from "./NewsModal.module.scss";
import cn from "classnames";
import IconButton from "@/components/UI/buttons/iconButton/IconButton";
import Image from "next/image";
interface NewsModalProps {
  id: number | null;
  setNews: (id: number | null) => void;
}
const NewsModal: FC<NewsModalProps> = ({ id, setNews }) => {
  useEffect(() => {
    if (id) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [id]);
  return (
    <div
      onClick={(e) => {
        setNews(null);
      }}
      className={cn(styles.wrapper, id ? styles.opened : "")}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.screen}>
        <IconButton
          className={styles.exitBtn}
          onClick={() => {
            setNews(null);
          }}
        >
          <Image
            src={"/images/header/cross.svg"}
            alt="cart"
            width={16}
            height={19}
          />
        </IconButton>
        <section className={styles.section}>
          <h2 className={styles.title}>
            Большой книжный фестиваль «Фонарь» и гаражная распродажа
          </h2>
          <h3 className={styles.subtitle}>
            23 июля на площадке @rassvet.bistrobar пройдёт Большой книжный
            фестиваль «Фонарь» и гаражная распродажа.
          </h3>
          <p className={styles.descr}>
            Благотворительный гаражный маркет «Фонарь» @fonarr_market теперь
            светит и в Воронеже! «Фонарь» объявляет сбор книг, которые будут
            проданы на гаражке за символическую стоимость. Принимаются любые
            книги, которые ты готова безвозмездно передать следующим читателям.
            Салоны Clair являются одной из точек сбора книг, и до 21.07 наши
            админчики примут у тебя книги для «Фонаря».
          </p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.title}>Куда пойдут средства?</h2>
          <h3 className={styles.subtitle}>
            Все вырученные средства пойдут на помощь фонда «Продвижение»
            @fond_prodvizhenie, который делает легкие и мобильные коляски для
            людей, которые в них нуждаются.
          </h3>
          <p className={styles.descr}>
            Книги, которые не купят на гаражке, уедут в сельские библиотеки и в
            пункты эко-сбора.Каждая книга важна и обязательно найдет нового
            читателя!
          </p>
          <h3 className={styles.subtitle}>
            Разбери книжные полки и прими участие в добром деле!
          </h3>
        </section>
        <div className={styles.img}>
          <Image
            src={"/images/news/item-1.png"}
            alt="news image"
            width={560}
            height={560}
          />
        </div>
        <time className={styles.date}>16.07.2023</time>
      </div>
    </div>
  );
};

export default NewsModal;
