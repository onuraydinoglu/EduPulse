import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";

export const authService = {
  login: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, data);
    return response.data;
  },

  registerSchool: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.AUTH.REGISTER_SCHOOL,
      data,
    );
    return response.data;
  },
};
