import React, { useEffect } from "react";
import styles from "./ShopPage.module.scss";
import Loyaut from "@/components/loyaut/Loyaut";
import Title from "@/components/UI/title/Title";
import SwiperComp from "@/components/UI/slider/SwiperComp";
import Filters from "./filters/Filters";
import BigCard from "@/components/UI/cards/bigCard/BigCard";
import SmallCard from "@/components/UI/cards/smallCard/SmallCard";
import Pagination from "./Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchProducts } from "@/store/magazine/productsSlice";
import Container from "@/components/container/Container";

const ShopPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, page_size: 27 }));
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <Loyaut>
        <div className={styles.hero}>
          <Container>
            <Title className={styles.title}>магазин</Title>
          </Container>
          <div className={styles.news}>
            <SwiperComp />
          </div>
        </div>
        <Container>
          <div className={styles.products}>
            <Filters />
            <div className={styles.cards}>
              {status === "loading" && <p>Loading...</p>}
              {status === "failed" && <p>Error loading products</p>}
              {status === "succeeded" &&
                products.length > 0 &&
                products.map((product: any, index) => {
                  if (index === 0 || index === 12 || index === 18)
                    return <BigCard key={product.id} data={product} />;
                  else return <SmallCard key={product.id} data={product} />;
                })}
            </div>
            <Pagination />
          </div>
        </Container>
      </Loyaut>
    </div>
  );
};

export default ShopPage;
