import React, { FC, useEffect, useState } from "react";
import styles from "./Services.module.scss";
import { http } from "@/utils/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";

const Services: FC<any> = ({ isBasketVisible }) => {
  const [servicves, setServicves] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuth } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await http.get<any>("/services/cart/");
        setServicves(response.data.results);
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
      setServicves([]);
    }
  }, [isBasketVisible, isAuth]);

  const handleDelete = async (productId: string) => {
    try {
      await http.delete(`/services/cart/${productId}/`);
      setServicves(servicves.filter((item) => item.service.id !== productId));
    } catch (error: any) {
      console.error("Error deleting product:", error);
      setError(error.message + "An error occurred while deleting the product");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.wrapper}>
      {servicves.length > 0 ? (
        servicves.map((i: any) => (
          <div className={styles.service} key={i.service.id}>
            <div className={styles.row}>
              <div className={styles.name}>{i.service.title}</div>
              <div className={styles.price}>{i.service.price_min}₽</div>
            </div>

            <div className={styles.bottom}>
              <button className={styles.enlist}>Записаться</button>
              <button
                className={styles.trash}
                onClick={() => handleDelete(i.service.id)}
              >
                <Image
                  width={20}
                  height={20}
                  alt="trash"
                  src={"/images/shop/trash.svg"}
                />
              </button>
            </div>
          </div>
        ))
      ) : (
        <h2 className={styles.empty}>Корзина пустая</h2>
      )}
    </div>
  );
};

export default Services;
