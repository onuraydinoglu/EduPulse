export const getClubId = (club) => club?.id || club?.Id || "";

export const getClubName = (club) => club?.name || club?.Name || "-";

export const getClubAdvisorTeacherId = (club) =>
    club?.advisorTeacherId || club?.AdvisorTeacherId || "";

export const getClubAdvisorTeacherName = (club, teachers = []) => {
    const directName =
        club?.advisorTeacherFullName ||
        club?.AdvisorTeacherFullName ||
        club?.teacherFullName ||
        club?.TeacherFullName;

    if (directName) return directName;

    const teacherId = getClubAdvisorTeacherId(club);

    const teacher = teachers.find((item) => {
        const id = item?.id || item?.Id;
        return id === teacherId;
    });

    if (!teacher) return "-";

    const firstName = teacher?.firstName || teacher?.FirstName || "";
    const lastName = teacher?.lastName || teacher?.LastName || "";
    const fullName = teacher?.fullName || teacher?.FullName;

    return fullName || `${firstName} ${lastName}`.trim() || "-";
};

export const getClubMemberCount = (club) =>
    club?.memberCount ?? club?.MemberCount ?? 0;

export const getClubIsActive = (club) =>
    club?.isActive ?? club?.IsActive ?? true;

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

export const filterClubs = (
    clubs = [],
    teachers = [],
    search = "",
    statusFilter = "all",
) => {
    const normalizedSearch = search.toLowerCase().trim();

    return clubs.filter((club) => {
        const name = getClubName(club).toLowerCase();
        const teacherName = getClubAdvisorTeacherName(club, teachers).toLowerCase();
        const isActive = getClubIsActive(club);

        const matchesSearch =
            !normalizedSearch ||
            name.includes(normalizedSearch) ||
            teacherName.includes(normalizedSearch);

        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && isActive) ||
            (statusFilter === "passive" && !isActive);

        return matchesSearch && matchesStatus;
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