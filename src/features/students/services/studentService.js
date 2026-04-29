import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";

export const studentService = {
  getAll: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.USERS.STUDENTS);
    return response.data;
  },

  create: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.USERS.STUDENT,
      data,
    );
    return response.data;
  },

  update: async (data) => {
    const response = await axiosInstance.put(API_ENDPOINTS.USERS.BASE, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.USERS.BASE}/${id}`,
    );
    return response.data;
  },
};
