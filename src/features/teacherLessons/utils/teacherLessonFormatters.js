export const getTeacherLessonId = (item) => item?.id || item?.Id || "";

export const getTeacherLessonTeacherId = (item) =>
    item?.teacherId || item?.TeacherId || "";

export const getTeacherLessonLessonId = (item) =>
    item?.lessonId || item?.LessonId || "";

export const getTeacherLessonClassroomId = (item) =>
    item?.classroomId || item?.ClassroomId || "";

export const getTeacherLessonTeacherName = (item) =>
    item?.teacherFullName ||
    item?.teacherName ||
    item?.TeacherFullName ||
    item?.TeacherName ||
    "-";

export const getTeacherLessonLessonName = (item) =>
    item?.lessonName || item?.LessonName || "-";

export const getTeacherLessonClassroomName = (item) => {
    if (Array.isArray(item?.classroomNames) && item.classroomNames.length > 0) {
        return item.classroomNames.join(", ");
    }

    return item?.classroomName || item?.ClassroomName || "-";
};

export const getTeacherLessonIsActive = (item) =>
    item?.isActive !== false && item?.IsActive !== false;

export const getTeacherLessonStatus = (item) =>
    getTeacherLessonIsActive(item) ? "Aktif" : "Pasif";

export const getTeacherLessonStatusLabel = (item) =>
    getTeacherLessonIsActive(item) ? "Aktif" : "Pasif";

export const getListData = (result) => {
    if (Array.isArray(result)) return result;
    if (Array.isArray(result?.data)) return result.data;
    if (Array.isArray(result?.Data)) return result.Data;
    if (Array.isArray(result?.data?.data)) return result.data.data;
    if (Array.isArray(result?.Data?.Data)) return result.Data.Data;

    return [];
};

export const getErrorMessage = (error, fallback) => {
    const data = error?.response?.data;

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
    const data = error?.response?.data;
    const backendErrors = data?.errors || data?.Errors;

    if (!backendErrors || Array.isArray(backendErrors)) return {};

    const fieldErrors = {};

    Object.entries(backendErrors).forEach(([key, value]) => {
        const fieldName = key.charAt(0).toLowerCase() + key.slice(1);
        fieldErrors[fieldName] = Array.isArray(value) ? value[0] : value;
    });

    return fieldErrors;
};

export const mapTeachersToOptions = (teachers = []) => [
    {
        value: "",
        label: "Öğretmen seçiniz",
    },
    ...teachers.map((teacher) => {
        const firstName = teacher.firstName || teacher.FirstName || "";
        const lastName = teacher.lastName || teacher.LastName || "";

        const fullName =
            teacher.fullName ||
            teacher.FullName ||
            `${firstName} ${lastName}`.trim() ||
            "-";

        return {
            value: teacher.id || teacher.Id,
            label: fullName,
        };
    }),
];

export const mapLessonsToOptions = (lessons = []) => [
    {
        value: "",
        label: "Ders seçiniz",
    },
    ...lessons.map((lesson) => ({
        value: lesson.id || lesson.Id,
        label:
            lesson.name ||
            lesson.Name ||
            lesson.lessonName ||
            lesson.LessonName ||
            "-",
    })),
];

export const mapClassroomsToOptions = (classrooms = []) => [
    {
        value: "",
        label: "Sınıf seçiniz",
    },
    ...classrooms.map((classroom) => {
        const grade = classroom.grade || classroom.Grade || "";
        const section = classroom.section || classroom.Section || "";

        const classroomName =
            classroom.name ||
            classroom.Name ||
            classroom.classroomName ||
            classroom.ClassroomName ||
            `${grade}-${section}`.trim() ||
            "-";

        return {
            value: classroom.id || classroom.Id,
            label: classroomName,
        };
    }),
];

export const filterTeacherLessons = (
    teacherLessons = [],
    search = "",
    statusFilter = "all"
) => {
    const normalizedSearch = search.toLocaleLowerCase("tr-TR").trim();

    return teacherLessons.filter((item) => {
        const isActive = getTeacherLessonIsActive(item);

        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && isActive) ||
            (statusFilter === "passive" && !isActive);

        const searchableText = [
            getTeacherLessonTeacherName(item),
            getTeacherLessonLessonName(item),
            getTeacherLessonClassroomName(item),
        ]
            .join(" ")
            .toLocaleLowerCase("tr-TR");

        return matchesStatus && searchableText.includes(normalizedSearch);
    });
};

const getTeacherLessonGroupKey = (item) => {
    const teacherId = getTeacherLessonTeacherId(item);
    const lessonId = getTeacherLessonLessonId(item);
    const isActive = getTeacherLessonIsActive(item);

    return `${teacherId}-${lessonId}-${isActive}`;
};

const sortClassroomNames = (classroomNames = []) => {
    return [...classroomNames].sort((a, b) => {
        const [gradeA, sectionA = ""] = String(a).split("-");
        const [gradeB, sectionB = ""] = String(b).split("-");

        const numericGradeA = Number(gradeA);
        const numericGradeB = Number(gradeB);

        if (!Number.isNaN(numericGradeA) && !Number.isNaN(numericGradeB)) {
            if (numericGradeA !== numericGradeB) {
                return numericGradeA - numericGradeB;
            }
        }

        return sectionA.localeCompare(sectionB, "tr-TR");
    });
};

export const getGroupedTeacherLessonItems = (teacherLessons = []) => {
    if (!Array.isArray(teacherLessons)) return [];

    const groupedMap = new Map();

    teacherLessons.forEach((item) => {
        const groupKey = getTeacherLessonGroupKey(item);

        if (!groupedMap.has(groupKey)) {
            groupedMap.set(groupKey, {
                ...item,
                classroomNames: [],
            });
        }

        const group = groupedMap.get(groupKey);
        const classroomName = getTeacherLessonClassroomName(item);

        if (classroomName && classroomName !== "-") {
            group.classroomNames.push(classroomName);
        }
    });

    return Array.from(groupedMap.values()).map((group) => {
        const uniqueClassroomNames = sortClassroomNames([
            ...new Set(group.classroomNames),
        ]);

        const classroomNameText = uniqueClassroomNames.join(", ") || "-";

        return {
            ...group,
            classroomName: classroomNameText,
            ClassroomName: classroomNameText,
            classroomNames: uniqueClassroomNames,
        };
    });
};

export const validateTeacherLessonForm = (formData, isEditing = false) => {
    const errors = {};

    if (!formData.teacherId) {
        errors.teacherId = "Öğretmen seçimi zorunludur.";
    }

    if (!formData.lessonId) {
        errors.lessonId = "Ders seçimi zorunludur.";
    }

    if (isEditing) {
        if (!formData.classroomId) {
            errors.classroomId = "Sınıf seçimi zorunludur.";
        }
    } else if (
        !Array.isArray(formData.classroomIds) ||
        formData.classroomIds.length === 0
    ) {
        errors.classroomIds = "En az bir sınıf seçmelisiniz.";
    }

    return errors;
};

export const hasTeacherLessonValidationError = (errors = {}) =>
    Object.values(errors).some(Boolean);