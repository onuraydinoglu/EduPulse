import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";

const getData = (response) => {
  return response.data?.data ?? response.data?.Data ?? response.data;
};

export const clubService = {
  getAll: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.CLUBS);
    return getData(response);
  },

  create: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.CLUBS, data);
    return getData(response);
  },

  update: async (data) => {
    const response = await axiosInstance.put(API_ENDPOINTS.CLUBS, data);
    return getData(response);
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`${API_ENDPOINTS.CLUBS}/${id}`);
    return getData(response);
  },
};
