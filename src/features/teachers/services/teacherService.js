import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";

export const teacherService = {
  getAll: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.USERS.TEACHERS);
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.USERS.BASE}/${id}`,
    );
    return response.data;
  },

  create: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.USERS.TEACHER,
      data,
    );
    return response.data;
  },

  update: async (data) => {
    const response = await axiosInstance.put(API_ENDPOINTS.USERS.TEACHER, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.USERS.TEACHER}/${id}`,
    );
    return response.data;
  },
};
