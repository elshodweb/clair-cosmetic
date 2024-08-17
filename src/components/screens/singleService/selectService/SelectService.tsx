import React, { FC } from "react";
import styles from "./SelectService.module.scss";
import MyInput from "@/components/UI/myInput/MyInput";
import BlackArrowButton from "@/components/UI/buttons/blackArrowButton/BlackArrowButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { http } from "@/utils/axiosInstance";

const SelectService: FC<any> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();

  const addToCart = async () => {
    try {
      const response = await http.post("/services/cart/", {
        service: data.id, // Отправляем только id продукта
      });
      console.log("Product added to cart successfully:", response.data);
      // Дополнительные действия после успешного добавления, если нужно
    } catch (error) {
      console.error("Error adding product to cart:", error);
      // Обработка ошибки, если нужно
    }
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.descr}>{data.description}</p>
      <div className={styles.basket}>
        <div className={styles.selects}>
          {data.services_at_same_time.length > 0 &&
            data.services_at_same_time
              .slice(0, 8)
              .map((i: any, index: number) => (
                <MyInput
                  key={index}
                  name={i.title}
                  price={i.price}
                  description={i.description}
                  onChange={(i: any) => {}}
                />
              ))}
        </div>
        <BlackArrowButton onClick={addToCart}>
          Добавить в корзину
        </BlackArrowButton>
      </div>
    </div>
  );
};

export default SelectService;
