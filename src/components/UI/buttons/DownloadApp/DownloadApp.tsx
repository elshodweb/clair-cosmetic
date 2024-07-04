import Link from "next/link";
import React from "react";
import style from "./DownloadApp.module.scss";
const DownloadApp = () => {
  return (
    <Link href={"/"} className={style.download}>
      <h3 className={style.title}>СКАЧАЙ ПРИЛОЖЕНИЕ</h3>
      <h4 className={style.subtitle}>чтобы открыть больше возможностей</h4>
      <button className={style.btn}>Скачать приложение</button>
    </Link>
  );
};

export default DownloadApp;
