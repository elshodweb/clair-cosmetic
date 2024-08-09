import React, { useEffect, useState } from "react";
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
import ProductCard from "./productCard/ProductCard";
import { http } from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import LogoutModal from "./logoutModal/LogoutModal";
import UpdateModal from "./UpdateModal/UpdateModal";

interface User {
  id: string;
  phone_number: string;
  email: string | null;
  first_name: string | null;
  second_name: string | null;
  last_name: string | null;
  birthday: string;
  sex: "not_selected" | "male" | "female"; // Adjust if other values are possible
  city: string;
  image: string | null;
  achievement: string;
  last_login: string;
  date_joined: string;
}

const AccountPage = () => {
  const [isOpenLogoutModal, setOpenLogoutModal] = useState<boolean>(false);
  const [isOpenUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  
  const [user, setUser] = useState<User>({
    id: "",
    phone_number: "",
    email: null,
    first_name: null,
    second_name: null,
    last_name: null,
    birthday: "",
    sex: "not_selected",
    city: "",
    image: null,
    achievement: "",
    last_login: "",
    date_joined: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await http.get<User>("/users/");

        setLoading(false);
        setUser({ ...user, ...response.data });
      } catch (error: any) {
        if (error.response.status !== 200) {
          window.location.reload();
        }
        setError(error.message || "An error occurred");

        setLoading(false);
      }
    };

    fetchUserData();

    setIsDesktop(window.innerWidth >= 580);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 580);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>No user data found.</p>;
  }

  return (
    <div className={styles.wrapper}>
      <LogoutModal
        setOpenLogoutModal={setOpenLogoutModal}
        isOpenLogoutModal={isOpenLogoutModal}
      />
      <UpdateModal
        visible={isOpenUpdateModal}
        user={user}
        onClose={() => setOpenUpdateModal(false)}
      />
      <Loyaut>
        <div className={styles.title}>
          <Title>Профиль</Title>
        </div>
        <div className={styles.profile}>
          <div className={styles.profileInfo}>
            <div className={styles.imgWrapper}>
              <Image
                src={user.image ? user.image : "/images/profile/profile.png"}
                alt="profile img"
                className={styles.img}
                width={210}
                height={230}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.infoTop}>
                <div className={styles.infoTopLeft}>
                  <div className={styles.name}>{user?.first_name}</div>
                  <div className={styles.rank}>{user.achievement}</div>
                </div>
                <div className={styles.infoTopRight}>
                  <div className={styles.imgWrapperMob}>
                    <Image
                      src={
                        user.image ? user.image : "/images/profile/profile.png"
                      }
                      alt="profile img"
                      className={styles.img}
                      width={210}
                      height={230}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.btns}>
                <OutlineButton
                  onClick={() => {
                    setOpenUpdateModal(true);
                  }}
                >
                  Изменить профиль
                </OutlineButton>
                <OutlineButton
                  onClick={() => {
                    setOpenLogoutModal(true);
                  }}
                >
                  Выйти
                </OutlineButton>
              </div>
            </div>
          </div>
          <div className={styles.profileBalance}>
            <div className={styles.balance}>
              <div className={styles.amount}>0₽</div>
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
        {isDesktop ? (
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
        ) : (
          <div className={styles.rowCards}>
            <NoteCard />
            <NoteCard />
            <NoteCard />
          </div>
        )}
        <ArrowLink
          className={styles.arrowLink}
          href="/appointments"
          children="Все записи"
        />
        <div className={styles.decor}>
          <SmallTitle>Мои покупки</SmallTitle>
        </div>

        {isDesktop ? (
          <SliderContainer>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
          </SliderContainer>
        ) : (
          <div className={styles.rowCards}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        )}
        <ArrowLink
          className={styles.arrowLink}
          href="/history"
          children="Все покупки"
        />
      </Loyaut>
    </div>
  );
};

export default AccountPage;
