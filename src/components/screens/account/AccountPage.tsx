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
import instance, { http } from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import LogoutModal from "./logoutModal/LogoutModal";


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
  const router = useRouter();
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
    let count = true;
    const fetchUserData = async () => {
      try {
        const response = await http.get<User>("/users/");
        if (response.status !== 200) {
          router.replace(router.asPath);
        }

        setLoading(false);
        setUser({ ...user, ...response.data });
      } catch (error: any) {
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
  console.log(user.image);

  return (
    <div className={styles.wrapper}>
      <LogoutModal
        setOpenLogoutModal={setOpenLogoutModal}
        isOpenLogoutModal={isOpenLogoutModal}
      />
      <Loyaut>
        <div className={styles.title}>
          <Title>Профиль</Title>
        </div>
        <div className={styles.profile}>
          <div className={styles.profileInfo}>
            <Image
              src={user.image ? user.image : "/images/profile/profile.png"}
              alt="profile img"
              className={styles.img}
              width={100}
              height={134}
              priority
              property=""
            />
            <div className={styles.info}>
              <div className={styles.name}>{user?.first_name}</div>
              <div className={styles.rank}>{user.achievement}</div>
              <div className={styles.btns}>
                <OutlineButton>Изменить профиль</OutlineButton>
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
