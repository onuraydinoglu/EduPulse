import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";

const getData = (response) => {
  return response.data?.data ?? response.data?.Data ?? response.data;
};

export const clubMemberService = {
  getAll: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.CLUB_MEMBERS);
    return getData(response);
  },

  getByClubId: async (clubId) => {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.CLUB_MEMBERS}/club/${clubId}`,
    );
    return getData(response);
  },

  create: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.CLUB_MEMBERS, data);
    return getData(response);
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.CLUB_MEMBERS}/${id}`,
    );
    return getData(response);
  },
};
