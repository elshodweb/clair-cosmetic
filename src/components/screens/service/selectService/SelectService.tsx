import React from "react";
import styles from "./SelectService.module.scss";
import MyInput from "@/components/UI/myInput/MyInput";
import BlackArrowButton from "@/components/UI/buttons/blackArrowButton/BlackArrowButton";
const SelectService = () => {
  const array = [
    { name: "HydraFacial Базовый сервис", price: "5250 ₽" },
    { name: "HydraFacial Премиальный сервис", price: "8600 ₽" },
    { name: "Комплексный уход Icoone Laser", price: "3000 ₽" },
    { name: "Аппаратный антивозрастной уход", price: "3000 ₽" },
    { name: "OnMacabim Уход для проблемной кожи", price: "5250 ₽" },
    { name: "OnMacabim Лифтинговый уход", price: "3000 ₽" },
    { name: "OnMacabim Уход для проблемной кожи", price: "5250 ₽" },
  ];
  return (
    <div className={styles.wrapper}>
      <p className={styles.descr}>
        Профессиональный уход за лицом и за телом. Это обширное понятие, под
        которым подразумевается разглаживание мелких морщинок, коррекция формы
        бровей, выравнивание цвета лица, восковая депиляция.
      </p>
      <div className={styles.basket}>
        <div className={styles.selects}>
          {array &&
            array.map((i,index) => (
              <MyInput
                key={index}
                name={i.name}
                price={i.price}
                onChange={(i) => {
                }}
              />
            ))}
        </div>
        <BlackArrowButton>Добавить в корзину</BlackArrowButton>
      </div>
    </div>
  );
};

export default SelectService;
