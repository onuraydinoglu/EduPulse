export const getExamId = (exam) => {
    return exam?.id || exam?.Id || "";
};

export const getExamStudentId = (exam) => {
    return exam?.studentId || exam?.StudentId || "";
};

export const getExamLessonId = (exam) => {
    return exam?.lessonId || exam?.LessonId || "";
};

export const getExamStudentFullName = (exam) => {
    return (
        exam?.studentFullName ||
        exam?.StudentFullName ||
        exam?.studentName ||
        exam?.StudentName ||
        "-"
    );
};

export const getExamLessonName = (exam) => {
    return exam?.lessonName || exam?.LessonName || "-";
};

export const getExamClassroomName = (exam) => {
    return (
        exam?.classroomName ||
        exam?.ClassroomName ||
        exam?.className ||
        exam?.ClassName ||
        "-"
    );
};

export const getExamValue = (exam, key) => {
    return exam?.[key] ?? exam?.[key.charAt(0).toUpperCase() + key.slice(1)] ?? "";
};

export const getExam1 = (exam) => getExamValue(exam, "exam1");
export const getExam2 = (exam) => getExamValue(exam, "exam2");
export const getExamProject = (exam) => getExamValue(exam, "project");
export const getExamActivity1 = (exam) => getExamValue(exam, "activity1");
export const getExamActivity2 = (exam) => getExamValue(exam, "activity2");
export const getExamActivity3 = (exam) => getExamValue(exam, "activity3");

export const getExamAverage = (exam) => {
    const average = exam?.average ?? exam?.Average;

    if (average !== undefined && average !== null && average !== "") {
        return Number(average);
    }

    const values = [
        getExam1(exam),
        getExam2(exam),
        getExamProject(exam),
        getExamActivity1(exam),
        getExamActivity2(exam),
        getExamActivity3(exam),
    ]
        .map(Number)
        .filter((value) => !Number.isNaN(value));

    if (!values.length) return 0;

    return values.reduce((total, value) => total + value, 0) / values.length;
};

export const getExamAverageLabel = (exam) => {
    const average = getExamAverage(exam);
    return average ? average.toFixed(2) : "-";
};

export const getExamIsActive = (exam) => {
    return exam?.isActive !== false && exam?.IsActive !== false;
};

export const getExamStatus = (exam) => {
    return getExamIsActive(exam) ? "aktif" : "pasif";
};

export const getExamStatusLabel = (exam) => {
    return getExamIsActive(exam) ? "Aktif" : "Pasif";
};

export const getExamResultStatus = (exam) => {
    return getExamAverage(exam) >= 50 ? "Geçti" : "Kaldı";
};

export const normalizeSelectOptions = (items = [], labelGetter, valueGetter) => {
    return items.map((item) => ({
        label: labelGetter(item),
        value: valueGetter(item),
    }));
};

export const getStudentId = (student) => {
    return student?.id || student?.Id || "";
};

export const getStudentFullName = (student) => {
    return (
        student?.fullName ||
        student?.FullName ||
        `${student?.firstName || student?.FirstName || ""} ${student?.lastName || student?.LastName || ""
            }`.trim() ||
        "-"
    );
};

export const getLessonId = (lesson) => {
    return lesson?.id || lesson?.Id || "";
};

export const getLessonName = (lesson) => {
    return lesson?.name || lesson?.Name || "-";
};

export const filterExams = (
    exams = [],
    search = "",
    statusFilter = "all",
    averageFilter = "all",
) => {
    const normalizedSearch = search.toLocaleLowerCase("tr-TR").trim();

    return exams.filter((exam) => {
        const studentName = getExamStudentFullName(exam).toLocaleLowerCase("tr-TR");
        const lessonName = getExamLessonName(exam).toLocaleLowerCase("tr-TR");
        const classroomName = getExamClassroomName(exam).toLocaleLowerCase("tr-TR");
        const average = getExamAverage(exam);
        const isActive = getExamIsActive(exam);

        const matchesSearch =
            !normalizedSearch ||
            studentName.includes(normalizedSearch) ||
            lessonName.includes(normalizedSearch) ||
            classroomName.includes(normalizedSearch);

        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && isActive) ||
            (statusFilter === "passive" && !isActive);

        const matchesAverage =
            averageFilter === "all" ||
            (averageFilter === "passed" && average >= 50) ||
            (averageFilter === "failed" && average < 50);

        return matchesSearch && matchesStatus && matchesAverage;
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

export const getBackendFieldErrors = (error) => {
    const data = error?.response?.data || error;
    const backendErrors = data?.errors || data?.Errors;

    if (!backendErrors || Array.isArray(backendErrors)) return {};

    const fieldErrors = {};

    Object.entries(backendErrors).forEach(([key, value]) => {
        const fieldName = key.charAt(0).toLowerCase() + key.slice(1);
        fieldErrors[fieldName] = Array.isArray(value) ? value[0] : value;
    });

    return fieldErrors;
};