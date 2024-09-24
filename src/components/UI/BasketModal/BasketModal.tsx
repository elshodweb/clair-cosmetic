import React, { FC } from "react";
import styles from "./BasketModal.module.scss";
import Image from "next/image";
import IconButton from "../buttons/iconButton/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setBasketVisible, switchBasket } from "@/store/basket/basketSlice";
import FilterMenu from "@/components/screens/SingleShop/filterMenu/FilterMenu";
import Goods from "./Goods/Goods";
import Services from "./Services/Services";

const BasketModal: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isBasketVisible, basketSwitch } = useSelector(
    (state: RootState) => state.basket
  );

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
            currentTab={basketSwitch}
            onTabChange={(title: any) => dispatch(switchBasket(title))}
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

        {basketSwitch == "Товары" ? (
          <Goods isBasketVisible={isBasketVisible} />
        ) : (
          <Services isBasketVisible={isBasketVisible} />
        )}
      </div>
    </div>
  );
};

export default BasketModal;
