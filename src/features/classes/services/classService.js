import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";

export const classService = {
  getAll: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.CLASSROOMS);
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.CLASSROOMS}/${id}`,
    );
    return response.data;
  },

  create: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.CLASSROOMS, data);
    return response.data;
  },

  update: async (data) => {
    const response = await axiosInstance.put(API_ENDPOINTS.CLASSROOMS, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.CLASSROOMS}/${id}`,
    );
    return response.data;
  },
};
