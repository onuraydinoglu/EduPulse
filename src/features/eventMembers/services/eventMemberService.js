import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";

const getData = (response) => {
  return response.data?.data ?? response.data?.Data ?? response.data;
};

export const eventMemberService = {
  getAll: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.EVENT_MEMBERS);
    return getData(response);
  },

  getByEventId: async (eventId) => {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.EVENT_MEMBERS}/event/${eventId}`
    );

    return getData(response);
  },

  getByStudentId: async (studentId) => {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.EVENT_MEMBERS}/student/${studentId}`
    );

    return getData(response);
  },

  getMyEvents: async () => {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.EVENT_MEMBERS}/my-events`
    );

    return getData(response);
  },

  create: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.EVENT_MEMBERS,
      data
    );

    return getData(response);
  },

  updatePayment: async (data) => {
    const response = await axiosInstance.put(
      `${API_ENDPOINTS.EVENT_MEMBERS}/payment`,
      data
    );

    return getData(response);
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.EVENT_MEMBERS}/${id}`
    );

    return getData(response);
  },
};