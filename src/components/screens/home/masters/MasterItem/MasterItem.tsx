import Image from "next/image";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styles from "./MasterItem.module.scss";
import { http } from "@/utils/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface MasterProps {
  data: any;
  setMaster: Dispatch<SetStateAction<string | null>>;
}
const MasterItem: FC<MasterProps> = ({ data, setMaster }) => {
  const [isLiked, setLiked] = useState<boolean>(false);
  const { isAuth } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    setLiked(data.is_favorite);
  }, [data.is_favorite]);

  const handlerLike = () => {
    if (isAuth) {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;
      if (!isLiked) {
        http(token).post("/staffs/favorites/", {
          staff: data.id,
        });
      } else {
        http(token).delete("/staffs/favorites/" + data.id);
      }
      setLiked(!isLiked);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.img}>
        <Image
          src={data?.avatar ? data.avatar : "/images/masters/master.png"}
          alt="trends"
          width={480}
          height={560}
        />
      </div>
      <button
        onClick={handlerLike}
        className={`${styles.like} ${isLiked ? styles.liked : ""}`}
      ></button>

      <div className={styles.row}>
        <div className={styles.info}>
          <div className={styles.name}>{data.name}</div>
          <div className={styles.profession}>{data.specialization.title}</div>
        </div>
        <button
          onClick={() => {
            setMaster(data.id);
          }}
          className={styles.btn}
        >
          Запись
        </button>
      </div>
    </div>
  );
};

export default MasterItem;
