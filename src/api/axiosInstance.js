import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
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
