import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Filters.module.scss";
import FilterMenu from "@/components/UI/filterMenu/FilterMenu";
import CardsTab from "@/components/UI/cardsTab/CardsTab";
import {
  fetchSpecializations,
} from "@/store/specializations/specializationsSlice";
import {
  selectStaffsStatus,
  selectStaffsError,
} from "@/store/staffs/staffsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { fetchServiceCategories } from "@/store/services/servicesCategoriesSlice";
import { fetchServicesByFilter } from "@/store/services/servicesSliceByFilters";
import {
  fetchSpecializationsForService,
  selectSpecializationsForService,
  selectSpecializationsForServiceError,
  selectSpecializationsForServiceStatus,
} from "@/store/specializationsForService/specializationsForServiceSlice";

const Filters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const specializations = useSelector(selectSpecializationsForService);
  console.log(specializations);
  

  const specializationsStatus = useSelector(
    selectSpecializationsForServiceStatus
  );
  const specializationsError = useSelector(
    selectSpecializationsForServiceError
  );
  const staffsStatus = useSelector(selectStaffsStatus);
  const staffsError = useSelector(selectStaffsError);
  const categories = useSelector(
    (state: RootState) => state.servicesCategories.categories
  );
  const categoriesStatus = useSelector(
    (state: RootState) => state.servicesCategories.status
  );
  const error = useSelector(
    (state: RootState) => state.servicesCategories.error
  );

  const [filterData, setFilterData] = useState<{
    specialization_category_slugs: string;
    search: string;
    category_ids: string | null;
  }>({
    specialization_category_slugs: "",
    search: "",
    category_ids: null,
  });

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(fetchServiceCategories());
    }
    setFilterData({
      ...filterData,
      specialization_category_slugs: categories?.[1]?.slug,
    });
  }, [categoriesStatus, dispatch]);

  useEffect(() => {
    if (filterData.specialization_category_slugs?.length > 0) {
      dispatch(
        fetchSpecializationsForService({
          categorySlugs: filterData.specialization_category_slugs,
        })
      );
    }
  }, [dispatch, filterData.specialization_category_slugs]);

  useEffect(() => {
    dispatch(
      fetchServicesByFilter({
        search: filterData.search,
        category_ids: filterData.category_ids,
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
            category_ids: null,
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
                  setFilterData({ ...filterData, category_ids: id });
                }}
                selectedCategory={filterData.category_ids}
                data={specializations}
              />
            ) : (
              <div className={styles.message}>
                На этой категории нет специализаций
              </div>
            )}
          </>
        )}
        {/* {staffsStatus === "loading" && <p>Загрузка мастеров...</p>} */}
        {staffsStatus === "failed" && <p>Ошибка: {staffsError}</p>}
      </div>
    </div>
  );
};

export default Filters;
