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
import {
  fetchStaffs,
  selectStaffs,
  selectStaffsStatus,
  selectStaffsError,
} from "@/store/staffs/staffsSlice";
import { AppDispatch } from "@/store/store";

const categories = [
  { title: "Тело", slug: "telo" },
  { title: "Ногти", slug: "nogti" },
  { title: "Волосы", slug: "volosy" },
  { title: "Лицо", slug: "lico" },
];

const Filters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const specializations = useSelector(selectSpecializations);
  const specializationsStatus = useSelector(selectSpecializationsStatus);
  const specializationsError = useSelector(selectSpecializationsError);
  const staffsStatus = useSelector(selectStaffsStatus);
  const staffsError = useSelector(selectStaffsError);

  const [filterData, setFilterData] = useState<{
    specialization_category_slugs: string;
    search: string;
    specialization_ids: string | null;
  }>({
    specialization_category_slugs: categories[0].slug,
    search: "",
    specialization_ids: null,
  });

  useEffect(() => {
    dispatch(
      fetchSpecializations({
        categorySlugs: filterData.specialization_category_slugs,
      })
    );
  }, [dispatch, filterData.specialization_category_slugs]);

  useEffect(() => {
    dispatch(
      fetchStaffs({
        search: filterData.search,
        specialization_category_slugs: filterData.specialization_category_slugs,
        specialization_ids: filterData.specialization_ids,
      })
    );
  }, [dispatch, filterData]);

  return (
    <div className={styles.wrapper}>
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFilterData({ ...filterData, search: e.currentTarget.value });
        }}
        value={filterData.search}
        className={styles.input}
        type="text"
        placeholder="Поиск"
      />
      <FilterMenu
        currentCategory={filterData.specialization_category_slugs}
        data={categories}
        filterListener={(slug) =>
          setFilterData({
            ...filterData,
            specialization_ids: null,
            specialization_category_slugs: slug,
          })
        }
      />
      <div className={styles.tabs}>
        {specializationsStatus === "loading" && (
          <p>Загрузка специализаций...</p>
        )}
        {specializationsStatus === "failed" && (
          <p>Ошибка: {specializationsError}</p>
        )}
        {specializationsStatus === "succeeded" && (
          <>
            {specializations.length > 0 ? (
              <CardsTab
                filterListener={(id: string) => {
                  setFilterData({ ...filterData, specialization_ids: id });
                }}
                selectedCategory={filterData.specialization_ids}
                data={specializations}
              />
            ) : (
              <div className={styles.message}>
                На этой категории нет специализаций
              </div>
            )}
          </>
        )}
        {staffsStatus === "loading" && <p>Загрузка мастеров...</p>}
        {staffsStatus === "failed" && <p>Ошибка: {staffsError}</p>}
      </div>
    </div>
  );
};

export default Filters;
