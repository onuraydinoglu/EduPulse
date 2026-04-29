import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";

export const studentService = {
  getAll: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.STUDENTS);
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`${API_ENDPOINTS.STUDENTS}/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.STUDENTS, data);
    return response.data;
  },

  update: async (data) => {
    const response = await axiosInstance.put(API_ENDPOINTS.STUDENTS, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.STUDENTS}/${id}`,
    );
    return response.data;
  },
};
