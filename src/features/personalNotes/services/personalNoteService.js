import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";

const getData = (response) => {
  return response.data?.data || response.data?.Data || response.data || [];
};

export const personalNoteService = {
  getAll: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.PERSONAL_NOTES);
    return getData(response);
  },

  getById: async (id) => {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.PERSONAL_NOTES}/${id}`,
    );
    return getData(response);
  },

  create: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PERSONAL_NOTES,
      data,
    );
    return response.data;
  },

  update: async (data) => {
    const response = await axiosInstance.put(
      API_ENDPOINTS.PERSONAL_NOTES,
      data,
    );
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.PERSONAL_NOTES}/${id}`,
    );
    return response.data;
  },
};
