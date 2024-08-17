import React, { FC, useState, useEffect, ChangeEvent } from "react";
import styles from "./BasketModal.module.scss";
import BlackButton from "../buttons/blackButton/BlackButton";
import Image from "next/image";
import IconButton from "../buttons/iconButton/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setBasketVisible } from "@/store/basket/basketSlice";
import FilterMenu from "@/components/screens/SingleShop/filterMenu/FilterMenu";
import Goods from "./Goods/Goods";
import Services from "./Services/Services";
type basketTypeType = "Услуги" | "Товары";

const BasketModal: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [basketType, setBasketType] = useState<basketTypeType>("Товары");
  const { isBasketVisible } = useSelector((state: RootState) => state.basket);

  return (
    <div
      className={`${styles.wrapper} ${isBasketVisible ? styles.opened : ""}`}
    >
      <div className={styles.content}>
        <div className={styles.top}>
          <h2 className={styles.hi}>корзина</h2>

          <IconButton
            className={styles.btn}
            onClick={() => dispatch(setBasketVisible(false))}
          >
            <Image
              src={"/images/header/cross.svg"}
              alt="close"
              width={16}
              height={19}
            />
          </IconButton>
        </div>
        <div className={styles.tabWrapper}>
          <FilterMenu
            currentTab={basketType}
            onTabChange={(title: any) => setBasketType(title)}
            tabs={[
              {
                title: "Товары",
              },
              {
                title: "Услуги",
              },
            ]}
          />
        </div>

        {basketType == "Товары" ? (
          <Goods isBasketVisible={isBasketVisible} />
        ) : (
          <Services isBasketVisible={isBasketVisible} />
        )}
      </div>
    </div>
  );
};

export default BasketModal;
