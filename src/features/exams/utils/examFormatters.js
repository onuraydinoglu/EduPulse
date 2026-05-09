import { emptyExamGrades, examGradeFields } from "../constants/examConstants";

export const normalizeResultData = (result) => {
    if (Array.isArray(result)) return result;
    if (Array.isArray(result?.data)) return result.data;
    if (Array.isArray(result?.Data)) return result.Data;
    if (Array.isArray(result?.data?.data)) return result.data.data;
    if (Array.isArray(result?.Data?.Data)) return result.Data.Data;
    return [];
};

export const unwrapSingleData = (result) => {
    return result?.data || result?.Data || result;
};

export const getEntityId = (entity) => {
    return entity?.id || entity?.Id || "";
};

export const getClassroomName = (classroom) => {
    if (!classroom) return "-";

    const directName =
        classroom?.name ||
        classroom?.Name ||
        classroom?.classroomName ||
        classroom?.ClassroomName ||
        classroom?.className ||
        classroom?.ClassName;

    if (directName) return directName;

    const grade = classroom?.grade || classroom?.Grade || "";
    const section = classroom?.section || classroom?.Section || "";

    if (!grade && !section) return "-";

    return `${grade}-${section}`.trim();
};

export const getStudentId = (student) => {
    return student?.id || student?.Id || "";
};

export const getStudentClassroomId = (student) => {
    return (
        student?.classroomId ||
        student?.ClassroomId ||
        student?.classId ||
        student?.ClassId ||
        ""
    );
};

export const getStudentNumber = (student) => {
    return student?.studentNumber || student?.StudentNumber || "-";
};

export const getStudentFullName = (student) => {
    const fullName = student?.fullName || student?.FullName;

    if (fullName) return fullName;

    const firstName = student?.firstName || student?.FirstName || "";
    const lastName = student?.lastName || student?.LastName || "";

    return `${firstName} ${lastName}`.trim() || "-";
};

export const getLessonId = (lesson) => {
    return lesson?.id || lesson?.Id || "";
};

export const getLessonName = (lesson) => {
    return lesson?.name || lesson?.Name || lesson?.lessonName || "-";
};

export const getTeacherLessonClassroomId = (item) => {
    return (
        item?.classroomId ||
        item?.ClassroomId ||
        item?.classId ||
        item?.ClassId ||
        ""
    );
};

export const getTeacherLessonTeacherId = (item) => {
    return item?.teacherId || item?.TeacherId || "";
};

export const getTeacherLessonLessonId = (item) => {
    return item?.lessonId || item?.LessonId || "";
};

export const getTeacherLessonLessonName = (item) => {
    return (
        item?.lessonName ||
        item?.LessonName ||
        item?.lesson?.name ||
        item?.Lesson?.Name ||
        "-"
    );
};

export const getTeacherLessonIsActive = (item) => {
    return item?.isActive !== false && item?.IsActive !== false;
};

export const getExamId = (exam) => {
    return exam?.id || exam?.Id || "";
};

export const getExamStudentId = (exam) => {
    return exam?.studentId || exam?.StudentId || "";
};

export const getExamLessonId = (exam) => {
    return exam?.lessonId || exam?.LessonId || "";
};

export const getExamValue = (exam, key) => {
    const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
    return exam?.[key] ?? exam?.[pascalKey] ?? "";
};

export const normalizeGradeInput = (value) => {
    if (value === "" || value === null || value === undefined) return "";

    const numberValue = Number(value);

    if (Number.isNaN(numberValue)) return "";
    if (numberValue < 0) return "0";
    if (numberValue > 100) return "100";

    return String(numberValue);
};

export const normalizeGradeForPayload = (value) => {
    if (value === "" || value === null || value === undefined) return null;
    return Number(value);
};

export const calculateAverage = (grades) => {
    const values = examGradeFields
        .map((field) => Number(grades[field.key]))
        .filter((value) => !Number.isNaN(value));

    if (!values.length) return 0;

    return values.reduce((total, value) => total + value, 0) / values.length;
};

export const getAverageLabel = (average) => {
    return average > 0 ? average.toFixed(2) : "-";
};

export const getCurrentUser = () => {
    const rawUser = localStorage.getItem("edupulse_user");

    if (!rawUser) return null;

    try {
        return JSON.parse(rawUser);
    } catch {
        return null;
    }
};

export const decodeJwtPayload = (token) => {
    if (!token) return {};

    try {
        const payload = token.split(".")[1];

        if (!payload) return {};

        const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
        const decodedPayload = atob(normalizedPayload);

        return JSON.parse(decodedPayload);
    } catch {
        return {};
    }
};

