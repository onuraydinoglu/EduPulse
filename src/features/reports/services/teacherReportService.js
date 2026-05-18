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

export const teacherReportService = {
    getTeacherReportData: async () => {
        const [
            teachers,
            students,
            classes,
            clubs,
            clubMembers,
            studentGrades,
            trialExams,
        ] = await Promise.all([
            requestAll(API_ENDPOINTS.TEACHERS),
            requestAll(API_ENDPOINTS.STUDENTS),
            requestAll(API_ENDPOINTS.CLASSROOMS),
            requestAll(API_ENDPOINTS.CLUBS),
            requestAll(API_ENDPOINTS.CLUB_MEMBERS),
            requestAll(API_ENDPOINTS.STUDENT_GRADES),
            requestAll(API_ENDPOINTS.TRIAL_EXAMS),
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