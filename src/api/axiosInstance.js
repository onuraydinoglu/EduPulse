import axios from "axios";
import { authStorage } from "../features/auth/services/authStorage";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getTokenFromUser = (user) => {
  return (
    user?.token ||
    user?.Token ||
    user?.accessToken ||
    user?.AccessToken ||
    user?.jwtToken ||
    user?.JwtToken ||
    user?.user?.token ||
    user?.user?.Token ||
    user?.data?.token ||
    user?.data?.Token ||
    user?.Data?.Token ||
    ""
  );
};

const getErrorMessage = (error) => {
  const responseData = error?.response?.data;

  if (typeof responseData === "string") return responseData;

  return (
    responseData?.message ||
    responseData?.Message ||
    responseData?.error ||
    responseData?.Error ||
    responseData?.title ||
    responseData?.errors?.[0] ||
    responseData?.Errors?.[0] ||
    error?.message ||
    "Beklenmeyen bir hata oluştu."
  );
};

axiosInstance.interceptors.request.use((config) => {
  const user = authStorage.getUser();
  const token = getTokenFromUser(user);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject({
      statusCode: error?.response?.status,
      message: getErrorMessage(error),
      errors: error?.response?.data?.errors || error?.response?.data?.Errors,
      response: error?.response,
      originalError: error,
    });
  },
);

export default axiosInstance;