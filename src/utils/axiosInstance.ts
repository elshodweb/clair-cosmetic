import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "https://ba745807670a.vps.myjino.ru/api/v1/",
});

export default instance;

const http = instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      if (config.headers) {
        (
          config.headers as AxiosRequestHeaders
        ).Authorization = `Bearer ${token}`;
      } else {
        config.headers = {
          Authorization: `Bearer ${token}`,
        } as AxiosRequestHeaders;
      }
    }
    return config;
  }
);
export { http };

export const verifyToken = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem("refreshToken");
    if (!token) {
      return false;
    }
    await instance.post("/auth/jwt/verify/", { token: token });
    return true;
  } catch (error) {
    refreshToken();
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
    const newRefreshToken = refreshResponse.data.refresh;

    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    verifyToken();
    return true;
  } catch (error) {
    return false;
  }
};
