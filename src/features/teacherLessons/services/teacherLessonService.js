import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";

const unwrap = (response) =>
  response.data?.data ?? response.data?.Data ?? response.data;

export const teacherLessonService = {
  getAll: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.TEACHER_LESSONS);
    return unwrap(response);
  },

  getById: async (id) => {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.TEACHER_LESSONS}/${id}`,
    );
    return unwrap(response);
  },

  create: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.TEACHER_LESSONS, {
      teacherId: data.teacherId,
      lessonId: data.lessonId,
      classroomId: data.classroomId,
    });

    return response.data;
  },

  update: async (data) => {
    const response = await axiosInstance.put(API_ENDPOINTS.TEACHER_LESSONS, {
      id: data.id,
      teacherId: data.teacherId,
      lessonId: data.lessonId,
      classroomId: data.classroomId,
      isActive: data.isActive,
    });

    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.TEACHER_LESSONS}/${id}`,
    );

    return response.data;
  },
};
