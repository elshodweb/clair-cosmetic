import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import style from "./Header.module.scss";
import BlackButton from "@/components/UI/buttons/blackButton/BlackButton";
import IconButton from "@/components/UI/buttons/iconButton/IconButton";
import ProfileButton from "@/components/UI/buttons/profileButton/ProfileButton";
import MobileButton from "@/components/UI/buttons/mobileButton/MobileButton";
import MobileNav from "./mobileNav/MobileNav";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import {setLoginVisible } from "@/store/auth/authSlice";
import BasketModal from "../BasketModal/BasketModal";
import { setBasketVisible } from "@/store/basket/basketSlice";

const navs = [
  { path: "/services", name: "Услуги" },
  { path: "/shop", name: "Магазин" },
  { path: "/news", name: "Новости" },
  { path: "/masters", name: "Мастера" },
];
const Header = () => {
  const navigate = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth } = useSelector((state: RootState) => state.auth);

  const [isOpenNav, setIsOpenNav] = useState<boolean>(false);
  useEffect(() => {
    if (isOpenNav) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpenNav]);
  return (
    <header className={style.header}>
      <div className={style.content}>
        <div className={style.left}>
          <Link className={style.logoLink} href={"/"}>
            <Image
              width={118}
              height={38}
              src="/images/header/logo.png"
              alt="logo"
            />
          </Link>
          <nav className={style.nav}>
            {navs.map((i) => (
              <Link
                key={i.path}
                className={style.link}
                id={i.path}
                href={i.path}
              >
                {i.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className={style.right}>
          <MobileButton
            className={style.mobileBtn}
            img="/images/profile/profile.png"
            onClick={() => {
              setIsOpenNav(true);
            }}
          />
          <BlackButton className={style.blackBtn} onClick={() => {}}>
            Запись
          </BlackButton>
          <IconButton className={style.callBtn} onClick={() => {}}>
            <Image
              src={"/images/header/date_icon.svg"}
              alt="cart"
              width={16}
              height={19}
            />
          </IconButton>
          <IconButton onClick={() => dispatch(setBasketVisible(true))}>
            <Image
              src={"/images/header/cart-icon.svg"}
              alt="cart"
              width={16}
              height={19}
            />
          </IconButton>
          <IconButton onClick={() => {}}>
            <Image
              src={"/images/header/search-icon.svg"}
              alt="cart"
              width={16}
              height={19}
            />
          </IconButton>
          <ProfileButton
            className={style.profileBtn}
            onClick={() => {
              if (isAuth) {
                navigate.push("/account");
              } else {
                dispatch(setLoginVisible(true));
              }
            }}
          >
            {isAuth ? "Профиль" : "Войти"}
          </ProfileButton>
        </div>
        <BasketModal
        />
        <MobileNav isOpenNav={isOpenNav} setIsOpenNav={setIsOpenNav} />
      </div>
    </header>
  );
};

export default Header;
