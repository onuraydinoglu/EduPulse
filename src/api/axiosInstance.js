import axios from "axios";
import { authStorage } from "../features/auth/services/authStorage";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const user = authStorage.getUser();
  const token = user?.token || user?.accessToken || user?.jwtToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const responseData = error.response?.data;

    const message =
      responseData?.message ||
      responseData?.Message ||
      responseData?.errors?.[0] ||
      responseData?.Errors?.[0] ||
      "Beklenmeyen bir hata oluştu.";

    return Promise.reject({
      statusCode: error.response?.status,
      message,
      errors: responseData?.errors || responseData?.Errors,
    });
  },
);

export default axiosInstance;
