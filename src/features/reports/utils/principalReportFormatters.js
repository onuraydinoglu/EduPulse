const getValue = (item, camelKey, pascalKey, fallback = "") => {
    return item?.[camelKey] ?? item?.[pascalKey] ?? fallback;
};

export const getReportErrorMessage = (error, fallbackMessage) => {
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
        fallbackMessage
    );
};

export const getTeacherId = (teacher) => {
    return getValue(teacher, "id", "Id");
};

export const getTeacherUserId = (teacher) => {
    return getValue(teacher, "userId", "UserId");
};

export const getTeacherFullName = (teacher) => {
    if (!teacher) return "-";

    const fullName = getValue(teacher, "fullName", "FullName");

    if (fullName) return fullName;

    const firstName = getValue(teacher, "firstName", "FirstName");
    const lastName = getValue(teacher, "lastName", "LastName");

    return `${firstName} ${lastName}`.trim() || "-";
};

export const getClassId = (classItem) => {
    return getValue(classItem, "id", "Id");
};

export const getClassGrade = (classItem) => {
    return String(getValue(classItem, "grade", "Grade"));
};

export const getClassSection = (classItem) => {
    return String(getValue(classItem, "section", "Section"));
};

export const getClassTeacherId = (classItem) => {
    return getValue(classItem, "teacherId", "TeacherId");
};

export const getClassName = (classItem) => {
    const directName =
        getValue(classItem, "className", "ClassName") ||
        getValue(classItem, "name", "Name");

    if (directName) return directName;

    const grade = getClassGrade(classItem);
    const section = getClassSection(classItem);

    if (grade && section) return `${grade}-${section}`;

    return "-";
};

export const getStudentClassroomId = (student) => {
    return getValue(student, "classroomId", "ClassroomId");
};

export const getStudentId = (student) => {
    return getValue(student, "id", "Id");
};

export const getStudentGradeStudentId = (studentGrade) => {
    return getValue(studentGrade, "studentId", "StudentId");
};

export const getGradeAverage = (studentGrade) => {
    const directAverage = getValue(studentGrade, "average", "Average", null);

    if (directAverage !== null && directAverage !== undefined) {
        return Number(directAverage) || 0;
    }

    const gradeFields = [
        getValue(studentGrade, "exam1", "Exam1", null),
        getValue(studentGrade, "exam2", "Exam2", null),
        getValue(studentGrade, "project", "Project", null),
        getValue(studentGrade, "activity1", "Activity1", null),
        getValue(studentGrade, "activity2", "Activity2", null),
        getValue(studentGrade, "activity3", "Activity3", null),
    ]
        .filter((value) => value !== null && value !== undefined && value !== "")
        .map(Number)
        .filter((value) => !Number.isNaN(value));

    if (!gradeFields.length) return 0;

    const total = gradeFields.reduce((sum, value) => sum + value, 0);

    return Math.round(total / gradeFields.length);
};

export const findClassTeacher = (classItem, teachers = []) => {
    const classTeacherId = getClassTeacherId(classItem);

    if (!classTeacherId) return null;

    return (
        teachers.find((teacher) => {
            const teacherId = getTeacherId(teacher);
            const teacherUserId = getTeacherUserId(teacher);

            return teacherId === classTeacherId || teacherUserId === classTeacherId;
        }) || null
    );
};

export const buildPrincipalSchoolInfo = ({
    teachers = [],
    students = [],
    clubs = [],
    events = [],
}) => {
    return {
        teacherCount: teachers.length,
        studentCount: students.length,
        clubCount: clubs.length,
        eventCount: events.length,
    };
};

export const buildPrincipalClassReports = ({
    classes = [],
    teachers = [],
    students = [],
    studentGrades = [],
}) => {
    return classes.map((classItem) => {
        const classId = getClassId(classItem);

        const classStudents = students.filter(
            (student) => getStudentClassroomId(student) === classId
        );

        const classStudentIds = classStudents.map(getStudentId);

        const classStudentGrades = studentGrades.filter((studentGrade) =>
            classStudentIds.includes(getStudentGradeStudentId(studentGrade))
        );

        const gradeAverages = classStudentGrades
            .map(getGradeAverage)
            .filter((average) => average > 0);

        const average =
            gradeAverages.length > 0
                ? Math.round(
                    gradeAverages.reduce((sum, value) => sum + value, 0) /
                    gradeAverages.length
                )
                : 0;

        const successCount = gradeAverages.filter((value) => value >= 50).length;

        const successRate =
            gradeAverages.length > 0
                ? Math.round((successCount / gradeAverages.length) * 100)
                : 0;

        const teacher = findClassTeacher(classItem, teachers);

        return {
            id: classId,
            className: getClassName(classItem),
            grade: getClassGrade(classItem),
            teacher: getTeacherFullName(teacher),
            studentCount: classStudents.length,
            average,
            successRate,
        };
    });
};

export const filterPrincipalClassReportsByGrade = (
    reports = [],
    gradeFilter = "all"
) => {
    if (gradeFilter === "all") return reports;

    return reports.filter((report) => String(report.grade) === gradeFilter);
};