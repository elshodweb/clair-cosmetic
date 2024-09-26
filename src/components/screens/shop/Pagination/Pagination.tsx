import React, { useEffect } from "react";
import styles from "./Pagination.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchProducts } from "@/store/magazine/productsSlice";
import { setPage } from "@/store/filters/filtersSlice";

const Pagination = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pagesCount = useSelector(
    (state: RootState) => state.products.pagesCount
  );
  const { brand_ids, category_ids, ordering, page, page_size } = useSelector(
    (state: RootState) => state.filters
  );

  useEffect(() => {
    dispatch(
      fetchProducts({ brand_ids, category_ids, ordering, page, page_size })
    );
  }, [page, page_size, dispatch]);

  return (
    <div className={styles.wrapper}>
      <button
        disabled={page <= 1}
        onClick={() => {
          dispatch(setPage(page - 1));
        }}
        className={styles.prev}
      ></button>

      {page > 1 && (
        <button
          className={`${styles.page}`}
          onClick={() => {
            dispatch(setPage(page - 1));
          }}
        >
          {page - 1}
        </button>
      )}
      <button className={`${styles.page} ${styles.selected}`}>{page}</button>
      {pagesCount > page && (
        <button
          className={styles.page}
          onClick={() => {
            dispatch(setPage(page + 1));
          }}
        >
          {page + 1}
        </button>
      )}
      <button
        disabled={pagesCount <= page}
        onClick={() => {
          dispatch(setPage(page + 1));
        }}
        className={styles.next}
      ></button>
    </div>
  );
};

export default Pagination;
