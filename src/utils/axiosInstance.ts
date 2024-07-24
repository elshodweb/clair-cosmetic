// src/utils/axiosInstance.ts

import axios from 'axios';

// Создаем экземпляр axios для публичных запросов
const instance = axios.create({
  baseURL: "https://ba745807670a.vps.myjino.ru/api/v1/",
});

export default instance;

// Создаем экземпляр axios для запросов с авторизацией
const createHttpInstance = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem("accessToken") : null;

  return axios.create({
    baseURL: "https://ba745807670a.vps.myjino.ru/api/v1/",
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
};

export const http = createHttpInstance();

// Функции для проверки и обновления токена
export const verifyToken = async (): Promise<boolean> => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem("refreshToken") : null;
    if (!token) {
      return false;
    }
    await instance.post("/auth/jwt/verify/", { token: token });
    return true;
  } catch (error) {
    await refreshToken();
    return false;
  }
};

export const refreshToken = async (): Promise<boolean> => {
  try {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem("refreshToken") : null;

    if (!refreshToken) {
      return false;
    }

    const refreshResponse = await instance.post("/auth/jwt/refresh/", {
      refresh: refreshToken,
    });

    const newAccessToken = refreshResponse.data.access;
    const newRefreshToken = refreshResponse.data.refresh;

    if (typeof window !== 'undefined') {
      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
    }
    
    return true;
  } catch (error) {
    return false;
  }
};
