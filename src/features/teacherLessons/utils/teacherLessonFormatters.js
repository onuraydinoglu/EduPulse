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

export const getTeacherLessonClassroomName = (item) =>
    item?.classroomName || item?.ClassroomName || "-";

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

const getTeacherLessonGroupKey = (item) => {
    const teacherId = getTeacherLessonTeacherId(item);
    const lessonId = getTeacherLessonLessonId(item);

    return `${teacherId}-${lessonId}`;
};

const getComparableDate = (item) => {
    const value =
        item?.createdDate ||
        item?.CreatedDate ||
        item?.updatedDate ||
        item?.UpdatedDate ||
        "";

    const time = new Date(value).getTime();

    return Number.isNaN(time) ? 0 : time;
};

const getClassroomSortValue = (classroomName = "") => {
    const text = String(classroomName).trim();
    const match = text.match(/(\d+)\s*[-/.]?\s*([A-Za-zÇĞİÖŞÜçğıöşü])?/);

    if (!match) {
        return {
            grade: Number.MAX_SAFE_INTEGER,
            section: text,
        };
    }

    return {
        grade: Number(match[1]),
        section: match[2] || "",
    };
};

const sortClassroomNames = (classroomNames = []) => {
    return [...classroomNames].sort((a, b) => {
        const valueA = getClassroomSortValue(a);
        const valueB = getClassroomSortValue(b);

        if (valueA.grade !== valueB.grade) {
            return valueA.grade - valueB.grade;
        }

        return valueA.section.localeCompare(valueB.section, "tr");
    });
};

export const getTeacherLessonClassroomIds = (item) => {
    if (Array.isArray(item?.classroomIds)) return item.classroomIds;
    if (Array.isArray(item?.ClassroomIds)) return item.ClassroomIds;

    if (Array.isArray(item?.items)) {
        return item.items.map(getTeacherLessonClassroomId).filter(Boolean);
    }

    const classroomId = getTeacherLessonClassroomId(item);

    return classroomId ? [classroomId] : [];
};

export const getGroupedTeacherLessonItems = (teacherLessons = []) => {
    if (!Array.isArray(teacherLessons)) return [];

    const groupedMap = new Map();

    teacherLessons.forEach((item, index) => {
        const groupKey = getTeacherLessonGroupKey(item);

        if (!groupedMap.has(groupKey)) {
            groupedMap.set(groupKey, {
                ...item,
                id: getTeacherLessonId(item),
                Id: getTeacherLessonId(item),
                teacherId: getTeacherLessonTeacherId(item),
                TeacherId: getTeacherLessonTeacherId(item),
                lessonId: getTeacherLessonLessonId(item),
                LessonId: getTeacherLessonLessonId(item),
                teacherFullName: getTeacherLessonTeacherName(item),
                TeacherFullName: getTeacherLessonTeacherName(item),
                lessonName: getTeacherLessonLessonName(item),
                LessonName: getTeacherLessonLessonName(item),
                classroomNames: [],
                classroomIds: [],
                ClassroomIds: [],
                items: [],
                _firstIndex: index,
                _sortDate: getComparableDate(item),
            });
        }

        const group = groupedMap.get(groupKey);
        const classroomName = getTeacherLessonClassroomName(item);
        const classroomId = getTeacherLessonClassroomId(item);

        group.items.push(item);

        if (classroomName && classroomName !== "-") {
            group.classroomNames.push(classroomName);
        }

        if (classroomId) {
            group.classroomIds.push(classroomId);
            group.ClassroomIds.push(classroomId);
        }

        const itemDate = getComparableDate(item);

        if (itemDate > group._sortDate) {
            group._sortDate = itemDate;
        }
    });

    return Array.from(groupedMap.values())
        .map((group) => {
            const uniqueClassroomNames = sortClassroomNames([
                ...new Set(group.classroomNames),
            ]);

            const uniqueClassroomIds = [...new Set(group.classroomIds)];
            const classroomNameText = uniqueClassroomNames.join(", ") || "-";
            const firstClassroomId = uniqueClassroomIds[0] || "";

            return {
                ...group,
                classroomId: firstClassroomId,
                ClassroomId: firstClassroomId,
                classroomIds: uniqueClassroomIds,
                ClassroomIds: uniqueClassroomIds,
                classroomName: classroomNameText,
                ClassroomName: classroomNameText,
                classroomNames: uniqueClassroomNames,
            };
        })
        .sort((a, b) => {
            if (b._sortDate !== a._sortDate) {
                return b._sortDate - a._sortDate;
            }

            return a._firstIndex - b._firstIndex;
        })
        .map(({ _firstIndex, _sortDate, ...item }) => item);
};

export const filterTeacherLessons = (teacherLessons = [], search = "") => {
    const normalizedSearch = search.toLowerCase().trim();

    return teacherLessons.filter((item) => {
        const searchableText = [
            getTeacherLessonTeacherName(item),
            getTeacherLessonLessonName(item),
            getTeacherLessonClassroomName(item),
        ]
            .join(" ")
            .toLowerCase();

        return searchableText.includes(normalizedSearch);
    });
};

export const validateTeacherLessonForm = (formData) => {
    const errors = {};

    if (!formData.teacherId) {
        errors.teacherId = "Öğretmen seçimi zorunludur.";
    }

    if (!formData.lessonId) {
        errors.lessonId = "Ders seçimi zorunludur.";
    }

    if (
        !Array.isArray(formData.classroomIds) ||
        formData.classroomIds.length === 0
    ) {
        errors.classroomIds = "En az bir sınıf seçmelisiniz.";
    }

    return errors;
};

export const hasTeacherLessonValidationError = (errors = {}) =>
    Object.values(errors).some(Boolean);