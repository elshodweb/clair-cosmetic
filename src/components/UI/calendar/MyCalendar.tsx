import React, { FC, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import styles from "./MyCalendar.module.scss";
import Image from "next/image";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const MyCalendar: FC<any> = ({ value, onChange }) => {
  const formattedDate =
    value instanceof Date ? format(value, "yyyy-MM-dd") : "";
  // Список дней и их цветов
  // const highlightedDays = [
  //   { date: new Date(2024, 9, 17), color: "pink" },
  //   { date: new Date(2024, 9, 18), color: "pink" },
  //   { date: new Date(2024, 9, 19), color: "pink" },
  //   { date: new Date(2024, 9, 20), color: "pink" },
  //   { date: new Date(2024, 9, 27), color: "blue" },
  //   { date: new Date(2024, 9, 28), color: "black" },
  // ];

  // Функция для добавления класса на основе даты
  // const tileClassName = ({ date, view }: { date: Date; view: string }) => {
  //   if (view === "month") {
  //     const highlight = highlightedDays.find(
  //       (day) =>
  //         day.date.getFullYear() === date.getFullYear() &&
  //         day.date.getMonth() === date.getMonth() &&
  //         day.date.getDate() === date.getDate()
  //     );
  //     return highlight ? `${styles.highlight} ${styles[highlight.color]}` : "";
  //   }
  //   return "";
  // };

  return (
    <div className={styles.wrapper}>
      <Calendar
        onChange={onChange}
        value={value}
        // tileClassName={tileClassName}
        formatMonthYear={(locale, date) => format(date, "MMMM")}
        locale={"ru-RU"}
        prevLabel={
          <Image
            src={"/images/UI/calendar/left.svg"}
            alt="left"
            width={15}
            height={14}
          />
        }
        nextLabel={
          <Image
            src={"/images/UI/calendar/right.svg"}
            alt="left"
            width={15}
            height={14}
          />
        }
      />
    </div>
  );
};

export default MyCalendar;
