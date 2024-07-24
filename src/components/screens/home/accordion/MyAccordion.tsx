import { FC, useEffect, useState } from "react";

import styles from "./MyAccordion.module.scss";
import ServiceItem from "./serviceItem/ServiceItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getNews } from "@/store/newStories/storiesSlice";
import { fetchServices } from "@/store/services/servicesSlice";
import { fetchServiceCategories } from "@/store/services/servicesCategoriesSlice";

// const serviceData = [
//   {
//     title: "Лицо",
//     content:
//       "Мы использем современные технологии, такие как Icoone Laser и RF-лифтинг, и высококачественные косметические средства.",
//   },
//   {
//     title: "Тело",
//     content:
//       "Мы использем современные технологии, такие как Icoone Laser и RF-лифтинг, и высококачественные косметические средства.",
//   },
//   {
//     title: "Волосы",
//     content:
//       "Мы использем современные технологии, такие как Icoone Laser и RF-лифтинг, и высококачественные косметические средства.",
//   },
//   {
//     title: "Ногти",
//     content:
//       "Мы использем современные технологии, такие как Icoone Laser и RF-лифтинг, и высококачественные косметические средства.",
//   },
// ];

const Services: FC = () => {
  const [isOpen, setIsOpen] = useState(null);
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.servicesCategories.categories
  );
  const categoriesStatus = useSelector(
    (state: RootState) => state.servicesCategories.status
  );
  const error = useSelector(
    (state: RootState) => state.servicesCategories.error
  );

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(fetchServiceCategories());
    }
  }, [ categoriesStatus, dispatch]);

  if (categoriesStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (categoriesStatus === "failed") {
    return <div>{error}</div>;
  }

  const clickHandler = (id: any) => {
    isOpen !== id ? setIsOpen(id) : setIsOpen(null);
  };

  return (
    <section className={styles.container}>
      <div className={styles.services_inner}>
        {categories.map((item: any) => {
          return (
            <ServiceItem
              content={item.description}
              title={item.title}
              isOpen={isOpen}
              clickHandler={clickHandler}
              index={item.id}
              key={item.id}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Services;
