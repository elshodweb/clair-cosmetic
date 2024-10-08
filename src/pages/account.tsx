import PrivateRouteLoyaut from "@/components/loyaut/PrivateRouteLoyaut";
import AccountPage from "@/components/screens/account/AccountPage";
import React from "react";

const account = () => {
  return (
    <PrivateRouteLoyaut>
      <AccountPage />
    </PrivateRouteLoyaut>
  );
};

export default account;
