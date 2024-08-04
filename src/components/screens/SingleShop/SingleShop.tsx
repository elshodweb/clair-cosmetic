import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import styles from "./SingleShopPage.module.scss";
import Loyaut from "@/components/loyaut/Loyaut";
import SmallTitle from "@/components/UI/smallTitle/SmallTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import Product from "./Product/Product";
import { fetchSingleProduct } from "@/store/singleProduct/productSlice";
import SmallCard from "@/components/UI/cards/smallCard/SmallCard";
import { useRouter } from "next/router";
import instance, { http } from "@/utils/axiosInstance";
import { fetchViewedProducts } from "@/store/viewd/viewedProductsSlice";

const SingleShop = () => {
  const {
    query: { id },
  } = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { product, status, error } = useSelector(
    (state: RootState) => state.singleProduct
  );
  const { isAuth } = useSelector((state: RootState) => state.auth);

  const {
    products: viewedProducts,
    error: viewedProductsError,
    status: viewedProductsStatus,
  } = useSelector((state: RootState) => state.viewedProducts);


  useEffect(() => {
    if (typeof id === "string" && id) {
      dispatch(fetchSingleProduct(id));

      dispatch(fetchViewedProducts());

      if (isAuth) {
        try {
          http.post("/products/viewed/", { product: id });
        } catch (error) {
        }
      }
    }
  }, [dispatch, id]);

  return (
    <div className={styles.wrapper}>
      <Loyaut>
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error}</p>}
        {status === "succeeded" && product && <Product product={product} />}
        <SmallTitle>Рекомендации</SmallTitle>
        <div className={styles.row}>
          <Swiper
            spaceBetween={15}
            modules={[FreeMode]}
            freeMode={true}
            breakpoints={{
              0: {
                freeMode: false,
                slidesPerView: 1,
              },
              600: {
                slidesPerView: 2,
              },
              900: {
                slidesPerView: 3,
              },
              1150: {
                slidesPerView: 4,
              },
              1400: {
                slidesPerView: 5.3,
              },
            }}
          >
            {product?.recommendations?.map((i: any) => (
              <SwiperSlide key={i.id} className={styles.slide}>
                <SmallCard data={i} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {viewedProducts.length > 0 && (
          <>
            <SmallTitle>Просмотрено</SmallTitle>
            <div className={styles.row}>
              <Swiper
                spaceBetween={15}
                modules={[FreeMode]}
                freeMode={true}
                breakpoints={{
                  0: {
                    freeMode: false,
                    slidesPerView: 1,
                  },
                  600: {
                    slidesPerView: 2,
                  },
                  900: {
                    slidesPerView: 3,
                  },
                  1150: {
                    slidesPerView: 4,
                  },
                  1400: {
                    slidesPerView: 5,
                  },
                }}
              >
                {viewedProducts?.map((i: any) => (
                  <SwiperSlide key={i.id} className={styles.slide}>
                    <SmallCard data={i} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>
        )}
      </Loyaut>
    </div>
  );
};

export default SingleShop;
