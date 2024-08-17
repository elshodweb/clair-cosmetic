import React, { FC, useEffect, useState } from "react";
import styles from "./Goods.module.scss";
import Product, { ProductProps } from "../Product/Product";
import OutlineButton from "../../buttons/outlineButton/OutlineButton";
import { http } from "@/utils/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    product: {
      id: string;
      title: string | null;
      brand: {
        title: string | null;
      } | null;
      sale: string | null;
      previous_price: string | null;
      images: {
        image: string | null;
      }[];
    } | null;
    quantity: number;
  }[];
}

const Goods: FC<{ isBasketVisible: boolean }> = ({ isBasketVisible }) => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuth } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await http.get<ApiResponse>("/products/cart/");
        const fetchedProducts: ProductProps[] = response.data.results.map(
          (item) => ({
            id: item.product?.id || "",
            name: item.product?.title || "Unknown",
            brand: item.product?.brand?.title || "Unknown",
            price: item.product?.sale || "0 ₽",
            image: item.product?.images[0]?.image || "",
            quantity: item.quantity,
            onDelete: (id: string) => handleDelete(id),
            onQuantityChange: (id: string, newQuantity: number) =>
              handleQuantityChange(id, newQuantity),
          })
        );

        setProducts(fetchedProducts);
        setLoading(false);
      } catch (error: any) {
        if (error.response.status === 401 && isAuth) {
          window.location.reload();
        }
        setError(error.message || "An error occurred");
        setLoading(false);
      }
    };

    if (isBasketVisible) {
      fetchProducts();
    } else {
      setProducts([]); // Clear products if basket is not visible
    }
  }, [isBasketVisible]);

  const handleDelete = async (productId: string) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handleQuantityChange = async (
    productId: string,
    newQuantity: number
  ) => {
    try {
      await http.post(`/products/cart/`, {
        quantity: newQuantity,
        product: productId,
      });
    } catch (error: any) {
      console.error("Error updating quantity:", error);
    }
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      if (product.price !== "Unknown" && product.price !== "0 ₽") {
        const price = parseFloat(
          product.price.replace(" ₽", "").replace(/\s/g, "")
        );
        return total + price * product.quantity;
      } else {
        return total;
      }
    }, 0);
  };

  const totalAmount = calculateTotal();
  const discountAmount = 5800; // Example discount amount, update based on your logic
  const discountedTotal = totalAmount - discountAmount;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.wrapper}>
      {products.length > 0 ? (
        products.map((product) => <Product key={product.id} {...product} />)
      ) : (
        <p>No products found.</p>
      )}
      {products.length > 0 && (
        <div className={styles.summary}>
          <span>Итого:</span>
          <div className={styles.numbers}>
            <div className={styles.discountedTotal}>
              {discountedTotal.toLocaleString()} ₽
            </div>
            {discountAmount > 0 && (
              <div className={styles.sale}>
                <span>-{discountAmount.toLocaleString()} ₽</span>
              </div>
            )}
          </div>
        </div>
      )}
      <OutlineButton className={styles.blackBtn} onClick={() => {}}>
        Оформить заказ
      </OutlineButton>
    </div>
  );
};

export default Goods;
