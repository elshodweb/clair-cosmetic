import React, { useEffect } from "react";
import style from "./ServicesPage.module.scss";
import Loyaut from "@/components/loyaut/Loyaut";
import Title from "@/components/UI/title/Title";
import SwiperComp from "@/components/UI/slider/SwiperComp";
import ServiceCard from "../../UI/serviceCard/ServiceCard";
import Filters from "./filters/Filters";
import { useSelector } from "react-redux";

import {
  selectServices,
  selectServicesError,
  selectServicesStatus,
} from "@/store/services/servicesSliceByFilters";

const ServicesPage = () => {
  const services = useSelector(selectServices);
  const status = useSelector(selectServicesStatus);
  const error = useSelector(selectServicesError);

  return (
    <div className={style.wrapper}>
      <Loyaut>
        <div className={style.title}>
          <Title>Услуги</Title>
        </div>
        <div className={style.slider}>
          <SwiperComp />
        </div>
        <div className={style.row}>
          <div className={style.filters}>
            <Filters />
          </div>
          <div className={style.list}>
            {status === "loading" && <p>Loading services...</p>}

            {status === "failed" && <p>Error: {error}</p>}

            {status === "succeeded" && services.length > 0
              ? services.map((i: any) => (
                  <ServiceCard key={i?.id} service={i} />
                ))
              : status === "succeeded" && (
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

export default ServicesPage;
