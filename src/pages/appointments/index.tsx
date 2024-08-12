import PrivateRouteLoyaut from "@/components/loyaut/PrivateRouteLoyaut";
import AppointmentsPage from "@/components/screens/appointments/AppointmentsPage";
import React from "react";

const Appointments = () => {
  return (
    <PrivateRouteLoyaut>
      <AppointmentsPage />
    </PrivateRouteLoyaut>
  );
};

export default Appointments;
