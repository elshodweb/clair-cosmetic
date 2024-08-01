import React, { useEffect, useState } from "react";
import style from "./HomeScreen.module.scss";
import Loyaut from "@/components/loyaut/Loyaut";
import Title from "@/components/UI/title/Title";
import SwiperComp from "@/components/UI/slider/SwiperComp";
import AccordionUsage from "@/components/screens/home/accordion/MyAccordion";
import ArrowLink from "@/components/UI/arrowLink/ArrowLink";
import MyTabs from "@/components/UI/myTabs/MyTabs";
import ShopCards from "@/components/UI/cards/shopCards/ShopCards";
import MasterContainer from "@/components/screens/home/masters/MasterContainer/MasterContainer";
import NewsDecor from "@/components/screens/home/news/NewsDecor/NewsDecor";
import NewsCards from "@/components/screens/home/news/NewsCards/NewsCards";
import Salon from "@/components/screens/home/salon/Salon";
import DownloadApp from "@/components/UI/buttons/DownloadApp/DownloadApp";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchProductCategories } from "@/store/product/productCategoriesSlice";
import { fetchProducts } from "@/store/productHomePage/productsSlice";
import { fetchMasterCategories } from "@/store/masters/masterCategoriesSlice";
import { fetchMasters } from "@/store/masters/mastersSlice";
import { fetchNews } from "@/store/news/homeNewsSlice";

const HomeScreen = () => {
  function filterListener(params: string) {
    dispatch(fetchProducts({ categoryId: params, page: 1, pageSize: 10 }));
  }
  function filterListenerMaster(params: string) {
    dispatch(fetchMasters({ categoryId: params, page: 1, pageSize: 10 }));
  }

  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector(
    (state: RootState) => state.productCategories.categories
  );
  const mastersCategory = useSelector(
    (state: RootState) => state.masterCategories.categories
  );
  const products = useSelector(
    (state: RootState) => state.productsHome.products
  );
  const masters = useSelector((state: RootState) => state.masters.masters);

  const statusCategory = useSelector(
    (state: RootState) => state.productCategories.status
  );
  const statusProducts = useSelector(
    (state: RootState) => state.productsHome.status
  );
  const statusMasters = useSelector((state: RootState) => state.masters.status);
  const statusMastersCategory = useSelector(
    (state: RootState) => state.masterCategories.status
  );

  const errorMastersCategory = useSelector(
    (state: RootState) => state.masterCategories.error
  );
  const errorCategory = useSelector(
    (state: RootState) => state.productCategories.error
  );
  const errorProducts = useSelector(
    (state: RootState) => state.productsHome.error
  );
  const errorMasters = useSelector((state: RootState) => state.masters.error);

  useEffect(() => {
    if (statusCategory === "idle") {
      dispatch(fetchProductCategories());
    }
    if (statusProducts === "idle") {
      dispatch(fetchProducts({ page: 1, pageSize: 8 }));
    }
    if (statusMastersCategory === "idle") {
      dispatch(fetchMasterCategories());
    }
    if (statusProducts === "idle") {
      dispatch(fetchMasters({ page: 1, pageSize: 8 }));
    }
  }, [statusCategory, statusProducts, statusMastersCategory, dispatch]);

  // if (
  //   statusCategory === "failed" ||
  //   statusProducts === "failed" ||
  //   statusMastersCategory === "failed" ||
  //   statusMasters === "failed"
  // )
  //   return (
  //     <div>
  //       Error:{" "}
  //       {errorCategory || errorProducts || errorMastersCategory || errorMasters }
  //     </div>
  //   );

  return (
    <div className={style.wrapper}>
      <Loyaut>
        <div className={style.hi}>
          <Title>
            <span>СЕГОДНЯ ТЫ</span>
            <span className={style.space}>ПРЕКРАСНА</span>
          </Title>
        </div>
        <div className={style.trends}>
          <SwiperComp />
          <DownloadApp />
        </div>
        <div className={style.services}>
          <Title>Услуги</Title>
          <AccordionUsage />
          <ArrowLink href="/services">Все услуги</ArrowLink>
        </div>
        <div className={style.shop}>
          <div className={style.row}>
            <Title>магазин</Title>
            {statusCategory === "loading" ? (
              "loading..."
            ) : (
              <MyTabs filterListener={filterListener} data={categories} />
            )}
          </div>
          {statusProducts === "loading" ? (
            "loading..."
          ) : (
            <ShopCards data={products} />
          )}
          <ArrowLink href="/shop" children="Посмотреть магазин" />
        </div>
        <div className={style.masters}>
          <div className={style.row}>
            <Title>мастера</Title>
            <MyTabs
              filterListener={filterListenerMaster}
              data={mastersCategory}
            />
          </div>
          <MasterContainer data={masters} />
          <ArrowLink href="/masters" children="Все мастера" />
        </div>
        <div className={style.masters}>
          <NewsDecor />
          <NewsCards />
          <ArrowLink href="/news" children="Все новости" />
        </div>
        <div className={style.salon}>
          <Title>салоны</Title>
          <Salon />
        </div>
      </Loyaut>
    </div>
  );
};

export default HomeScreen;
