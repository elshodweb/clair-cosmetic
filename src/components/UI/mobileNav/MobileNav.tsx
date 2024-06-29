import React, { FC } from "react";
import style from "./MobileNav.module.scss";
import Image from "next/image";
import Link from "next/link";
import IconButton from "@/components/buttons/iconButton/IconButton";
import cn from "classnames";
import BlackButton from "@/components/buttons/blackButton/BlackButton";
import OutlineButton from "@/components/buttons/outlineButton/OutlineButton";
interface MobileNavPorps {
  isOpenNav: boolean;
  setIsOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
}
const links = [
  { path: "/profile", name: "ПРОФИЛЬ" },
  { path: "/shop", name: "МАГАЗИН" },
  { path: "/services", name: "УСЛУГИ" },
  { path: "/basket", name: "КОРЗИНА" },
  { path: "/salon", name: "САЛОНЫ" },
  { path: "/news", name: "НОВОСТИ" },
  { path: "/contacts", name: "КОНТАКТЫ" },
];
const MobileNav: FC<MobileNavPorps> = ({ isOpenNav, setIsOpenNav }) => {
  return (
    <div className={cn(style.wrapper, isOpenNav ? style.open : "")}>
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
        {links.map((i) => (
          <Link className={style.link} key={i.path} href={i.path}>
            {i.name}
          </Link>
        ))}
      </nav>

      <div className={style.bottom}>
        <BlackButton>Войти</BlackButton>
        <OutlineButton>Зарегистрироваться</OutlineButton>
      </div>
    </div>
  );
};

export default MobileNav;
