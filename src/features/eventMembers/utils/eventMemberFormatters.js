export const getData = (response) => {
    return response.data?.data ?? response.data?.Data ?? response.data;
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

/* EVENT FORMATTERS */

export const getEventId = (event) => {
    return event?.id || event?.Id || "";
};

export const getEventName = (event) => {
    return event?.name || event?.Name || event?.title || event?.Title || "-";
};

export const getEventLocation = (event) => {
    return event?.location || event?.Location || "-";
};

export const getEventDateText = (event) => {
    const value = event?.eventDate || event?.EventDate || event?.date || event?.Date;

    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleDateString("tr-TR");
};

export const getEventTimeText = (event) => {
    const startTime =
        event?.startTime || event?.StartTime || event?.eventTime || event?.EventTime || "";

    const endTime = event?.endTime || event?.EndTime || "";

    if (startTime && endTime) {
        return `${startTime} - ${endTime}`;
    }

    return startTime || "-";
};

export const getEventIsPaid = (event) => {
    return event?.isPaid ?? event?.IsPaid ?? false;
};

export const getEventPaymentTypeText = (event) => {
    return getEventIsPaid(event) ? "Ücretli" : "Ücretsiz";
};

export const getEventPriceText = (event) => {
    const isPaid = getEventIsPaid(event);

    const price =
        event?.pricePerStudent ??
        event?.PricePerStudent ??
        event?.price ??
        event?.Price ??
        0;

    return isPaid ? `${price} ₺` : "Ücretsiz";
};

export const getEventIsActive = (event) => {
    return event?.isActive ?? event?.IsActive ?? true;
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

export const getEventResponsibleTeacherObjects = (event) => {
    const teachers =
        event?.responsibleTeachers ||
        event?.ResponsibleTeachers ||
        event?.eventResponsibleTeachers ||
        event?.EventResponsibleTeachers ||
        [];

    if (!Array.isArray(teachers)) return [];

    return teachers;
};

export const getEventResponsibleTeacherNames = (event) => {
    const teacherObjects = getEventResponsibleTeacherObjects(event);

    const namesFromObjects = teacherObjects
        .map((teacher) => getTeacherFullName(teacher))
        .filter(Boolean);

    if (namesFromObjects.length > 0) {
        return namesFromObjects;
    }

    const directNames =
        event?.responsibleTeacherNames ||
        event?.ResponsibleTeacherNames ||
        event?.teacherNames ||
        event?.TeacherNames;

    if (Array.isArray(directNames)) {
        return directNames.filter(Boolean);
    }

    const singleName =
        event?.responsibleTeacherName ||
        event?.ResponsibleTeacherName ||
        event?.responsibleTeacherFullName ||
        event?.ResponsibleTeacherFullName ||
        event?.advisorTeacherName ||
        event?.AdvisorTeacherName ||
        event?.teacherFullName ||
        event?.TeacherFullName ||
        event?.teacherName ||
        event?.TeacherName;

    return singleName ? [singleName] : [];
};

export const getEventResponsibleTeacherName = (event) => {
    const names = getEventResponsibleTeacherNames(event);

    if (names.length === 0) return "-";

    return names.join(", ");
};

export const getEventResponsibleTeacherCount = (event) => {
    return getEventResponsibleTeacherNames(event).length;
};

export const getEventInfoText = (event) => {
    return `Yer: ${getEventLocation(event)} • Tarih: ${getEventDateText(
        event
    )} • Saat: ${getEventTimeText(event)} • Ücret: ${getEventPriceText(
        event
    )} • Sorumlu Hocalar: ${getEventResponsibleTeacherName(event)}`;
};

/* EVENT MEMBER FORMATTERS */

export const getEventMemberId = (member) => {
    return member?.id || member?.Id || "";
};

export const getEventMemberStudentId = (member) => {
    return member?.studentId || member?.StudentId || "";
};

export const getEventMemberStudentFullName = (member) => {
    return (
        member?.studentFullName ||
        member?.StudentFullName ||
        member?.studentName ||
        member?.StudentName ||
        member?.fullName ||
        member?.FullName ||
        "-"
    );
};

export const getEventMemberStudentNumber = (member) => {
    return (
        member?.studentNumber ||
        member?.StudentNumber ||
        member?.number ||
        member?.Number ||
        "-"
    );
};

export const getEventMemberClassroomName = (member) => {
    return (
        member?.classroomName ||
        member?.ClassroomName ||
        member?.className ||
        member?.ClassName ||
        "-"
    );
};

export const getEventMemberIsPaid = (member) => {
    return member?.isPaid ?? member?.IsPaid ?? false;
};

export const getEventMemberPaidAmount = (member) => {
    return member?.paidAmount ?? member?.PaidAmount ?? 0;
};

export const getEventMemberPaymentStatusText = (member) => {
    return getEventMemberIsPaid(member) ? "Ödendi" : "Ödenmedi";
};

/* STUDENT FORMATTERS */

export const getStudentId = (student) => {
    return student?.id || student?.Id || "";
};

export const getStudentFullName = (student) => {
    const firstName = student?.firstName || student?.FirstName || "";
    const lastName = student?.lastName || student?.LastName || "";

    return (
        student?.fullName ||
        student?.FullName ||
        `${firstName} ${lastName}`.trim() ||
        "-"
    );
};

export const getStudentNumber = (student) => {
    return student?.studentNumber || student?.StudentNumber || "";
};

export const getStudentClassroomName = (student) => {
    return (
        student?.classroomName ||
        student?.ClassroomName ||
        student?.className ||
        student?.ClassName ||
        "-"
    );
};

/* LIST HELPERS */

export const getSelectableStudents = (students = [], members = []) => {
    const memberStudentIds = members
        .map((member) => getEventMemberStudentId(member))
        .filter(Boolean)
        .map(String);

    return students.filter((student) => {
        const studentId = getStudentId(student);

        return studentId && !memberStudentIds.includes(String(studentId));
    });
};

export const filterEventMembers = (members = [], search = "") => {
    const normalizedSearch = search.toLowerCase().trim();

    if (!normalizedSearch) return members;

    return members.filter((member) => {
        const fullName = getEventMemberStudentFullName(member).toLowerCase();
        const number = String(getEventMemberStudentNumber(member)).toLowerCase();
        const classroomName = getEventMemberClassroomName(member).toLowerCase();
        const paymentStatus = getEventMemberPaymentStatusText(member).toLowerCase();

        return (
            fullName.includes(normalizedSearch) ||
            number.includes(normalizedSearch) ||
            classroomName.includes(normalizedSearch) ||
            paymentStatus.includes(normalizedSearch)
        );
    });
};