export const getCurrentUserToken = (currentUser) => {
    return (
        currentUser?.token ||
        currentUser?.Token ||
        currentUser?.accessToken ||
        currentUser?.AccessToken ||
        currentUser?.jwtToken ||
        currentUser?.JwtToken ||
        currentUser?.user?.token ||
        currentUser?.user?.Token ||
        ""
    );
};

export const getCurrentUserRole = (currentUser) => {
    const token = getCurrentUserToken(currentUser);
    const payload = decodeJwtPayload(token);

    return (
        currentUser?.roleName ||
        currentUser?.RoleName ||
        currentUser?.role ||
        currentUser?.Role ||
        currentUser?.user?.roleName ||
        currentUser?.user?.RoleName ||
        payload?.role ||
        payload?.Role ||
        payload?.[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ] ||
        ""
    ).toLowerCase();
};

export const getCurrentTeacherId = (currentUser) => {
    const token = getCurrentUserToken(currentUser);
    const payload = decodeJwtPayload(token);

    return (
        currentUser?.teacherId ||
        currentUser?.TeacherId ||
        currentUser?.user?.teacherId ||
        currentUser?.user?.TeacherId ||
        currentUser?.teacher?.id ||
        currentUser?.Teacher?.Id ||
        payload?.teacherId ||
        payload?.TeacherId ||
        ""
    );
};

export const filterTeacherLessonsForClassroom = ({
    teacherLessons = [],
    classroomId,
    currentUser,
}) => {
    const roleName = getCurrentUserRole(currentUser);
    const currentTeacherId = getCurrentTeacherId(currentUser);

    return teacherLessons.filter((item) => {
        const itemClassroomId = getTeacherLessonClassroomId(item);
        const itemTeacherId = getTeacherLessonTeacherId(item);
        const isActive = getTeacherLessonIsActive(item);

        if (itemClassroomId !== classroomId || !isActive) {
            return false;
        }

        if (roleName === "teacher") {
            return Boolean(currentTeacherId) && itemTeacherId === currentTeacherId;
        }

        return true;
    });
};

export const createLessonOptionsFromTeacherLessons = (teacherLessons = []) => {
    const uniqueLessons = new Map();

    teacherLessons.forEach((item) => {
        const lessonId = getTeacherLessonLessonId(item);

        if (!lessonId) return;

        uniqueLessons.set(lessonId, {
            label: getTeacherLessonLessonName(item),
            value: lessonId,
        });
    });

    return Array.from(uniqueLessons.values());
};

export const createLessonOptionsFromLessons = (lessons = []) => {
    return [
        {
            label: "Ders seçiniz",
            value: "",
        },
        ...lessons.map((lesson) => ({
            label: getLessonName(lesson),
            value: getLessonId(lesson),
        })),
    ];
};

export const buildExamRows = ({
    students = [],
    exams = [],
    classroomId = "",
    selectedLessonId = "",
    editedGrades = {},
}) => {
    const classroomStudents = classroomId
        ? students.filter((student) => getStudentClassroomId(student) === classroomId)
        : students;

    return classroomStudents.map((student) => {
        const studentId = getStudentId(student);

        const existingExam = exams.find((exam) => {
            return (
                getExamStudentId(exam) === studentId &&
                getExamLessonId(exam) === selectedLessonId
            );
        });

        const backendGrades = existingExam
            ? {
                exam1: getExamValue(existingExam, "exam1"),
                exam2: getExamValue(existingExam, "exam2"),
                project: getExamValue(existingExam, "project"),
                activity1: getExamValue(existingExam, "activity1"),
                activity2: getExamValue(existingExam, "activity2"),
                activity3: getExamValue(existingExam, "activity3"),
            }
            : emptyExamGrades;

        const rowGrades = editedGrades[studentId] || backendGrades;
        const average = calculateAverage(rowGrades);

        return {
            studentId,
            examId: getExamId(existingExam),
            studentFullName: getStudentFullName(student),
            studentNumber: getStudentNumber(student),
            classroomId: getStudentClassroomId(student),
            average,
            averageLabel: getAverageLabel(average),
            isDirty: Boolean(editedGrades[studentId]),
            ...rowGrades,
        };
    });
};

export const filterExamRows = (rows = [], search = "") => {
    const normalizedSearch = search.toLocaleLowerCase("tr-TR").trim();

    if (!normalizedSearch) return rows;

    return rows.filter((row) => {
        return (
            row.studentFullName.toLocaleLowerCase("tr-TR").includes(normalizedSearch) ||
            String(row.studentNumber).toLocaleLowerCase("tr-TR").includes(normalizedSearch)
        );
    });
};

export const getErrorMessage = (error, fallback) => {
    const data = error?.response?.data || error;

    if (typeof data === "string") return data;

    return (
        data?.message ||
        data?.Message ||
        data?.error ||
        data?.Error ||
        data?.title ||
        data?.errors?.[0] ||
        data?.Errors?.[0] ||
        error?.message ||
        fallback
    );
};