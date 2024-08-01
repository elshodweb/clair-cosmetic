import React, { FC, useEffect, useState } from "react";
import styles from "./MasterModal.module.scss";
import BlackButton from "../buttons/blackButton/BlackButton";
import IconButton from "../buttons/iconButton/IconButton";
import Image from "next/image";
import cn from "classnames";
import MySmallInput from "../mySmallInput/MySmallInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchSalon } from "@/store/salonSlice/salonSlice";
interface MasterModalProps {
  id: string | null;
  setMaster: (id: string | null) => void;
}
const MasterModal: FC<MasterModalProps> = ({ setMaster, id }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const salonData = useSelector((state: RootState) => state.salon.data);
  const salonStatus = useSelector((state: RootState) => state.salon.status);

  useEffect(() => {
    if (id !== null) {
      dispatch(fetchSalon(id.toString()));
    }
  }, [id, dispatch]);
  if (salonStatus === "loading") return "loading";

  if (salonStatus === "failed") return "error";

  if (salonStatus === "succeeded")
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
            <div className={styles.img}>
              <Image
                src={salonData?.avatar}
                width={355}
                height={448}
                alt="master image"
              />
              <button
                className={cn(styles.like, isLiked ? styles.liked : "")}
                onClick={() => {
                  setIsLiked(!isLiked);
                }}
              ></button>
            </div>
            <h3 className={styles.title}>{salonData.name}</h3>
            <h4 className={styles.prof}>{salonData.specialization.title}</h4>
            <p className={styles.descr}>{salonData.information}</p>
            {salonData.salons.map((i: any) => (
              <div key={i.id} className={styles.location}>
                <div className={styles.locationImg}>
                  <Image
                    src={"/images/masters/location.png"}
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
            <h3 className={styles.title} style={{ marginBottom: 16 }}>
              Услуги
            </h3>
            <p className={styles.descr}>
              Услуги, которые делает мастер Анастасия
            </p>
            <div className={styles.selects}>
              <MySmallInput
                small={true}
                name="HydraFacial Базовый сервис"
                price="5250 ₽"
                onChange={(e) => {
                  console.log(e);
                }}
              />
              <MySmallInput
                small={true}
                name="HydraFacial Базовый сервис"
                price="5250 ₽"
                onChange={(e) => {
                  console.log(e);
                }}
              />
              <MySmallInput
                small={true}
                name="HydraFacial Базовый сервис"
                price="5250 ₽"
                onChange={(e) => {
                  console.log(e);
                }}
              />
              <MySmallInput
                small={true}
                name="HydraFacial Базовый сервис"
                price="5250 ₽"
                onChange={(e) => {
                  console.log(e);
                }}
              />
              <MySmallInput
                small={true}
                name="HydraFacial Базовый сервис"
                price="5250 ₽"
                onChange={(e) => {
                  console.log(e);
                }}
              />
              <MySmallInput
                small={true}
                name="HydraFacial Базовый сервис"
                price="5250 ₽"
                onChange={(e) => {
                  console.log(e);
                }}
              />
              <MySmallInput
                small={true}
                name="HydraFacial Базовый сервис"
                price="5250 ₽"
                onChange={(e) => {
                  console.log(e);
                }}
              />
            </div>
            {salonData.qualifications.length > 0 && (
              <>
                <h3 className={styles.title} style={{ marginBottom: 16 }}>
                  Квалификация:
                </h3>
                
                {salonData.qualifications.map((i: any) => (
                  <p key={i.id} className={styles.descr}>
                    {i.description}
                  </p>
                ))}
                
              </>
            )}
          </div>
        </div>

        <div onClick={(e) => e.stopPropagation()} className={styles.btn}>
          <BlackButton>Записаться к мастеру</BlackButton>
        </div>
      </div>
    );
};

export default MasterModal;
