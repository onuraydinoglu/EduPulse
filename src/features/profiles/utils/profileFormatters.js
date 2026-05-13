import {
    PROFILE_BACK_PATHS,
    PROFILE_STATUS,
    PROFILE_TYPE_LABELS,
} from "../constants/profileConstants";

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
        [
            "fullName",
            "FullName",
            "studentFullName",
            "StudentFullName",
            "teacherFullName",
            "TeacherFullName",
        ],
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
            return PROFILE_STATUS.ACTIVE;
        }

        if (
            normalizedStatus === "pasif" ||
            normalizedStatus === "passive" ||
            normalizedStatus === "izinde" ||
            normalizedStatus === "leave"
        ) {
            return PROFILE_STATUS.PASSIVE;
        }
    }

    if (item?.isActive === false || item?.IsActive === false) {
        return PROFILE_STATUS.PASSIVE;
    }

    return PROFILE_STATUS.ACTIVE;
};

export const getProfileTypeLabel = (profileType) => {
    return PROFILE_TYPE_LABELS[profileType] || "Profil";
};

export const getBackPathByProfileType = (profileType) => {
    return PROFILE_BACK_PATHS[profileType] || "/dashboard";
};

export const isSameId = (value1, value2) => {
    return String(value1 || "").toLowerCase() === String(value2 || "").toLowerCase();
};

export const isRelatedToStudent = (item, studentId) => {
    const relatedStudentId = getValue(item, ["studentId", "StudentId"], "");

    return isSameId(relatedStudentId, studentId);
};

export const isRelatedToTeacher = (item, teacherId) => {
    const relatedTeacherId = getValue(
        item,
        ["teacherId", "TeacherId", "advisorTeacherId", "AdvisorTeacherId"],
        ""
    );

    return isSameId(relatedTeacherId, teacherId);
};

export const formatDate = (value) => {
    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString("tr-TR");
};