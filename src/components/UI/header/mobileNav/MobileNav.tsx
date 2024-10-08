import React, { FC, useEffect } from "react";
import style from "./MobileNav.module.scss";
import Image from "next/image";
import Link from "next/link";
import IconButton from "@/components/UI/buttons/iconButton/IconButton";
import cn from "classnames";
import BlackButton from "@/components/UI/buttons/blackButton/BlackButton";
import OutlineButton from "@/components/UI/buttons/outlineButton/OutlineButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setLoginVisible, setRegisterVisible } from "@/store/auth/authSlice";
import { setBasketVisible } from "@/store/basket/basketSlice";

interface MobileNavProps {
  isOpenNav: boolean;
  setIsOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const links = [
  { path: "/account", name: "ПРОФИЛЬ" },
  { path: "/shop", name: "МАГАЗИН" },
  { path: "/services", name: "УСЛУГИ" },
  { path: "/basket", name: "КОРЗИНА" },
  { path: "/news", name: "НОВОСТИ" },
  { path: "/masters", name: "МАСТЕРА" },
];

const MobileNav: FC<MobileNavProps> = ({ isOpenNav, setIsOpenNav }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { isAuth } = useSelector((state: RootState) => state.auth);

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
    <div className={cn(style.wrapper, isOpenNav ? style.open : "")}>
      <div className={style.content}>
        <div className={style.row}>
          <Link className={style.logoLink} href={"/"}>
            <Image
              width={118}
              height={38}
              src="/images/header/logo.png"
              alt="logo"
            />
          </Link>
          <IconButton
            className={style.callBtn}
            onClick={() => {
              setIsOpenNav(false);
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
        <nav className={style.nav}>
          {links.map((i) => {
            if (!isAuth && (i.path === "/account" || i.path === "/basket")) {
              return "";
            }
            if (i.path == "/basket") {
              return (
                <Link
                  className={style.link}
                  key={i.path}
                  onClick={() => {
                    dispatch(setBasketVisible(true));
                    setIsOpenNav(false);
                  }}
                  href={""}
                >
                  {i.name}
                </Link>
              );
            } else {
              return (
                <Link
                  className={style.link}
                  key={i.path}
                  onClick={() => {
                    setIsOpenNav(false);
                  }}
                  href={i.path}
                >
                  {i.name}
                </Link>
              );
            }
          })}
        </nav>
        {!isAuth && (
          <div className={style.bottom}>
            <BlackButton
              onClick={() => {
                setIsOpenNav(false);
                dispatch(setLoginVisible(true));
              }}
            >
              Войти
            </BlackButton>
            <OutlineButton
              onClick={() => {
                setIsOpenNav(false);
                dispatch(setRegisterVisible(true));
              }}
            >
              Зарегистрироваться
            </OutlineButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
