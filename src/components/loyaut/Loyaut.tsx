import React, { FC } from "react";
import Header from "../UI/header/Header";
import Footer from "../UI/footer/Footer";
import style from "./Loyaut.module.scss";
import { OnlyChildrenProps } from "@/types/children.interface";
import Container from "../container/Container";

const Loyaut: FC<OnlyChildrenProps> = ({ children }) => {
  return (
    <div className={style.wrapper}>
      <Container>
        <Header />
        <main className={style.main}>{children}</main>
        <Footer />
      </Container>
    </div>
  );
};

export default Loyaut;
