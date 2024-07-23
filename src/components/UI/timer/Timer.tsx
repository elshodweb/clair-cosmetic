import { setTimer } from "@/store/auth/authSlice";
import { RootState } from "@/store/rootReducer";
import { AppDispatch } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface CountdownTimerProps {
  finish: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ finish }) => {
  const timer = useSelector((state: RootState) => state.auth.timer);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (timer > 0) {
      const timerId = setInterval(() => {
        dispatch(setTimer(timer - 1));
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      finish();
    }
  }, [timer]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} минут ${seconds < 10 ? `0${seconds}` : seconds} секунд`;
  };

  return formatTime(timer);
};

export default CountdownTimer;
