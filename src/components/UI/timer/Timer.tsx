import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  initialTime: number;
  finish: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialTime,
  finish
}) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      finish();
    }
  }, [time]);

  const formatTime = (time: number) => {
    return `${time}`;
  };

  return formatTime(time);
};

export default CountdownTimer;
