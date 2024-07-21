import React, { FC } from "react";
import styles from "./SliderContainer.module.scss";
import { Swiper } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { OnlyChildrenProps } from "@/types/children.interface";
interface SliderContainerProps extends OnlyChildrenProps {
  className?: string;
}
const SliderContainer: FC<SliderContainerProps> = ({ className, children }) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <Swiper
        spaceBetween={12}
        modules={[FreeMode]}
        freeMode={true}
        breakpoints={{
          0: {
            freeMode: false,
            slidesPerView: 1.1,
          },
          760: {
            freeMode: false,
            slidesPerView: 1.4,
          },
          1100: {
            slidesPerView: 2.1,
          },
        }}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default SliderContainer;
