export const getEventId = (event) => event?.id || event?.Id || "";

export const getEventName = (event) => {
    return event?.name || event?.Name || event?.title || event?.Title || "-";
};

export const getEventLocation = (event) => {
    return event?.location || event?.Location || "-";
};

export const getEventDate = (event) => {
    return event?.eventDate || event?.EventDate || "";
};

export const getEventDateText = (event) => {
    const value = getEventDate(event);

    if (!value) return "-";

    return new Date(value).toLocaleDateString("tr-TR");
};

export const getEventTime = (event) => {
    return (
        event?.startTime ||
        event?.StartTime ||
        event?.eventTime ||
        event?.EventTime ||
        ""
    );
};

export const getEventTimeText = (event) => {
    return getEventTime(event) || "-";
};

export const getEventIsPaid = (event) => {
    return event?.isPaid ?? event?.IsPaid ?? false;
};

export const getEventPricePerStudent = (event) => {
    return event?.pricePerStudent ?? event?.PricePerStudent ?? 0;
};

export const getEventPaymentText = (event) => {
    const isPaid = getEventIsPaid(event);
    const price = getEventPricePerStudent(event);

    return isPaid ? `${price} ₺` : "Ücretsiz";
};

export const getEventIsActive = (event) => {
    return event?.isActive ?? event?.IsActive ?? true;
};

export const getEventStatusText = (event) => {
    return getEventIsActive(event) ? "Aktif" : "Pasif";
};

export const getEventResponsibleTeacherIds = (event) => {
    return event?.responsibleTeacherIds || event?.ResponsibleTeacherIds || [];
};

export const getEventResponsibleTeacherNames = (event, teachers = []) => {
    const directNames =
        event?.responsibleTeacherNames ||
        event?.ResponsibleTeacherNames ||
        event?.teacherNames ||
        event?.TeacherNames;

    if (Array.isArray(directNames) && directNames.length > 0) {
        return directNames;
    }

    const teacherIds = getEventResponsibleTeacherIds(event);

    if (!Array.isArray(teacherIds) || teacherIds.length === 0) {
        return [];
    }

    return teacherIds
        .map((teacherId) => {
            const teacher = teachers.find((item) => {
                const id = item?.id || item?.Id;
                return id === teacherId;
            });

            if (!teacher) return null;

            const firstName = teacher?.firstName || teacher?.FirstName || "";
            const lastName = teacher?.lastName || teacher?.LastName || "";
            const fullName = teacher?.fullName || teacher?.FullName;

            return fullName || `${firstName} ${lastName}`.trim();
        })
        .filter(Boolean);
};

export const getTeacherSelectOptions = (teachers = []) => {
    return teachers.map((teacher) => {
        const id = teacher?.id || teacher?.Id;
        const firstName = teacher?.firstName || teacher?.FirstName || "";
        const lastName = teacher?.lastName || teacher?.LastName || "";
        const fullName =
            teacher?.fullName || teacher?.FullName || `${firstName} ${lastName}`.trim();

        return {
            label: fullName || "-",
            value: id,
        };
    });
};

export const filterEvents = (
    events = [],
    teachers = [],
    search = "",
    statusFilter = "all",
    paymentFilter = "all",
) => {
    const normalizedSearch = search.toLowerCase().trim();

    return events.filter((event) => {
        const name = getEventName(event).toLowerCase();
        const location = getEventLocation(event).toLowerCase();
        const teacherNames = getEventResponsibleTeacherNames(event, teachers)
            .join(" ")
            .toLowerCase();

        const isActive = getEventIsActive(event);
        const isPaid = getEventIsPaid(event);

        const matchesSearch =
            !normalizedSearch ||
            name.includes(normalizedSearch) ||
            location.includes(normalizedSearch) ||
            teacherNames.includes(normalizedSearch);

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

export const getErrorMessage = (error, fallbackMessage) => {
    return (
        error?.response?.data?.message ||
        error?.response?.data?.Message ||
        error?.response?.data?.error ||
        error?.response?.data?.Error ||
        error?.message ||
        fallbackMessage
    );
};

export const getBackendFieldErrors = (error) => {
    const errors =
        error?.response?.data?.errors ||
        error?.response?.data?.Errors ||
        error?.response?.data?.data?.errors ||
        {};

    if (Array.isArray(errors)) {
        return {
            general: errors.join(" "),
        };
    }

    return Object.keys(errors).reduce((acc, key) => {
        const value = errors[key];

        acc[key.charAt(0).toLowerCase() + key.slice(1)] = Array.isArray(value)
            ? value[0]
            : value;

        return acc;
    }, {});
};