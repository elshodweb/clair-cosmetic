import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styles from "./MasterModal.module.scss";
import BlackButton from "../buttons/blackButton/BlackButton";
import IconButton from "../buttons/iconButton/IconButton";
import Image from "next/image";
import cn from "classnames";
import MySmallInput from "../mySmallInput/MySmallInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchSalon } from "@/store/salonSlice/salonSlice";
import { fetchServicesByMaster } from "@/store/services/servicesSliceByMaster";
import {
  setMaster as setMasterRedux,
  setConfirmMassterVisible,
  setMasterId,
  setSalon,
  setSalonId,
  setService,
} from "@/store/booking/bookingSlice";
import { http } from "@/utils/axiosInstance";

interface MasterModalProps {
  id: string | null;
  setMaster: Dispatch<SetStateAction<string | null>>;
}

const MasterModal: FC<MasterModalProps> = ({ setMaster, id }) => {
  const master = useSelector((state: RootState) => state.salon.data);
  const salonStatus = useSelector((state: RootState) => state.salon.status);
  const [isLiked, setLiked] = useState<boolean>(false);
  const { isAuth } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setLiked(master?.is_favorite);
  }, [master?.is_favorite]);

  const handlerLike = () => {
    if (isAuth) {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;
      if (!isLiked) {
        http(token).post("/staffs/favorites/", {
          staff: master.id,
        });
      } else {
        http(token).delete("/staffs/favorites/" + master.id);
      }
      setLiked(!isLiked);
    }
  };
  const servicesData = useSelector(
    (state: RootState) => state.servicesByMaster.services
  );
  const servicesStatus = useSelector(
    (state: RootState) => state.servicesByMaster.status
  );
  const dispatch = useDispatch<AppDispatch>();
  const [selectedService, setSelectedService] = useState<string>("");

  useEffect(() => {
    if (id !== null) {
      dispatch(fetchSalon(id.toString()));
      dispatch(fetchServicesByMaster(id));
    }
  }, [id, dispatch]);
  useEffect(() => {
    if (servicesData.length > 0) {
      setSelectedService(servicesData[0].id);
    }
  }, [servicesData]);

  return (
    <div
      onClick={(e) => {
        setMaster(null);
      }}
      className={cn(styles.wrapper, id ? styles.opened : "")}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.screen}>
        <div className={styles.content}>
          <div className={styles.head}>
            <div className={styles.about}>О мастере</div>
            <IconButton
              className={""}
              onClick={() => {
                setMaster(null);
              }}
            >
              <Image
                src={"/images/header/cross.svg"}
                alt="cart"
                width={16}
                height={19}
              />
            </IconButton>
          </div>
          {(salonStatus === "loading" || servicesStatus === "loading") &&
            "Loading..."}
          {(salonStatus === "failed" || servicesStatus === "failed") && "Error"}
          {salonStatus === "succeeded" && servicesStatus === "succeeded" && (
            <>
              <div className={styles.img}>
                <Image
                  src={
                    master?.avatar
                      ? master.avatar
                      : "/images/masters/master.png"
                  }
                  width={355}
                  height={448}
                  alt="master image"
                />
                <button
                  className={cn(styles.like, isLiked ? styles.liked : "")}
                  onClick={handlerLike}
                ></button>
              </div>
              <h3 className={styles.title}>{master.name}</h3>
              <h4 className={styles.prof}>{master.specialization.title}</h4>
              <p className={styles.descr}>{master.information}</p>
              {master.salons.map((i: any) => (
                <div key={i.id} className={styles.location}>
                  <div className={styles.locationImg}>
                    <Image
                      src={master?.salons?.[0]?.images?.[0]}
                      alt="location img"
                      width={66}
                      height={66}
                    />
                  </div>
                  <div className={styles.locationName}>
                    <span>{i.city}</span>
                  </div>
                </div>
              ))}
              {servicesData.length > 0 && (
                <>
                  <h3 className={styles.title} style={{ marginBottom: 16 }}>
                    Услуги
                  </h3>
                  <p className={styles.descr}>
                    Услуги, которые делает мастер Анастасия
                  </p>
                  <div className={styles.selects}>
                    {servicesData.map((service) => (
                      <MySmallInput
                        key={service.id}
                        id={service.id}
                        small={true}
                        isSelected={service.id === selectedService}
                        name={service.title}
                        price={`${service.price_min} ₽`}
                        onChange={setSelectedService}
                      />
                    ))}
                  </div>
                </>
              )}
              {master.qualifications.length > 0 && (
                <>
                  <h3 className={styles.title} style={{ marginBottom: 16 }}>
                    Квалификация:
                  </h3>

                  {master.qualifications.map((i: any) => (
                    <p key={i.id} className={styles.descr}>
                      {i.description}
                    </p>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
      {salonStatus === "succeeded" && servicesStatus === "succeeded" && (
        <div onClick={(e) => e.stopPropagation()} className={styles.btn}>
          <BlackButton
            onClick={() => {
              dispatch(setMasterRedux(master));
              dispatch(setMasterId(master.id));
              if (master?.salons?.length > 0) {
                dispatch(setSalon(master?.salons?.[0]));
                dispatch(setSalonId(master?.salons?.[0]?.id));
              }
              if (servicesData.length > 0) {
                dispatch(
                  setService(
                    servicesData.filter((i) => i.id == selectedService)?.[0]
                  )
                );
              }
              dispatch(setConfirmMassterVisible(true));
              setMaster(null);
            }}
          >
            Записаться к мастеру
          </BlackButton>
        </div>
      )}
    </div>
  );
};

export default MasterModal;
