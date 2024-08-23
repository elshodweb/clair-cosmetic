import React from "react";
import ChooseSalon from "./ChooseSalon/ChooseSalon";
import ChooseMaster from "./ChooseMaster/ChooseMaster";
import ConfirmMaster from "./ConfirmMaster/ConfirmMaster";
import ChooseTime from "./ChooseTime/ChooseTime";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ConfirmTime from "./ConfirmTime/ConfirmTime";
import FinishedBooking from "./FinishedBooking/FinishedBooking";

const BookingScreen = () => {
  const { service } = useSelector((state: RootState) => state.booking);
  if (!service) {
    return <FinishedBooking />;
  }

  return (
    <>
      <ChooseSalon />
      <ChooseMaster />
      <ConfirmMaster />
      <ChooseTime />
      <ConfirmTime />
    </>
  );
};

export default BookingScreen;
