import React, { FC, useState, useEffect, ChangeEvent } from "react";
import styles from "./UpdateModal.module.scss";
import BlackButton from "../../../UI/buttons/blackButton/BlackButton";
import Image from "next/image";
import IconButton from "../../../UI/buttons/iconButton/IconButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setAuth } from "@/store/auth/authSlice";
import { http } from "@/utils/axiosInstance";

interface UpdateModalProps {
  user: any;
  visible: boolean;
  onClose: () => void;
}

interface User {
  email: string;
  first_name: string;
  second_name: string;
  last_name: string;
  birthday: string;
  sex: string;
  city: string;
  image: string;
}

const UpdateModal: FC<UpdateModalProps> = ({ user, visible, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [imageLink, setImageLink] = useState(user?.image);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [userData, setUserData] = useState<User>({
    email: "",
    first_name: "",
    second_name: "",
    last_name: "",
    birthday: "",
    sex: "not_selected",
    city: "",
    image: "",
  });
  console.log(user);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUserData({
        email: user.email || "",
        first_name: user.first_name || "",
        second_name: user.second_name || "",
        last_name: user.last_name || "",
        birthday: user.birthday || "",
        sex: user.sex || "not_selected",
        city: user.city || "",
        image: user.image || "",
      });
      setImageLink(user.image);

      const imageUrl = `http://localhost:3000/_next/image?url=${encodeURIComponent(
        user.image
      )}&w=640&q=75`;

      fetch(imageUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.blob();
        })
        .then((blob) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            if (reader.result) {
              setUserData((prevState) => ({
                ...prevState,
                image: reader.result as string,
              }));
            }
          };
          reader.readAsDataURL(blob);
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
          setError("Ошибка загрузки изображения");
        });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setUserData((prevState) => ({
            ...prevState,
            image: reader.result as string,
          }));
          setImageLink(reader.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      // Append other fields
      formData.append("email", userData.email);
      formData.append("first_name", userData.first_name);
      formData.append("second_name", userData.second_name);
      formData.append("last_name", userData.last_name);
      formData.append("birthday", userData.birthday);
      formData.append("sex", userData.sex);
      formData.append("city", userData.city);

      // Handle image
      if (selectedImage) {
        // If a new image file is selected
        formData.append("image", selectedImage);
      } else if (userData.image) {
        // If no new image file is selected, send the existing image
        const response = await fetch(userData.image);
        const blob = await response.blob();
        const file = new File([blob], "image.jpg", { type: blob.type });
        formData.append("image", file);
      } else {
        // If no image data is available
        formData.append("image", new Blob());
      }

      const response = await http.put("/users/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        dispatch(setAuth(true));
        onClose();
      }
    } catch (error: any) {
      setError(error.message || "An error occurred");
      console.error("Update error:", error);
    }
  };

  return (
    <div className={`${styles.wrapper} ${visible ? styles.opened : ""}`}>
      <div className={styles.content}>
        <div className={styles.top}>
          <button onClick={() => onClose()} className={styles.back}>
            <Image
              src={"/images/UI/arrow.svg"}
              width={56}
              height={10}
              alt={"arrow"}
            />
          </button>
          <IconButton className={styles.btn} onClick={() => onClose()}>
            <Image
              src={"/images/header/cross.svg"}
              alt="close"
              width={16}
              height={19}
            />
          </IconButton>
        </div>
        <h2 className={styles.hi}>Изменить профиль</h2>
        <div className={styles.avatarWrapper}>
          <Image
            className={styles.rainBow}
            src={imageLink ? imageLink : "/images/profile/profile.png"}
            alt="profile"
            width={162}
            height={180}
          />
        </div>
        <input
          type="file"
          name="image"
          style={{ display: "none" }}
          onChange={handleImageChange}
          id="imageInput"
        />
        <BlackButton
          className={styles.imgUpdate}
          onClick={() => document.getElementById("imageInput")?.click()}
        >
          Изменить
        </BlackButton>
        <div className={styles.mob}>
          <h5 className={`${styles.error} ${error ? styles.show : ""}`}>
            {error}
          </h5>
          <input
            className={`${styles.input} ${error ? styles.errorInput : ""}`}
            type="email"
            name="email"
            placeholder="Почта"
            value={userData.email}
            onChange={handleInputChange}
          />
          <input
            className={`${styles.input} ${error ? styles.errorInput : ""}`}
            type="text"
            name="first_name"
            placeholder="Имя"
            value={userData.first_name}
            onChange={handleInputChange}
          />
          <input
            className={`${styles.input} ${error ? styles.errorInput : ""}`}
            type="text"
            name="second_name"
            placeholder="Отчество"
            value={userData.second_name}
            onChange={handleInputChange}
          />
          <input
            className={`${styles.input} ${error ? styles.errorInput : ""}`}
            type="text"
            name="last_name"
            placeholder="Фамилия"
            value={userData.last_name}
            onChange={handleInputChange}
          />
          <input
            className={`${styles.input} ${error ? styles.errorInput : ""}`}
            type="date"
            name="birthday"
            placeholder="Дата рождения"
            value={userData.birthday}
            onChange={handleInputChange}
          />
          <input
            className={`${styles.input} ${error ? styles.errorInput : ""}`}
            type="text"
            name="sex"
            placeholder="Пол"
            value={userData.sex}
            onChange={handleInputChange}
          />
          <input
            className={`${styles.input} ${error ? styles.errorInput : ""}`}
            type="text"
            name="city"
            placeholder="Город"
            value={userData.city}
            onChange={handleInputChange}
          />
          <BlackButton className={styles.blackBtn} onClick={handleUpdate}>
            Сохранить
          </BlackButton>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
