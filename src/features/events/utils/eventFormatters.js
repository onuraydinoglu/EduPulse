export const getEventId = (event) => {
    return event?.id || event?.Id || "";
};

export const getEventName = (event) => {
    return event?.name || event?.Name || "-";
};

export const getEventDescription = (event) => {
    return event?.description || event?.Description || "";
};

export const getEventLocation = (event) => {
    return event?.location || event?.Location || "-";
};

export const getEventDate = (event) => {
    return event?.eventDate || event?.EventDate || "";
};

export const getEventStartTime = (event) => {
    return event?.startTime || event?.StartTime || "";
};

export const getEventEndTime = (event) => {
    return event?.endTime || event?.EndTime || "";
};

export const getEventTime = (event) => {
    return getEventStartTime(event);
};

export const getEventIsPaid = (event) => {
    return Boolean(event?.isPaid ?? event?.IsPaid ?? false);
};

export const getEventPricePerStudent = (event) => {
    return Number(event?.pricePerStudent ?? event?.PricePerStudent ?? 0);
};

export const getEventQuota = (event) => {
    return event?.quota ?? event?.Quota ?? "";
};

export const getEventIsActive = (event) => {
    return Boolean(event?.isActive ?? event?.IsActive ?? true);
};

export const getTeacherId = (teacher) => {
    return (
        teacher?.teacherId ||
        teacher?.TeacherId ||
        teacher?.id ||
        teacher?.Id ||
        ""
    );
};

export const getTeacherUserId = (teacher) => {
    return teacher?.userId || teacher?.UserId || "";
};

export const getTeacherFullName = (teacher) => {
    const directName =
        teacher?.fullName ||
        teacher?.FullName ||
        teacher?.teacherFullName ||
        teacher?.TeacherFullName ||
        teacher?.name ||
        teacher?.Name;

    if (directName) return directName;

    const firstName = teacher?.firstName || teacher?.FirstName || "";
    const lastName = teacher?.lastName || teacher?.LastName || "";

    return `${firstName} ${lastName}`.trim();
};

export const getTeacherBranchName = (teacher) => {
    return (
        teacher?.branchLessonName ||
        teacher?.BranchLessonName ||
        teacher?.lessonName ||
        teacher?.LessonName ||
        teacher?.department ||
        teacher?.Department ||
        ""
    );
};

export const getEventResponsibleTeacherObjects = (event) => {
    const teachers = event?.responsibleTeachers || event?.ResponsibleTeachers;

    if (!Array.isArray(teachers)) return [];

    return teachers;
};

export const getEventResponsibleTeacherIds = (event) => {
    const directIds = event?.responsibleTeacherIds || event?.ResponsibleTeacherIds;

    if (Array.isArray(directIds)) {
        return directIds.filter(Boolean).map(String);
    }

    const responsibleTeachers = getEventResponsibleTeacherObjects(event);

    return responsibleTeachers
        .map((teacher) => getTeacherId(teacher))
        .filter(Boolean)
        .map(String);
};

export const getEventResponsibleTeacherNames = (event, teachers = []) => {
    const responsibleTeacherObjects = getEventResponsibleTeacherObjects(event);

    if (responsibleTeacherObjects.length > 0) {
        const names = responsibleTeacherObjects
            .map((teacher) => getTeacherFullName(teacher))
            .filter(Boolean);

        if (names.length > 0) return names;
    }

    const responsibleTeacherIds = getEventResponsibleTeacherIds(event);

    if (responsibleTeacherIds.length === 0) return [];

    return responsibleTeacherIds
        .map((teacherId) => {
            const matchedTeacher = teachers.find(
                (teacher) => String(getTeacherId(teacher)) === String(teacherId)
            );

            return getTeacherFullName(matchedTeacher);
        })
        .filter(Boolean);
};

export const getTeacherSelectOptions = (teachers = []) => {
    if (!Array.isArray(teachers)) return [];

    return teachers
        .map((teacher) => {
            const id = getTeacherId(teacher);
            const label = getTeacherFullName(teacher);
            const branchName = getTeacherBranchName(teacher);

            if (!id || !label) return null;

            return {
                value: String(id),
                label,
                description: branchName,
            };
        })
        .filter(Boolean);
};

export const normalizeResponsibleTeacherIds = (teacherIds = []) => {
    if (!Array.isArray(teacherIds)) return [];

    return [...new Set(teacherIds.filter(Boolean).map(String))];
};

export const formatEventDate = (dateValue) => {
    if (!dateValue) return "-";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

export const getEventDateText = (event) => {
    return formatEventDate(getEventDate(event));
};

export const formatEventTime = (startTime, endTime) => {
    if (!startTime && !endTime) return "-";

    if (startTime && endTime) {
        return `${startTime} - ${endTime}`;
    }

    return startTime || endTime || "-";
};

export const getEventTimeText = (event) => {
    return formatEventTime(getEventStartTime(event), getEventEndTime(event));
};

export const formatEventPrice = (isPaid, pricePerStudent) => {
    if (!isPaid) return "Ücretsiz";

    const price = Number(pricePerStudent || 0);

    return `${price.toLocaleString("tr-TR")} ₺`;
};

export const getEventPriceText = (event) => {
    return formatEventPrice(getEventIsPaid(event), getEventPricePerStudent(event));
};

export const getEventPaymentText = (event) => {
    return formatEventPrice(getEventIsPaid(event), getEventPricePerStudent(event));
};

export const getEventStatusLabel = (event) => {
    return getEventIsActive(event) ? "Aktif" : "Pasif";
};

export const getEventStatusText = (event) => {
    return getEventStatusLabel(event);
};

export const getEventPaymentLabel = (event) => {
    return getEventIsPaid(event) ? "Ücretli" : "Ücretsiz";
};

export const filterEvents = (
    events = [],
    teachers = [],
    searchTerm = "",
    statusFilter = "all",
    paymentFilter = "all"
) => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    return events.filter((event) => {
        const name = getEventName(event).toLowerCase();
        const location = getEventLocation(event).toLowerCase();
        const teacherNames = getEventResponsibleTeacherNames(event, teachers)
            .join(" ")
            .toLowerCase();

        const matchesSearch =
            !normalizedSearchTerm ||
            name.includes(normalizedSearchTerm) ||
            location.includes(normalizedSearchTerm) ||
            teacherNames.includes(normalizedSearchTerm);

        const isActive = getEventIsActive(event);
        const isPaid = getEventIsPaid(event);

        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && isActive) ||
            (statusFilter === "passive" && !isActive);

        const matchesPayment =
            paymentFilter === "all" ||
            (paymentFilter === "paid" && isPaid) ||
            (paymentFilter === "free" && !isPaid);

        return matchesSearch && matchesStatus && matchesPayment;
    });
};

export const getBackendFieldErrors = (error) => {
    const responseData = error?.response?.data;

    const errors =
        responseData?.errors ||
        responseData?.Errors ||
        responseData?.data?.errors ||
        responseData?.data?.Errors;

    if (!errors) return {};

    if (Array.isArray(errors)) {
        return {
            general: errors.join(" "),
        };
    }

    if (typeof errors === "object") {
        return Object.entries(errors).reduce((acc, [key, value]) => {
            const normalizedKey = key.charAt(0).toLowerCase() + key.slice(1);

            acc[normalizedKey] = Array.isArray(value) ? value[0] : value;

            return acc;
        }, {});
    }

    return {};
};