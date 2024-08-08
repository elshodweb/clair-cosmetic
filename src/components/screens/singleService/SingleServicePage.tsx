import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./SingleServicePage.module.scss";
import Title from "@/components/UI/title/Title";
import SelectService from "./selectService/SelectService";
import Loyaut from "@/components/loyaut/Loyaut";
import SmallTitle from "@/components/UI/smallTitle/SmallTitle";
import Masters from "./masters/Masters";
import TakeAway from "./takeAway/TakeAway";
import ArrowLink from "@/components/UI/arrowLink/ArrowLink";
import TakeHome from "./takeHome/TakeHome";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/router";
import { fetchService } from "@/store/services/singleService";

const SingleServicePage = () => {
  const {
    query: { id },
  } = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.service
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchService(id));
    }
  }, [dispatch, id]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return <p>No service data found.</p>;
  }

  return (
    <div className={styles.wrapper}>
      <Loyaut>
        <h3 className={styles.subtitle}>{data?.category?.title}</h3>
        <Title children={data.title} />
        <SelectService data={data} />
        <div className={styles.masters}>
          <SmallTitle>Кто делает</SmallTitle>
          <Masters staffs={data.staffs} />
        </div>
        <div className={styles.take}>
          <SmallTitle>Возьми вместе</SmallTitle>
          <TakeAway services={data.services_at_same_time.slice(0, 8)} />
          <ArrowLink children="Все услуги" href="/services" />
        </div>
        <div className={styles.take}>
          <SmallTitle>Возьми домой</SmallTitle>
          <TakeHome  />
          <ArrowLink children="Магазин" href="/shop" />
        </div>
      </Loyaut>
    </div>
  );
};

export default SingleServicePage;
