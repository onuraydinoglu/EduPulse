export const getLessonId = (lesson) => {
    return lesson?.id || lesson?.Id || "";
};

export const getLessonName = (lesson) => {
    return lesson?.name || lesson?.Name || "İsimsiz Ders";
};

export const getLessonStatus = (lesson) => {
    if (lesson?.isActive === false || lesson?.IsActive === false) {
        return "pasif";
    }

    return "aktif";
};

export const filterLessons = (
    lessons = [],
    search = "",
    statusFilter = "all"
) => {
    const normalizedSearch = search.toLowerCase().trim();

    return lessons.filter((lesson) => {
        const name = getLessonName(lesson).toLowerCase();
        const status = getLessonStatus(lesson);

        const matchesSearch = !normalizedSearch || name.includes(normalizedSearch);

        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && status === "aktif") ||
            (statusFilter === "passive" && status !== "aktif");

        return matchesSearch && matchesStatus;
    });
};