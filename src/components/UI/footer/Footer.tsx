import React from "react";
import style from "./Footer.module.scss";
import Link from "next/link";
import SocialButton from "@/components/UI/buttons/socialButton/SocialButton";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.top}>
        <div className={style.info}>
          <div className={style.list}>
            <Link href={"tel:+84732029777"} className={style.phone}>
              8(473)202-9-777
            </Link>
            <Link href={"mailto:clair_krasota@mail.ru"} className={style.phone}>
              clair_krasota@mail.ru
            </Link>
          </div>
          <div className={style.socials}>
            <SocialButton href="https://www.instagram.com/clairvrn?igsh=MXF4MnJ3NHAwY3R4Yw==">
              <Image
                alt="instagram"
                src={"/images/footer/inst.svg"}
                width={28}
                height={28}
              />
            </SocialButton>
            <SocialButton href="https://m.facebook.com/clairkrasota/">
              <Image
                alt="instagram"
                src={"/images/footer/facebook.svg"}
                width={28}
                height={28}
              />
            </SocialButton>
            <SocialButton href="https://vk.com/clairvrn">
              <Image
                style={{ borderRadius: "50%" }}
                alt="vk"
                src={"/images/footer/vk.png"}
                width={32}
                height={32}
              />
            </SocialButton>
          </div>
        </div>

        <Link href={"/"} className={style.logo}>
          <Image
            src={"/images/footer/logo.png"}
            alt="logo"
            width={93}
            height={30}
          />
        </Link>
      </div>
      <div className={style.bottom}>
        <div className={style.license}>
          <span>Все права защищены, 2023</span>
          <span>Мед. лицензия №ЛО-36-01-002467</span>
          <span>Кликабельная ссылка для различной документации</span>
        </div>
        <Link href={"/"} className={style.download}>
          Скачать <br /> приложение
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
