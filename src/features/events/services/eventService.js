import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";

const getData = (response) => {
  return response.data?.data ?? response.data?.Data ?? response.data;
};

export const eventService = {
  getAll: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.EVENTS);
    return getData(response);
  },

  create: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.EVENTS, data);
    return getData(response);
  },

  update: async (data) => {
    const response = await axiosInstance.put(API_ENDPOINTS.EVENTS, data);
    return getData(response);
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.EVENTS}/${id}`,
    );
    return getData(response);
  },
};
