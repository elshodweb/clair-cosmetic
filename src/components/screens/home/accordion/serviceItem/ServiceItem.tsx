"use client";
import { FC, useEffect, useState } from "react";
import styles from "./ServiceItem.module.scss";
import ItemPrice from "./itemPrice/ItemPrice";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchServices } from "@/store/services/servicesSlice";

interface props {
  index: string;
  isOpen: any;
  title: string;
  content: string;
  clickHandler: (index: any) => void;
}

const ServiceItem: FC<props> = ({
  content,
  title,
  index,
  isOpen,
  clickHandler,
}) => {
  const [isDesktop, setIsDesktop] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const subCategories = useSelector(
    (state: RootState) => state.servicesCategories.subCategories
  );
  const services = useSelector((state: RootState) => state.services.services);
  const categoriesStatus = useSelector(
    (state: RootState) => state.servicesCategories.status
  );
  const servicesStatus = useSelector(
    (state: RootState) => state.servicesCategories.status
  );
  const error = useSelector(
    (state: RootState) => state.servicesCategories.error || state.services.error
  );

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 850);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 850);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (servicesStatus === "idle") {
      dispatch(fetchServices());
    }
  }, [servicesStatus, dispatch]);

  if (categoriesStatus === "loading" || servicesStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (categoriesStatus === "failed" || servicesStatus === "failed") {
    return <div>{error}</div>;
  }

  console.log(services);

  return (
    <div
      className={`${styles.container} ${
        index == isOpen ? styles.activeContainer : ""
      }`}
      style={{
        background: `linear-gradient(180deg, #FFF 0%, ${
          index == isOpen ? "#FFEDFF" : "#FFEDFF"
        } 100%)`,
      }}
    >
      <div onClick={() => clickHandler(index)} className={styles.header}>
        <div className={styles.header_inner}>
          <h2 className={styles.title}>{title}</h2>
          <button>
            <img
              className={
                index == isOpen ? styles.arrow_top : styles.arrow_bottom
              }
              src="./images/services/arrow.svg"
              alt="arrow"
            />
          </button>
        </div>
      </div>

      <div className={index == isOpen ? styles.body_open : styles.body_close}>
        <div className={styles.body_inner}>
          <div className={styles.info}>
            <div className={styles.text}>{content}</div>
            <div className={styles.img_container}>
              {isDesktop ? (
                <Image
                  style={{ display: `${index == isOpen ? "block" : "none"}` }}
                  src="/images/home/girl.png"
                  alt="girl"
                  width={253}
                  height={284}
                />
              ) : (
                <Image
                  style={{ display: `${index == isOpen ? "block" : "none"}` }}
                  src="/images/home/girl-m.png"
                  alt="girl"
                  width={170}
                  height={193}
                />
              )}
            </div>
          </div>

          <div className={styles.price_list}>
            {subCategories
              .filter((i: any) => i.parent.id === index)
              .slice(0, 4)
              .map((el) => (
                <ItemPrice data={el} />
              ))}
            <div className={styles.button_container}>
              <Link href="/face">
                <button className={styles.showAll_button}>
                  Посмотреть все
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
