import React, { FC, useEffect, useState } from "react";
import styles from "./Services.module.scss";
import { http } from "@/utils/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";
import { formatDateTime } from "@/utils/formatData";
import BlackButton from "../../buttons/blackButton/BlackButton";
import IconButton from "../../buttons/iconButton/IconButton";

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
  console.log(servicves);

  return (
    <div className={styles.wrapper}>
      {servicves.length > 0 ? (
        servicves.map((i: any, index) => (
          <div className={styles.service} key={i.service.id}>
            <div className={styles.row}>
              <div className={styles.name}>
                {index + 1}.{i.service.title}
              </div>
              <div className={styles.price}>{i.service.price_min}₽</div>
            </div>
            <div className={styles.time}>{formatDateTime(i.datetime)}</div>
            <div className={styles.details}>
              {i.staff && (
                <div className={styles.detail}>
                  <div className={styles.detailImg}>
                    <Image
                      alt="avatar"
                      width={48}
                      height={48}
                      src={i.staff.avatar}
                    />
                  </div>
                  <div className={styles.detailInfo}>
                    <div className={styles.detailName}>{i.staff.name}</div>
                    <div className={styles.detailSubname}>
                      {i.staff.specialization.title}
                    </div>
                  </div>
                </div>
              )}
              {i.salon && (
                <div className={styles.detail}>
                  <div className={styles.detailImg}>
                    <Image
                      alt="avatar"
                      width={48}
                      height={48}
                      src={i.salon.images[0]}
                    />
                  </div>
                  <div className={styles.detailInfo}>
                    <div className={styles.detailName}>{i.salon.name}</div>
                    <div className={styles.detailSubname}>{i.salon.city}</div>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.bottom}>
              {/* <button className={styles.enlist}>Записаться</button> */}
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
      <h4 className={styles.overall}>
        <span>Итого:</span>
        <span>
          {servicves.reduce((prev, cer) => prev + cer.service.price_min, 0)}₽
        </span>
      </h4>
      <BlackButton className={styles.btnMain}>Подтвердить запись</BlackButton>
      <IconButton
        onClick={() => {
          window.location.href = "tel:+74732029777";
        }}
        className={styles.call}
      >
        <Image alt="icon" width={18} height={18} src={"/images/UI/phone.svg"} />
      </IconButton>
    </div>
  );
};

export default Services;
