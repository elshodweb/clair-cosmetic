import React, { FC, useState } from "react";
import styles from "./ChooseTime.module.scss";
import Image from "next/image";
import IconButton from "../../../UI/buttons/iconButton/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  setChooseTimeVisible,
  setConfirmMassterVisible,
  setTime,
} from "@/store/booking/bookingSlice";
import BlackButton from "@/components/UI/buttons/blackButton/BlackButton";
import MyCalendar from "@/components/UI/calendar/MyCalendar";
import { day, morning, night } from "./timeArray";
import Hour from "./Hour/Hour";

const ChooseTime: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [choosenTime, setChoosenTime] = useState(morning[0]);
  const { isChooseTimeVisible, service, master, time } = useSelector(
    (state: RootState) => state.booking
  );

  // State to capture the selected date from the calendar
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // Function to handle the final selection of date and time
  const handleSelectDateTime = () => {
    if (selectedDate && choosenTime) {
      const selectedDateTime = new Date(selectedDate);
      const [hours, minutes] = choosenTime.split(":").map(Number);
      selectedDateTime.setHours(hours, minutes, 0, 0);

      // Коррекция времени в зависимости от часового пояса
      const timezoneOffset = selectedDateTime.getTimezoneOffset() * 60000;
      const localDateTime = new Date(
        selectedDateTime.getTime() - timezoneOffset
      );

      // Форматирование даты-времени как строки ISO без часового пояса
      const formattedDateTime = localDateTime.toISOString().slice(0, -1);

      // Dispatch the formatted date-time
      dispatch(setTime(formattedDateTime));

      // Close the current modal and possibly open the next one
      dispatch(setChooseTimeVisible(false));
      dispatch(setConfirmMassterVisible(true));
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${
        isChooseTimeVisible ? styles.opened : ""
      }`}
    >
      <div className={styles.content}>
        <div className={styles.top}>
          <button
            onClick={() => {
              dispatch(setConfirmMassterVisible(true));
              dispatch(setChooseTimeVisible(false));
              dispatch(setTime(""));
            }}
            className={styles.back}
          >
            <Image
              src={"/images/UI/arrow.svg"}
              width={56}
              height={10}
              alt={"arrow"}
            />
          </button>
          <IconButton
            className={styles.btn}
            onClick={() => {
              dispatch(setChooseTimeVisible(false));
              dispatch(setTime(""));
            }}
          >
            <Image
              src={"/images/header/cross.svg"}
              alt="cross"
              width={16}
              height={19}
            />
          </IconButton>
        </div>
        <h4 className={styles.title}>Онлайн-запись </h4>
        <h5 className={styles.subtitle}>Проверьте себя</h5>
        {service && (
          <div className={styles.service}>
            <div className={styles.serviceName}>{service.title}</div>
            <div className={styles.servicePrice}>{service.price_min}₽</div>
          </div>
        )}
        {master && (
          <div className={styles.materWrapper}>
            <div className={styles.masterImg}>
              {master?.avatar && (
                <Image
                  src={master?.avatar}
                  alt="option"
                  width={80}
                  height={110}
                />
              )}
            </div>
            <div className={styles.masterDetails}>
              <div className={styles.masterName}>{master.name}</div>
              <div className={styles.masterProf}>
                {master?.specialization?.title}
              </div>
            </div>
          </div>
        )}
        <MyCalendar value={selectedDate} onChange={setSelectedDate} />{" "}
        {/* Pass setSelectedDate to capture date */}
        <div className={styles.label}>Утро</div>
        {morning.map((i) => (
          <Hour
            key={i}
            onClick={() => setChoosenTime(i)}
            disabled={i == choosenTime}
          >
            {i}
          </Hour>
        ))}
        <div className={styles.label}>День</div>
        {day.map((i) => (
          <Hour
            key={i}
            onClick={() => setChoosenTime(i)}
            disabled={i == choosenTime}
          >
            {i}
          </Hour>
        ))}
        <div className={styles.label}>Вечер</div>
        {night.map((i) => (
          <Hour
            key={i}
            onClick={() => setChoosenTime(i)}
            disabled={i == choosenTime}
          >
            {i}
          </Hour>
        ))}
        <BlackButton className={styles.btnMain} onClick={handleSelectDateTime}>
          Выбрать дату и время
        </BlackButton>
        <div className={styles.line}>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default ChooseTime;
