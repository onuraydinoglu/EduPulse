export const getValue = (obj, keys = [], fallback = "-") => {
    for (const key of keys) {
        const value = obj?.[key];

        if (value !== undefined && value !== null && value !== "") {
            return value;
        }
    }

    return fallback;
};

export const unwrapData = (result) => {
    if (!result) return null;

    if (Array.isArray(result)) return result;

    return (
        result.data ||
        result.Data ||
        result.items ||
        result.Items ||
        result.result ||
        result.Result ||
        result
    );
};

export const toArray = (value) => {
    const data = unwrapData(value);

    if (Array.isArray(data)) return data;

    return [];
};

export const getEntityId = (item) => {
    return getValue(item, ["id", "Id"], "");
};

export const getFullName = (item) => {
    const firstName = getValue(item, ["firstName", "FirstName"], "");
    const lastName = getValue(item, ["lastName", "LastName"], "");

    const generatedFullName = `${firstName} ${lastName}`.trim();

    return getValue(
        item,
        ["fullName", "FullName", "studentFullName", "StudentFullName", "teacherFullName", "TeacherFullName"],
        generatedFullName || "-"
    );
};

export const getEmail = (item) => {
    return getValue(item, ["email", "Email"], "-");
};

export const getPhoneNumber = (item) => {
    return getValue(item, ["phoneNumber", "PhoneNumber"], "-");
};

export const getStatus = (item) => {
    const status = getValue(item, ["status", "Status"], "");

    if (status) {
        const normalizedStatus = String(status).toLocaleLowerCase("tr-TR");

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

    if (item?.isActive === false || item?.IsActive === false) {
        return "pasif";
    }

    return "aktif";
};

export const getProfileTypeLabel = (profileType) => {
    const labels = {
        student: "Öğrenci",
        teacher: "Öğretmen",
        officer: "Memur",
    };

    return labels[profileType] || "Profil";
};

export const getBackPathByProfileType = (profileType) => {
    const paths = {
        student: "/dashboard/students",
        teacher: "/dashboard/teachers",
        officer: "/dashboard/officers",
    };

    return paths[profileType] || "/dashboard";
};

export const isSameId = (value1, value2) => {
    return String(value1 || "").toLowerCase() === String(value2 || "").toLowerCase();
};

export const isRelatedToStudent = (item, studentId) => {
    const relatedStudentId = getValue(item, ["studentId", "StudentId"], "");

    return isSameId(relatedStudentId, studentId);
};

export const isRelatedToTeacher = (item, teacherId) => {
    const relatedTeacherId = getValue(item, ["teacherId", "TeacherId", "advisorTeacherId", "AdvisorTeacherId"], "");

    return isSameId(relatedTeacherId, teacherId);
};

export const formatDate = (value) => {
    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString("tr-TR");
};