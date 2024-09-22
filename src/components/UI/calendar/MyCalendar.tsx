import React, { FC, useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import styles from "./MyCalendar.module.scss";
import Image from "next/image";
import { http } from "@/utils/axiosInstance";

const MyCalendar: FC<any> = ({ value, onChange, serviceId }) => {
  const [intervalMonth, setIntervalMonth] = useState<{
    start: string;
    end: string;
  } | null>(null);

  const [highlightedDays, setHighlightedDays] = useState<
    { date: Date; color: string }[]
  >([]);

  // Функция для получения доступных дат
  const fetchAvailableDates = async (startDate: string, endDate: string) => {
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;

      // Отправка запроса с использованием вашей функции http (axios)
      const response = await http(token).get(
        `/services/cart/${serviceId}/available_dates/?start_date=${startDate}&end_date=${endDate}`
      );

      // Данные находятся в response.data, поскольку это стандарт Axios
      const data = response.data;

      // Пример обработки данных и преобразования их в формат highlightedDays
      const formattedDays = data.map(
        (item: { date: string; color: string }) => ({
          date: new Date(item.date),
          color: item.color || "pink", // Устанавливаем цвет по умолчанию, если цвет отсутствует
        })
      );

      setHighlightedDays(formattedDays);
    } catch (error) {
      console.error("Ошибка при запросе доступных дат:", error);
    }
  };

  // Установка интервала текущего месяца по умолчанию
  useEffect(() => {
    const today = new Date();

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const formattedStartDate = format(startOfMonth, "yyyy-MM-dd'T'00:00:00");
    const formattedEndDate = format(endOfMonth, "yyyy-MM-dd'T'23:59:59");

    setIntervalMonth({
      start: formattedStartDate,
      end: formattedEndDate,
    });

    // Вызов функции для получения данных
    fetchAvailableDates(formattedStartDate, formattedEndDate);
  }, []);

  // Отправка запроса при изменении месяца
  useEffect(() => {
    if (intervalMonth) {
      fetchAvailableDates(intervalMonth.start, intervalMonth.end);
    }
  }, [intervalMonth]);

  // Функция для добавления класса на основе даты
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const highlight = highlightedDays.find(
        (day) =>
          day.date.getFullYear() === date.getFullYear() &&
          day.date.getMonth() === date.getMonth() &&
          day.date.getDate() === date.getDate()
      );
      return highlight ? `${styles.highlight} ${styles[highlight.color]}` : "";
    }
    return "";
  };

  return (
    <div className={styles.wrapper}>
      <Calendar
        onChange={onChange}
        value={value}
        tileClassName={tileClassName}
        formatMonthYear={(locale, date) => format(date, "MMMM")}
        locale={"ru-RU"}
        onActiveStartDateChange={({ activeStartDate }: any) => {
          const activeEndDate = new Date(
            activeStartDate.getFullYear(),
            activeStartDate.getMonth() + 1,
            0
          );

          const formattedStartDate = format(
            activeStartDate,
            "yyyy-MM-dd'T'00:00:00"
          );
          const formattedEndDate = format(
            activeEndDate,
            "yyyy-MM-dd'T'23:59:59"
          );

          setIntervalMonth({
            start: formattedStartDate,
            end: formattedEndDate,
          });
        }}
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
      {intervalMonth && (
        <div>
          <p>Начало месяца: {intervalMonth.start}</p>
          <p>Конец месяца: {intervalMonth.end}</p>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
