import React from "react";
import ChooseSalon from "./ChooseSalon/ChooseSalon";
import ChooseMaster from "./ChooseMaster/ChooseMaster";
import ConfirmMaster from "./ConfirmMaster/ConfirmMaster";

const BookingScreen = () => {
  return (
    <>
      <ChooseSalon />
      <ChooseMaster />
      <ConfirmMaster />
    </>
  );
};

export default BookingScreen;
