// src/pages/MastersPage.tsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./MastersPage.module.scss";
import Loyaut from "@/components/loyaut/Loyaut";
import Title from "@/components/UI/title/Title";
import MastersCards from "@/components/screens/home/masters/MastersCards/MastersCards";
import Filters from "./filters/Filters";
import {
  fetchStaffs,
  selectStaffs,
  selectStaffsStatus,
  selectStaffsError,
} from "@/store/staffs/staffsSlice";
import { AppDispatch, RootState } from "@/store/store";

const MastersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const staffs = useSelector(selectStaffs);
  const status = useSelector(selectStaffsStatus);
  const error = useSelector(selectStaffsError);

  useEffect(() => {
    dispatch(
      fetchStaffs({
        search: "",
        specialization_category_slugs: "telo",
        specialization_ids: null,
      })
    );
  }, [dispatch]);

  return (
    <div className={style.wrapper}>
      <Loyaut>
        <div className={style.title}>
          <Title>Мастера</Title>
        </div>
        <div className={style.row}>
          <div className={style.filters}>
            <Filters />
          </div>

          <div className={style.list}>
            {status === "loading" && <p>Загрузка мастеров...</p>}
            {status === "failed" && <p>Ошибка: {error}</p>}
            {status === "succeeded" && staffs.length > 0 ? (
              <MastersCards data={staffs} />
            ) : (
              <div className={style.message}>
                По вашему запросу мастеров не найдено. Пожалуйста, измените
                поисковый запрос или параметры фильтрации.
              </div>
            )}
          </div>
        </div>
      </Loyaut>
    </div>
  );
};

export default MastersPage;
