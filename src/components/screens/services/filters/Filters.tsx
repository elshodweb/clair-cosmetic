// src/components/filters/Filters.tsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Filters.module.scss";
import FilterMenu from "@/components/UI/filterMenu/FilterMenu";
import CardsTab from "@/components/UI/cardsTab/CardsTab";
import {
  fetchSpecializations,
  selectSpecializations,
  selectSpecializationsStatus,
  selectSpecializationsError,
} from "@/store/specializations/specializationsSlice";
import { AppDispatch, RootState } from "@/store/store";

const categories = [
  { title: "Тело", slug: "telo" },
  { title: "Ногти", slug: "nogti" },
  { title: "Волосы", slug: "volosy" },
  { title: "Лицо", slug: "lico" },
];

const Filters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const specializations = useSelector(selectSpecializations);
  const status = useSelector(selectSpecializationsStatus);
  const error = useSelector(selectSpecializationsError);

  const [currentCategory, setCategory] = useState<string>(categories[0].slug);

  useEffect(() => {
    dispatch(fetchSpecializations({ categorySlugs: currentCategory }));
  }, [dispatch, currentCategory]);

  return (
    <div className={styles.wrapper}>
      <input className={styles.input} type="text" placeholder="Поиск" />
      <FilterMenu
        currentCategory={currentCategory}
        data={categories}
        filterListener={setCategory}
      />
      <div className={styles.tabs}>
        {status === "loading" && <p>Загрузка специализаций...</p>}
        {status === "failed" && <p>Ошибка: {error}</p>}
        {status === "succeeded" &&
          (specializations.length > 0 ? (
            <CardsTab data={specializations} />
          ) : (
            "На этой категории нет специализаций"
          ))}
      </div>
    </div>
  );
};

export default Filters;
