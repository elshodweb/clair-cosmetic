import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  setBrandIds,
  setCategoryIds,
  setOrdering,
} from "@/store/filters/filtersSlice";
import Dropdown from "../Dropdown/Dropdown";
import Btn from "../Btn/Btn";
import styles from "./Filters.module.scss";
import { fetchProducts } from "@/store/magazine/productsSlice";
import { fetchBrands } from "@/store/brands/brandsSlice";
import { fetchProductCategories } from "@/store/product/productCategoriesSlice";

const Filters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { brand_ids, category_ids, ordering, page, page_size } = useSelector(
    (state: RootState) => state.filters
  );
  const { brands } = useSelector((state: RootState) => state.brands);
  const { categories } = useSelector(
    (state: RootState) => state.productCategories
  );

  useEffect(() => {
    dispatch(
      fetchProducts({ brand_ids, category_ids, ordering, page, page_size })
    );
  }, [brand_ids, category_ids, ordering, page, page_size, dispatch]);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchProductCategories());
  }, [dispatch]);

  return (
    <div className={styles.row}>
      <Dropdown
        onChange={(e: string) => dispatch(setOrdering(e))}
        lable={{ title: "Сортировка по", id: "" }}
        options={[
          { title: "Новые", id: "-created_at" },
          { title: "Старые", id: "created_at" },
          { title: "Баланс ↓", id: "-balance" },
          { title: "Баланс ↑", id: "balance" },
          { title: "Цена ↓", id: "-price" },
          { title: "Цена ↑", id: "price" },
          { title: "Новые изм.", id: "-updated_at" },
          { title: "Старые изм.", id: "updated_at" },
        ]}
      />
      <Btn children={"Скидки"} />
      <Dropdown
        options={categories}
        lable={{ title: "Тип продукта", id: "" }}
        onChange={(e: string) => dispatch(setCategoryIds(e))}
      />
      <Dropdown
        options={brands}
        lable={{ title: "Бренд", id: "" }}
        onChange={(e: string) => dispatch(setBrandIds(e))}
      />
    </div>
  );
};

export default Filters;
