export const getTeacherId = (teacher) => {
    return teacher?.id || teacher?.Id || "";
};

export const getTeacherFullName = (teacher) => {
    const fullName =
        teacher?.fullName ||
        teacher?.FullName ||
        `${teacher?.firstName || teacher?.FirstName || ""} ${teacher?.lastName || teacher?.LastName || ""
            }`.trim();

    return fullName || "-";
};

export const getTeacherEmail = (teacher) => {
    return teacher?.email || teacher?.Email || "";
};

export const getTeacherPhoneNumber = (teacher) => {
    return teacher?.phoneNumber || teacher?.PhoneNumber || "";
};

export const getTeacherBranch = (teacher) => {
    const branchLessonName = teacher?.branchLessonName || teacher?.BranchLessonName;
    const department = teacher?.department || teacher?.Department;

    return branchLessonName || department || "Branş atanmadı";
};

export const getTeacherStatus = (teacher) => {
    const status = teacher?.status || teacher?.Status;

    if (status) {
        const normalizedStatus = String(status).toLowerCase();

        if (normalizedStatus === "aktif" || normalizedStatus === "active") {
            return "aktif";
        }

        if (
            normalizedStatus === "pasif" ||
            normalizedStatus === "passive" ||
            normalizedStatus === "izinde" ||
            normalizedStatus === "leave"
        ) {
            return "pasif";
        }
    }

    if (teacher?.isActive === false || teacher?.IsActive === false) {
        return "pasif";
    }

    return "aktif";
};

export const getTeacherTemporaryPassword = (
    teacher,
    temporaryPasswords = {}
) => {
    const email = getTeacherEmail(teacher);

    return (
        temporaryPasswords[email] ||
        temporaryPasswords[email?.toLowerCase?.()] ||
        ""
    );
};

export const filterTeachers = (
    teachers = [],
    search = "",
    statusFilter = "all"
) => {
    const normalizedSearch = search.toLowerCase().trim();

    return teachers.filter((teacher) => {
        const fullName = getTeacherFullName(teacher).toLowerCase();
        const email = getTeacherEmail(teacher).toLowerCase();
        const phoneNumber = getTeacherPhoneNumber(teacher).toLowerCase();
        const branch = getTeacherBranch(teacher).toLowerCase();
        const status = getTeacherStatus(teacher);

        const matchesSearch =
            !normalizedSearch ||
            fullName.includes(normalizedSearch) ||
            email.includes(normalizedSearch) ||
            phoneNumber.includes(normalizedSearch) ||
            branch.includes(normalizedSearch);

        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && status === "aktif") ||
            (statusFilter === "passive" && status !== "aktif");

        return matchesSearch && matchesStatus;
    });
};