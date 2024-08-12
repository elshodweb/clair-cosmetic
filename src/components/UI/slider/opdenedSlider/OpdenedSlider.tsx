"use client"; // <===== REQUIRED

import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./OpdenedSlider.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import IconButton from "../../buttons/iconButton/IconButton";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getNews } from "@/store/newStories/storiesSlice";

interface OpdenedSliderProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialSlide: number;
}

const OpdenedSlider: FC<OpdenedSliderProps> = ({ setOpen, initialSlide }) => {
  const dispatch = useDispatch<AppDispatch>();

  const news = useSelector((state: RootState) => state.newsStoris.news);
  const newsStatus = useSelector((state: RootState) => state.newsStoris.status);
  const error = useSelector((state: RootState) => state.newsStoris.error);
  const progressBar = useRef<HTMLDivElement | null>(null);
  const progressBarWrapper = useRef<HTMLDivElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);
  const swiperRef = useRef<any>(null); // Add this ref to access Swiper instance

  useEffect(() => {
    if (newsStatus === "idle") {
      dispatch(getNews());
    }
  }, [newsStatus, dispatch]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(initialSlide, 0); // Set slide without animation
    }
  }, [initialSlide]);

  const onAutoplayTimeLeft = (s: unknown, time: number, progress: number) => {
    if (progressBar.current) {
      progressBar.current.style.width = `${(1 - progress) * 100}%`;
    }
    if (progressBarWrapper.current) {
      progressBarWrapper.current.style.opacity = time < 150 ? "0" : "1";
    }
  };

  if (newsStatus === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.relative}>
      <div className={styles.wrapper} data-set={"slider-history"}>
        <Swiper
          ref={swiperRef}
          slidesPerView={"auto"}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          initialSlide={initialSlide}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 0 },
            660: { slidesPerView: 1.6, spaceBetween: 20 },
            720: { slidesPerView: 2, spaceBetween: 20 },
            880: { slidesPerView: 2.5, spaceBetween: 20 },
            1200: { slidesPerView: 3.5, spaceBetween: 20 },
            1400: { slidesPerView: 4, spaceBetween: 20 },
            1700: { slidesPerView: 5, spaceBetween: 20 },
          }}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
        >
          {news.map((i: any,index) => (
            <SwiperSlide key={i.id} className={styles.slide}
            onClick={()=>{swiperRef.current.swiper.slideTo(index)}}>
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
                    onClick={() => setOpen(false)}
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
    </div>
  );
};

export default OpdenedSlider;
