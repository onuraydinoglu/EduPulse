import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";

const getData = (response) => {
  return response.data?.data || response.data?.Data || response.data || [];
};

export const messageService = {
  getMessageUsers: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.MESSAGES.USERS);
    return getData(response);
  },

  getInbox: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.MESSAGES.INBOX);
    return getData(response);
  },

  getSent: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.MESSAGES.SENT);
    return getData(response);
  },

  getConversation: async (otherUserId) => {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.MESSAGES.CONVERSATION}/${otherUserId}`
    );

    return getData(response);
  },

  send: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.MESSAGES.BASE,
      data
    );

    return getData(response);
  },

  markAsRead: async (id) => {
    const response = await axiosInstance.put(
      `${API_ENDPOINTS.MESSAGES.BASE}/${id}/read`
    );

    return getData(response);
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.MESSAGES.BASE}/${id}`
    );

    return getData(response);
  },
};