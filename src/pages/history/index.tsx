import PrivateRouteLoyaut from "@/components/loyaut/PrivateRouteLoyaut";
import HistoryPage from "@/components/screens/history/HistoryPage";
import React from "react";

const Appointments = () => {
  return (
    <PrivateRouteLoyaut>
      <HistoryPage />
    </PrivateRouteLoyaut>
  );
};

export default Appointments;
