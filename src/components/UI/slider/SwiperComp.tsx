"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import style from "./SliderComp.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getNews } from "@/store/newStories/storiesSlice";
import OpdenedSlider from "./opdenedSlider/OpdenedSlider";
const SwiperComp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const news = useSelector((state: RootState) => state.newsStoris.news);
  const newsStatus = useSelector((state: RootState) => state.newsStoris.status);

  const [isOpen, setOpen] = useState<boolean>(false);
  const [initialSlideForModal, setInitialSlideForModal] = useState<number>(1);
  useEffect(() => {
    if (newsStatus === "idle") {
      dispatch(getNews());
    }
  }, [newsStatus, dispatch]);

  if (newsStatus === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.roww}>
      <div className={style.wrapperrRow}>
        {isOpen ? (
          <OpdenedSlider
            initialSlide={initialSlideForModal}
            setOpen={setOpen}
          />
        ) : (
          ""
        )}
        {news.map((i: any, index) => (
          <div
            onClick={() => {
              setOpen(true);
              setInitialSlideForModal(index);
            }}
            className={style.slide}
            key={i.id}
          >
            <div className={style.sliderWrapper}>
              <div className={style.row}>
                <div className={style.name}>{i.title}</div>
                <button className={style.btn}>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwiperComp;
