import React, { useEffect } from "react";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./Salon.module.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchSalons } from "@/store/salons/salonSlice";

const Salon = () => {
  const dispatch = useDispatch<AppDispatch>();
  const salons = useSelector((state: RootState) => state.salons.salons);
  const status = useSelector((state: RootState) => state.salons.status);
  const error = useSelector((state: RootState) => state.salons.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSalons());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }

  return (
    <div className={style.wrapperRow}>
      <div className={style.row}>
        {salons.map((i) => (
          <div className={style.slide} key={i.id}>
            <div className={style.wrapper}>
              <Image
                className={style.img}
                src={i.images[0]}
                alt="salon"
                width={900}
                height={350}
              />
              <div className={style.name}>{i.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Salon;
