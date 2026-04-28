import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";

export const authService = {
  login: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, data);
    return response.data;
  },

  register: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.REGISTER,
      data,
    );
    return response.data;
  },
};
