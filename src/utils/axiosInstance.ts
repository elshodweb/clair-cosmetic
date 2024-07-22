import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "https://ba745807670a.vps.myjino.ru/api/v1/",
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    if (config.headers) {
      (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`;
    } else {
      config.headers = {
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders;
    }
  }
  return config;
});

export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    await instance.post("/auth/jwt/verify/", { token });
    return true;
  } catch (error) {
    console.log(error);
    
    return false;
  }
};

export const refreshToken = async (): Promise<boolean> => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return false;
    }

    const refreshResponse = await instance.post("/auth/jwt/refresh/", {
      refresh: refreshToken,
    });

    const newAccessToken = refreshResponse.data.access;

    // Сохраняем новый access token в localStorage
    localStorage.setItem("accessToken", newAccessToken);

    return true;
  } catch (error) {
    return false;
  }
};

export default instance;
