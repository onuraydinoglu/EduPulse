import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";
import { toArray } from "../utils/profileFormatters";

export const studentExamService = {
  getMyGrades: async () => {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.STUDENT_GRADES}/my`
    );

    return toArray(response.data);
  },
};