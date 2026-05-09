import { emptyExamGrades } from "../constants/examConstants";

export const normalizeResultData = (result) => {
    return result?.data || result?.Data || [];
};

export const getEntityId = (entity) => {
    return entity?.id || entity?.Id || "";
};

export const getStudentId = (student) => {
    return student?.id || student?.Id || "";
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

export const getStudentClassroomId = (student) => {
    return student?.classroomId || student?.ClassroomId || "";
};

export const getStudentClassroomName = (student, classrooms = []) => {
    const directName =
        student?.classroomName ||
        student?.ClassroomName ||
        student?.className ||
        student?.ClassName;

    if (directName) return directName;

    const classroomId = getStudentClassroomId(student);

    const classroom = classrooms.find((item) => {
        return getEntityId(item) === classroomId;
    });

    if (!classroom) return "-";

    const grade = classroom?.grade || classroom?.Grade || "";
    const section = classroom?.section || classroom?.Section || "";

    return `${grade}/${section}`.trim() || "-";
};

export const getLessonId = (lesson) => {
    return lesson?.id || lesson?.Id || "";
};

export const getLessonName = (lesson) => {
    return lesson?.name || lesson?.Name || "-";
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

    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) return "";

    if (numericValue < 0) return "0";
    if (numericValue > 100) return "100";

    return String(numericValue);
};

export const normalizeGradeForPayload = (value) => {
    if (value === "" || value === null || value === undefined) return null;
    return Number(value);
};

export const calculateAverage = (grades) => {
    const values = [
        grades.exam1,
        grades.exam2,
        grades.project,
        grades.activity1,
        grades.activity2,
        grades.activity3,
    ]
        .map(Number)
        .filter((value) => !Number.isNaN(value));

    if (!values.length) return 0;

    return values.reduce((total, value) => total + value, 0) / values.length;
};

export const getAverageLabel = (average) => {
    return average > 0 ? average.toFixed(2) : "-";
};

export const createClassroomOptions = (classrooms = []) => {
    return [
        {
            label: "Tüm Sınıflar",
            value: "all",
        },
        ...classrooms.map((classroom) => {
            const id = getEntityId(classroom);
            const grade = classroom?.grade || classroom?.Grade || "";
            const section = classroom?.section || classroom?.Section || "";

            return {
                label: `${grade}/${section}`,
                value: id,
            };
        }),
    ];
};

export const createLessonOptions = (lessons = []) => {
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
    classrooms = [],
    selectedLessonId = "",
    editedGrades = {},
}) => {
    return students.map((student) => {
        const studentId = getStudentId(student);

        const existingExam = exams.find((exam) => {
            return (
                getExamStudentId(exam) === studentId &&
                getExamLessonId(exam) === selectedLessonId
            );
        });

        const examId = getExamId(existingExam);

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
            examId,
            studentFullName: getStudentFullName(student),
            studentNumber: getStudentNumber(student),
            classroomId: getStudentClassroomId(student),
            classroomName: getStudentClassroomName(student, classrooms),
            average,
            averageLabel: getAverageLabel(average),
            isDirty: Boolean(editedGrades[studentId]),
            ...rowGrades,
        };
    });
};

export const filterExamRows = ({
    rows = [],
    search = "",
    classroomFilter = "all",
}) => {
    const normalizedSearch = search.toLocaleLowerCase("tr-TR").trim();

    return rows.filter((row) => {
        const matchesSearch =
            !normalizedSearch ||
            row.studentFullName.toLocaleLowerCase("tr-TR").includes(normalizedSearch) ||
            String(row.studentNumber).toLocaleLowerCase("tr-TR").includes(normalizedSearch) ||
            row.classroomName.toLocaleLowerCase("tr-TR").includes(normalizedSearch);

        const matchesClassroom =
            classroomFilter === "all" || row.classroomId === classroomFilter;

        return matchesSearch && matchesClassroom;
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