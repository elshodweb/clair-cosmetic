import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import style from "./Header.module.scss";
import BlackButton from "@/components/UI/buttons/blackButton/BlackButton";
import IconButton from "@/components/UI/buttons/iconButton/IconButton";
import ProfileButton from "@/components/UI/buttons/profileButton/ProfileButton";
import MobileButton from "@/components/UI/buttons/mobileButton/MobileButton";
import MobileNav from "../mobileNav/MobileNav";

const navs = [
  { path: "/services", name: "Услуги" },
  { path: "/shop", name: "Магазин" },
  { path: "/news", name: "Новости" },
  { path: "/contacts", name: "Контакты" },
];
const Header = () => {
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
            <Link className={style.link} id={i.path} href={i.path}>
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
        <IconButton onClick={() => {}}>
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
        <ProfileButton className={style.profileBtn} onClick={() => {}}>
          Профиль
        </ProfileButton>
      </div>

      <MobileNav isOpenNav={isOpenNav} setIsOpenNav={setIsOpenNav} />
    </header>
  );
};

export default Header;
