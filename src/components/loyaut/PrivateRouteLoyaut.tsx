import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import React, { FC, PropsWithChildren } from "react";
import { useSelector } from "react-redux";

const PrivateRouteLoyaut: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { isAuth } = useSelector((state: RootState) => state.auth);
  
  if (!isAuth) {
    router.push("/");
    return "";
  } else {
    return <>{children}</>;
  }
};

export default PrivateRouteLoyaut;
