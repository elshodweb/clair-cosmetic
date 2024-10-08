import React, { useEffect, useState } from "react";
import styles from "./Product.module.scss";
import Image from "next/image";
import Link from "next/link";
import BlackArrowButton from "@/components/UI/buttons/blackArrowButton/BlackArrowButton";
import Counter from "../Counter/Counter";
import FilterMenu from "../filterMenu/FilterMenu";
import { http } from "@/utils/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ProductProps {
  product: any;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<string>("Состав");
  const [quantity, setQuantity] = useState<number>(1);
  const [isLiked, setLiked] = useState<boolean>(false);
  const { isAuth } = useSelector((state: RootState) => state.auth);

  const tabData = [{ title: "Состав" }, { title: "Применение" }];
  useEffect(() => {
    setLiked(product.is_favorite);
  }, [product.is_favorite]);

  const handlerLike = () => {
    if (isAuth) {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;
      if (!isLiked) {
        http(token).post("/products/favorites/", {
          product: product.id,
        });
      } else {
        http(token).delete("/products/favorites/" + product.id);
      }
      setLiked(!isLiked);
    }
  };
  const tabContent =
    activeTab === "Состав" ? product.structure : product.application;

  const handleTabChange = (title: string) => {
    setActiveTab(title);
  };

  const handleAddToCart = async () => {
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;

      const response = await http(token).post("/products/cart/", {
        product: product.id,
        quantity: quantity,
      });
    } catch (error: any) {}
  };

  return (
    <div className={styles.row}>
      <div className={styles.img}>
        <Image
          src={product.images?.[0]?.image}
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
          <button
            onClick={handlerLike}
            className={`${styles.like} ${isLiked ? styles.liked : ""}`}
          ></button>
        </div>
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.descr}>{product.description}</p>
        <div className={styles.tabs}>
          <FilterMenu
            currentTab={activeTab}
            tabs={tabData}
            onTabChange={handleTabChange}
          />
        </div>
        <div className={styles.sostavTitle}>{activeTab}:</div>
        <p className={styles.sostav}>
          {tabContent || `${activeTab} не указано`}
        </p>
        <div className={styles.price}>
          <strong>{product.price} </strong>
          {product.previous_price && <span>{product.previous_price} </span>}
        </div>
        <div className={styles.btns}>
          <Counter count={quantity} getQuantity={(qty) => setQuantity(qty)} />
          <div className={styles.addBtn}>
            <BlackArrowButton onClick={handleAddToCart}>
              Добавить в корзину
            </BlackArrowButton>
          </div>
        </div>
        <Link className={styles.link} href={"#"}>
          Торговая декларация
        </Link>
      </div>
    </div>
  );
};

export default Product;
