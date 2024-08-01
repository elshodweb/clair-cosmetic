"use client"; // <===== REQUIRED
import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import Image from "next/image";
import style from "./SliderComp.module.scss";
import { FreeMode } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getNews } from "@/store/newStories/storiesSlice";
import OpdenedSlider from "./opdenedSlider/OpdenedSlider";
const SwiperComp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const news = useSelector((state: RootState) => state.news.news);
  const newsStatus = useSelector((state: RootState) => state.news.status);
  const error = useSelector((state: RootState) => state.news.error);
  const [isOpen, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (newsStatus === "idle") {
      dispatch(getNews());
    }
  }, [newsStatus, dispatch]);

  if (newsStatus === "loading") {
    return <div>Loading...</div>;
  }

  // if (newsStatus === "failed") {
  //   return <div>{error}</div>;
  // }
  
  return (
    <Swiper
      spaceBetween={12}
      slidesPerView={"auto"}
      modules={[FreeMode]}
      freeMode={true}
      breakpoints={{
        0: {
          freeMode: false,
          slidesPerView: 1,
        },
        800: {
          slidesPerView: 2.3,
        },
        1120: {
          slidesPerView: 3.2,
        },
        1440: {
          slidesPerView: 4.2,
        },
      }}
    >
      {isOpen ? <OpdenedSlider setOpen={setOpen} /> : ""}
      {news.map((i: any) => (
        <SwiperSlide className={style.slide} key={i.id}>
          <div className={style.sliderWrapper}>
            <div className={style.row}>
              <div className={style.name}>{i.title}</div>
              <button onClick={() => setOpen(true)} className={style.btn}>
                <Image
                  src={"/images/stories/right.svg"}
                  alt="right"
                  width={15}
                  height={15}
                />
              </button>
            </div>
            <Image
              className={style.img}
              src={i.images[0]}
              alt="trends"
              width={324}
              height={420}
              priority
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComp;
