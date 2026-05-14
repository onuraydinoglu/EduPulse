import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";
import {
    isRelatedToStudent,
    isRelatedToTeacher,
    isSameId,
    toArray,
    unwrapData,
} from "../utils/profileFormatters";

const safeGet = async (url, fallback = null) => {
    try {
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        console.warn(`${url} endpointinden veri alınamadı.`, error);
        return fallback;
    }
};

const getOfficerById = async (id) => {
    const result = await safeGet(API_ENDPOINTS.USERS.OFFICERS, []);
    const officers = toArray(result);

    return (
        officers.find((officer) => isSameId(officer?.id, id)) ||
        null
    );
};

const getId = (item) => {
    return item?.id || "";
};

const getStudentClassroomId = (student) => {
    return student?.classroomId || "";
};

const getClassroomTeacherId = (classroom) => {
    return classroom?.teacherId || "";
};

const getClassroomTeacherFullName = (classroom) => {
    return classroom?.teacherFullName || "";
};

const getTeacherFullName = (teacher) => {
    return teacher?.fullName || "-";
};

const findStudentClassroom = (student, classrooms = []) => {
    const classroomId = getStudentClassroomId(student);

    if (!classroomId) {
        return null;
    }

    return (
        classrooms.find((classroom) => isSameId(getId(classroom), classroomId)) ||
        null
    );
};

const findTeacherByClassroom = (classroom, teachers = []) => {
    const teacherId = getClassroomTeacherId(classroom);

    if (!teacherId) {
        return null;
    }

    return (
        teachers.find((teacher) => isSameId(getId(teacher), teacherId)) || null
    );
};

const enrichStudentWithClassroomTeacher = (
    student,
    classrooms = [],
    teachers = []
) => {
    if (!student) {
        return null;
    }

    const classroom = findStudentClassroom(student, classrooms);
    const classroomTeacherName = getClassroomTeacherFullName(classroom);

    if (classroomTeacherName) {
        return {
            ...student,
            classroomTeacherName,
        };
    }

    const classroomTeacher = findTeacherByClassroom(classroom, teachers);

    return {
        ...student,
        classroomTeacherName: getTeacherFullName(classroomTeacher),
    };
};

const getEventId = (eventMember) => {
    return eventMember?.eventId || "";
};

const enrichEventMembersWithEvents = (eventMembers = [], events = []) => {
    return eventMembers.map((eventMember) => {
        const event = events.find((item) =>
            isSameId(item?.id, getEventId(eventMember))
        );

        if (!event) {
            return eventMember;
        }

        return {
            ...eventMember,
            eventName: event.name,
            location: event.location,
            eventDate: event.eventDate,
            startTime: event.startTime,
            endTime: event.endTime,
            isPaid: event.isPaid,
            pricePerStudent: event.pricePerStudent,
        };
    });
};

const getStudentProfile = async (id) => {
    const [
        studentResult,
        gradesResult,
        trialExamsResult,
        clubMembersResult,
        eventMembersResult,
        eventsResult,
        classroomsResult,
        teachersResult,
    ] = await Promise.all([
        safeGet(`${API_ENDPOINTS.STUDENTS}/${id}`, null),
        safeGet(API_ENDPOINTS.STUDENT_GRADES, []),
        safeGet(API_ENDPOINTS.TRIAL_EXAMS, []),
        safeGet(API_ENDPOINTS.CLUB_MEMBERS, []),
        safeGet(API_ENDPOINTS.EVENT_MEMBERS, []),
        safeGet(API_ENDPOINTS.EVENTS, []),
        safeGet(API_ENDPOINTS.CLASSROOMS, []),
        safeGet(API_ENDPOINTS.TEACHERS, []),
    ]);

    const student = unwrapData(studentResult);
    const classrooms = toArray(classroomsResult);
    const teachers = toArray(teachersResult);

    const enrichedStudent = enrichStudentWithClassroomTeacher(
        student,
        classrooms,
        teachers
    );

    const grades = toArray(gradesResult).filter((item) =>
        isRelatedToStudent(item, id)
    );

    const trialExams = toArray(trialExamsResult).filter((item) =>
        isRelatedToStudent(item, id)
    );

    const clubMembers = toArray(clubMembersResult).filter((item) =>
        isRelatedToStudent(item, id)
    );

    const filteredEventMembers = toArray(eventMembersResult).filter((item) =>
        isRelatedToStudent(item, id)
    );

    const eventMembers = enrichEventMembersWithEvents(
        filteredEventMembers,
        toArray(eventsResult)
    );

    return {
        profile: enrichedStudent,
        details: {
            grades,
            trialExams,
            clubMembers,
            eventMembers,
        },
    };
};

const getTeacherProfile = async (id) => {
    const [
        teacherResult,
        teacherLessonsResult,
        classroomsResult,
        clubsResult,
        eventsResult,
    ] = await Promise.all([
        safeGet(`${API_ENDPOINTS.TEACHERS}/${id}`, null),
        safeGet(API_ENDPOINTS.TEACHER_LESSONS, []),
        safeGet(API_ENDPOINTS.CLASSROOMS, []),
        safeGet(API_ENDPOINTS.CLUBS, []),
        safeGet(API_ENDPOINTS.EVENTS, []),
    ]);

    const teacher = unwrapData(teacherResult);

    const teacherLessons = toArray(teacherLessonsResult).filter((item) =>
        isRelatedToTeacher(item, id)
    );

    const advisorClassrooms = toArray(classroomsResult).filter((item) =>
        isRelatedToTeacher(item, id)
    );

    const clubs = toArray(clubsResult).filter((item) =>
        isRelatedToTeacher(item, id)
    );

    const events = toArray(eventsResult).filter((item) =>
        isRelatedToTeacher(item, id)
    );

    return {
        profile: teacher,
        details: {
            teacherLessons,
            advisorClassrooms,
            clubs,
            events,
        },
    };
};

const getOfficerProfile = async (id) => {
    const officer = await getOfficerById(id);

    return {
        profile: officer,
        details: {},
    };
};

export const profileService = {
    getProfile: async (profileType, id) => {
        if (profileType === "student") {
            return getStudentProfile(id);
        }

        if (profileType === "teacher") {
            return getTeacherProfile(id);
        }

        if (profileType === "officer") {
            return getOfficerProfile(id);
        }

        throw new Error("Geçersiz profil tipi.");
    },
};