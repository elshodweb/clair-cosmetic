import React from "react";
import styles from "./Product.module.scss";
import MyTabs from "@/components/UI/myTabs/MyTabs";
import SmallTitle from "@/components/UI/smallTitle/SmallTitle";
import Link from "next/link";
import Counter from "../Counter/Counter";
import Image from "next/image";
import FilterMenu from "@/components/UI/filterMenu/FilterMenu";
import BlackArrowButton from "@/components/UI/buttons/blackArrowButton/BlackArrowButton";
const data = [{ title: "Состав" }, { title: "Применение" }];
const Product = () => {
  function tabfunc(title: string) {}
  return (
    <div className={styles.row}>
      <div className={styles.img}>
        <Image
          src={"/images/shop/product1.png"}
          alt="product"
          width={660}
          height={800}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.top}>
          <div className={styles.path}>
            Уход за волосами / Кудрявые волосы / Новинки
          </div>
          <div className={styles.like}></div>
        </div>
        <h1 className={styles.title}>
          Шампунь «Так и Ходи» для объёмных кудрей и волн с запахом кардамона
        </h1>
        <p className={styles.descr}>
          Хорошо промывает, не пересушивает волосы и кожу головы даже в жёсткой
          воде, а ещё от него так и веет спокойствием. Не содержит сульфатов.
          Шампунь подойдет для всех типов кожи головы.
        </p>
        <div className={styles.tabs}>
          <FilterMenu data={data} filterListener={tabfunc} />
        </div>
        <div className={styles.sostavTitle}>Состав:</div>
        <p className={styles.sostav}>
          Вода, кокамидопропил бетаин, натрия кокоил изетионат, каприлил каприл
          глюкозид, лаурил глюкозид, кокоглюкозид, глицерин, пищевой
          ароматизатор, морская соль, сорбат калия, бензоат натрия, гуар
          гидроксипропилтримоний хлорид, эфирное масло кардамона.
        </p>
        <div className={styles.price}>
          <strong>5 050 ₽</strong>
          <span>5 550 ₽</span>
        </div>
        <div className={styles.btns}>
          <Counter />
          <div className={styles.addBtn}>
            <BlackArrowButton>Добавить в корзину</BlackArrowButton>
          </div>
        </div>
        <Link className={styles.link} href={"#"}>Торговая декларация</Link>
      </div>
    </div>
  );
};

export default Product;
