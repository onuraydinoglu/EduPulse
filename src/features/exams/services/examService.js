import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";

export const examService = {
  getAll: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.STUDENT_GRADES);
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`${API_ENDPOINTS.STUDENT_GRADES}/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.STUDENT_GRADES, data);
    return response.data;
  },

  update: async (data) => {
    const response = await axiosInstance.put(API_ENDPOINTS.STUDENT_GRADES, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`${API_ENDPOINTS.STUDENT_GRADES}/${id}`);
    return response.data;
  },
};