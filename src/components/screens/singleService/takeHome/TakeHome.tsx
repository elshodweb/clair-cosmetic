// components/takeHome/TakeHome.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import SmallCard from "@/components/UI/cards/smallCard/SmallCard";
import styles from "./TakeHome.module.scss";
import {
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsStatus,
} from "@/store/productByService/productsByServiceSlice";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/router";

const TakeHome = () => {
  const {
    query: { id },
  } = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    if (id) {
      dispatch(fetchProducts(id));
    }
  }, [dispatch, id]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.row}>
      <Swiper
        spaceBetween={15}
        modules={[FreeMode]}
        freeMode={true}
        breakpoints={{
          0: { freeMode: false, slidesPerView: 1 },
          600: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
          1150: { slidesPerView: 4 },
          1400: { slidesPerView: 5 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className={styles.slide}>
            <SmallCard data={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TakeHome;
