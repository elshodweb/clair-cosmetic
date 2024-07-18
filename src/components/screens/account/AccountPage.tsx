import React from "react";
import styles from "./AccountPage.module.scss";
import Loyaut from "@/components/loyaut/Loyaut";
import Title from "@/components/UI/title/Title";
import Image from "next/image";
import OutlineButton from "@/components/UI/buttons/outlineButton/OutlineButton";
import SmallTitle from "@/components/UI/smallTitle/SmallTitle";
import SliderContainer from "./sliderContainer/SliderContainer";
import NoteCard from "./noteCard/NoteCard";
import { SwiperSlide } from "swiper/react";
import ArrowLink from "@/components/UI/arrowLink/ArrowLink";
const AccountPage = () => {
  return (
    <div className={styles.wrapper}>
      <Loyaut>
        <div className={styles.title}>
          <Title>Профиль</Title>
        </div>
        <div className={styles.profile}>
          <div className={styles.profileInfo}>
            <Image
              src={"/images/profile/profile.png"}
              alt="profile img"
              className={styles.img}
              width={210}
              height={234}
            />
            <div className={styles.info}>
              <div className={styles.name}>Марина</div>
              <div className={styles.rank}>Любимый гость</div>
              <div className={styles.btns}>
                <OutlineButton>Изменить профиль</OutlineButton>
                <OutlineButton>Выйти</OutlineButton>
              </div>
            </div>
          </div>
          <div className={styles.profileBalance}>
            <div className={styles.balance}>
              <div className={styles.amount}>3000₽</div>
              <div className={styles.label}>Баланс</div>
              <OutlineButton>Как использовать бонусы?</OutlineButton>
            </div>
            <div className={styles.balanceImg}>
              <Image
                alt="rainbow"
                src={"/images/profile/rainbow.png"}
                width={379}
                height={292}
              />
            </div>
          </div>
        </div>
        <SmallTitle>Мои записи</SmallTitle>
        <SliderContainer>
          <SwiperSlide>
            <NoteCard />
          </SwiperSlide>
          <SwiperSlide>
            <NoteCard />
          </SwiperSlide>
          <SwiperSlide>
            <NoteCard />
          </SwiperSlide>
          <SwiperSlide>
            <NoteCard />
          </SwiperSlide>
          <SwiperSlide>
            <NoteCard />
          </SwiperSlide>
          <SwiperSlide>
            <NoteCard />
          </SwiperSlide>
        </SliderContainer>
        <ArrowLink className={styles.arrowLink} href="/appointments" children="Все записи" />
      </Loyaut>
    </div>
  );
};

export default AccountPage;