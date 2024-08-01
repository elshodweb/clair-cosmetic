"use client"; // <===== REQUIRED

import React, { FC, useEffect, useRef } from "react";
import styles from "./OpdenedSlider.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import IconButton from "../../buttons/iconButton/IconButton";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getNews } from "@/store/newStories/storiesSlice";
interface OpdenedSlider {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OpdenedSlider: FC<OpdenedSlider> = ({ setOpen }) => {
  // Указываем правильные типы для useRef
  const dispatch = useDispatch<AppDispatch>();

  const news = useSelector((state: RootState) => state.news.news);
  const newsStatus = useSelector((state: RootState) => state.news.status);
  const error = useSelector((state: RootState) => state.news.error);
  const progressBar = useRef<HTMLDivElement | null>(null);
  const progressBarWrapper: any = useRef<HTMLDivElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    if (newsStatus === "idle") {
      dispatch(getNews());
    }
  }, [newsStatus, dispatch]);

  const onAutoplayTimeLeft = (s: unknown, time: number, progress: number) => {
    if (progressBar.current) {
      // Установка ширины линейного прогресс-бара
      progressBar.current.style.width = `${(1 - progress) * 100}%`;
    }
    if (progressBarWrapper) {
      progressBarWrapper.current.style.opacity = time < 150 ? "0" : "1"; // Adjust opacity based on time
    }
  };
  if (newsStatus === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.wrapper} data-set={"slider-history"}>
      <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        breakpoints={{
          0: {
            slidesPerView: 1,

            spaceBetween: 0,
          },
          660: {
            slidesPerView: 1.6,
            spaceBetween: 20,
          },
          720: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          880: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 3.5,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1700: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        onAutoplayTimeLeft={onAutoplayTimeLeft} // Не забудьте привязать обработчик события
      >
        {news.map((i: any) => (
          <SwiperSlide key={i.id} className={styles.slide}>
            <div className={styles.slideContent}>
              <div className={styles.top}>
                <div className={styles.left}>
                  <div className={styles.avatar}>
                    <Image
                      src={"/images/profile/profile.png"}
                      alt="avatar"
                      width={47}
                      height={47}
                    />
                  </div>
                  <div className={styles.name}>Скидки</div>
                </div>
                <IconButton
                  className={styles.exitBtn}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <Image
                    src={"/images/header/cross.svg"}
                    alt="cart"
                    width={16}
                    height={19}
                  />
                </IconButton>
              </div>
              <div className={styles.imgWrapper}>
                <Image
                  className={styles.img}
                  src={i.images[0]}
                  alt="trends"
                  width={324}
                  height={638}
                  priority
                />
               
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* Остальные SwiperSlide элементы аналогично */}
        <div
          ref={progressBarWrapper}
          className={styles.autoplayProgress}
          slot="container-end"
        >
          <div className={styles.progressBar} ref={progressBar}></div>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
};

export default OpdenedSlider;
