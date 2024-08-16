  import React, { useState } from "react";
  import styles from "./Product.module.scss";
  import Image from "next/image";
  import Link from "next/link";
  import BlackArrowButton from "@/components/UI/buttons/blackArrowButton/BlackArrowButton";
  import Counter from "../Counter/Counter";
  import FilterMenu from "../filterMenu/FilterMenu";
  import { http } from "@/utils/axiosInstance";

  interface ProductProps {
    product: any;
  }

  const Product: React.FC<ProductProps> = ({ product }) => {
    const [activeTab, setActiveTab] = useState<string>("Состав");
    const [quantity, setQuantity] = useState<number>(1);

    const tabData = [{ title: "Состав" }, { title: "Применение" }];

    const tabContent =
      activeTab === "Состав" ? product.structure : product.application;

    const handleTabChange = (title: string) => {
      setActiveTab(title);
    };

    const handleAddToCart = async () => {
      try {
        const response = await http.post("/products/cart/", {
          product: product.id,
          quantity: quantity,
        });

        // Handle the response (e.g., show a success message or update UI)
        console.log("Product added to cart:", response.data);
      } catch (error: any) {
        // Handle errors (e.g., show an error message)
        console.error("Error adding product to cart:", error.message);
      }
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
            <button onClick={() => {}} className={styles.like}></button>
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
            <strong>{product.sale} </strong>
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
