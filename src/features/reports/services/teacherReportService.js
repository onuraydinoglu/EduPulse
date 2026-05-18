import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";
import { authStorage } from "../../auth/services/authStorage";

const getData = (result) => {
    if (Array.isArray(result)) return result;

    return result?.data || result?.Data || [];
};

const requestAll = async (endpoint) => {
    const response = await axiosInstance.get(endpoint);
    return getData(response.data);
};

const requestOptional = async (endpoint) => {
    try {
        return await requestAll(endpoint);
    } catch (error) {
        console.warn(`${endpoint} verisi alınamadı:`, error?.message || error);
        return [];
    }
};

export const teacherReportService = {
    getTeacherReportData: async () => {
        const [teachers, students, classes] = await Promise.all([
            requestAll(API_ENDPOINTS.TEACHERS),
            requestAll(API_ENDPOINTS.STUDENTS),
            requestAll(API_ENDPOINTS.CLASSROOMS),
        ]);

        const [clubs, clubMembers, studentGrades, trialExams] = await Promise.all([
            requestOptional(API_ENDPOINTS.CLUBS),
            requestOptional(API_ENDPOINTS.CLUB_MEMBERS),
            requestOptional(API_ENDPOINTS.STUDENT_GRADES),
            requestOptional(API_ENDPOINTS.TRIAL_EXAMS),
        ]);

        return {
            currentUser: authStorage.getUser(),
            teachers,
            students,
            classes,
            clubs,
            clubMembers,
            studentGrades,
            trialExams,
        };
    },
};