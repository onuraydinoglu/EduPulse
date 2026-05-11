export const getId = (item) => item?.id || item?.Id || "";

export const getClubName = (club) => club?.name || club?.Name || "Kulüp";

export const getClubIsActive = (club) =>
    club?.isActive ?? club?.IsActive ?? true;

export const getAdvisorName = (club) =>
    club?.advisorTeacherFullName ||
    club?.AdvisorTeacherFullName ||
    club?.teacherFullName ||
    club?.TeacherFullName ||
    "-";

export const getMemberId = (member) => getId(member);

export const getMemberStudentId = (member) =>
    member?.studentId || member?.StudentId || "";

export const getStudentId = (student) =>
    student?.studentId || student?.StudentId || getId(student);

export const getStudentFullName = (item) => {
    const directName =
        item?.studentFullName ||
        item?.StudentFullName ||
        item?.fullName ||
        item?.FullName;

    if (directName) return directName;

    const firstName = item?.firstName || item?.FirstName || "";
    const lastName = item?.lastName || item?.LastName || "";

    return `${firstName} ${lastName}`.trim() || "Öğrenci";
};

export const getStudentNumber = (item) =>
    item?.studentNumber || item?.StudentNumber || "-";

export const getClassroomName = (item) =>
    item?.classroomName ||
    item?.ClassroomName ||
    item?.className ||
    item?.ClassName ||
    "-";

export const getStudentSelectOptions = (students = []) => {
    return students.map((student) => {
        const studentId = getStudentId(student);

        return {
            label: `${getStudentFullName(student)} - ${getStudentNumber(student)}`,
            value: studentId,
        };
    });
};

export const filterClubMembers = (members = [], search = "") => {
    const normalizedSearch = search.toLowerCase().trim();

    if (!normalizedSearch) return members;

    return members.filter((member) => {
        const fullName = getStudentFullName(member).toLowerCase();
        const number = String(getStudentNumber(member)).toLowerCase();
        const classroom = getClassroomName(member).toLowerCase();

        return (
            fullName.includes(normalizedSearch) ||
            number.includes(normalizedSearch) ||
            classroom.includes(normalizedSearch)
        );
    });
};

export const getSelectableStudents = (students = [], members = []) => {
    const memberStudentIds = members
        .map((member) => getMemberStudentId(member))
        .filter(Boolean);

    return students.filter((student) => {
        const studentId = getStudentId(student);
        const isActive = student?.isActive ?? student?.IsActive ?? true;

        return isActive && !memberStudentIds.includes(studentId);
    });
};

export const getData = (response) => {
    return response?.data?.data ?? response?.data?.Data ?? response?.data ?? response;
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