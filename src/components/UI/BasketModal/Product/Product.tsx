import React, { FC, useState } from "react";
import styles from "./Product.module.scss";
import Counter from "@/components/screens/SingleShop/Counter/Counter";
import Image from "next/image";
import { http } from "@/utils/axiosInstance";

export interface ProductProps {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  quantity: number;
  onDelete: (id: string) => void;
  onQuantityChange: (id: string, newQuantity: number) => void;
}

const Product: FC<ProductProps> = ({
  id,
  name,
  brand,
  price,
  image,
  quantity,
  onDelete,
  onQuantityChange,
}) => {
  const [currentQuantity, setCurrentQuantity] = useState<number>(quantity);

  const handleQuantityChange = (qty: number) => {
    setCurrentQuantity(qty);
    onQuantityChange(id, qty); // Notify parent component about quantity change
  };

  const handleDelete = async () => {
    try {
      await http.delete(`/products/cart/${id}/`);
      onDelete(id); // Notify parent component about deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.img}>
          {image && (
            <Image
              src={image}
              alt={"product"}
              width={100}
              height={100}
              layout="responsive"
            />
          )}
        </div>
        <div className={styles.details}>
          <h4 className={styles.name}>{name}</h4>
          <h5 className={styles.brand}>{brand}</h5>
          <div className={styles.count}>
            <Counter count={currentQuantity} getQuantity={handleQuantityChange} />
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.price}>{price}</div>
        <button className={styles.removeBtn} onClick={handleDelete}>
          <Image
            width={20}
            height={20}
            alt="trash"
            src={"/images/shop/trash.svg"}
          />
        </button>
      </div>
    </div>
  );
};

export default Product;
