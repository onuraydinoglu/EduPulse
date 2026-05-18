const getValue = (item, camelKey, pascalKey, fallback = "") => {
    return item?.[camelKey] ?? item?.[pascalKey] ?? fallback;
};

export const getTeacherReportErrorMessage = (error, fallbackMessage) => {
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

const getTokenFromCurrentUser = (currentUser) => {
    return (
        currentUser?.token ||
        currentUser?.Token ||
        currentUser?.accessToken ||
        currentUser?.AccessToken ||
        currentUser?.jwtToken ||
        currentUser?.JwtToken ||
        currentUser?.user?.token ||
        currentUser?.user?.Token ||
        currentUser?.data?.token ||
        currentUser?.data?.Token ||
        currentUser?.Data?.Token ||
        ""
    );
};

const parseJwtPayload = (token) => {
    try {
        if (!token || !token.includes(".")) return null;

        const base64Payload = token.split(".")[1];
        const normalizedPayload = base64Payload
            .replace(/-/g, "+")
            .replace(/_/g, "/");

        const jsonPayload = decodeURIComponent(
            atob(normalizedPayload)
                .split("")
                .map((char) => {
                    return `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`;
                })
                .join("")
        );

        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
};

const getCurrentUserId = (currentUser) => {
    const directId =
        getValue(currentUser, "id", "Id") ||
        getValue(currentUser, "userId", "UserId") ||
        getValue(currentUser?.user, "id", "Id") ||
        getValue(currentUser?.user, "userId", "UserId") ||
        getValue(currentUser?.data, "id", "Id") ||
        getValue(currentUser?.data, "userId", "UserId") ||
        getValue(currentUser?.Data, "id", "Id") ||
        getValue(currentUser?.Data, "userId", "UserId");

    if (directId) return directId;

    const token = getTokenFromCurrentUser(currentUser);
    const payload = parseJwtPayload(token);

    return (
        payload?.nameid ||
        payload?.sub ||
        payload?.userId ||
        payload?.UserId ||
        payload?.id ||
        payload?.Id ||
        payload?.[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ] ||
        ""
    );
};

const getId = (item) => {
    return getValue(item, "id", "Id");
};

const getFullName = (item) => {
    if (!item) return "-";

    const fullName =
        getValue(item, "fullName", "FullName") ||
        getValue(item, "studentFullName", "StudentFullName") ||
        getValue(item, "teacherFullName", "TeacherFullName");

    if (fullName) return fullName;

    const firstName =
        getValue(item, "firstName", "FirstName") ||
        getValue(item, "studentFirstName", "StudentFirstName") ||
        getValue(item, "teacherFirstName", "TeacherFirstName");

    const lastName =
        getValue(item, "lastName", "LastName") ||
        getValue(item, "studentLastName", "StudentLastName") ||
        getValue(item, "teacherLastName", "TeacherLastName");

    return `${firstName} ${lastName}`.trim() || "-";
};

const getTeacherId = (teacher) => {
    return getValue(teacher, "id", "Id");
};

const getTeacherUserId = (teacher) => {
    return getValue(teacher, "userId", "UserId");
};

const getClassId = (classItem) => {
    return getValue(classItem, "id", "Id");
};

const getClassTeacherId = (classItem) => {
    return getValue(classItem, "teacherId", "TeacherId");
};

const getClassGrade = (classItem) => {
    return String(getValue(classItem, "grade", "Grade") || "");
};

const getClassSection = (classItem) => {
    return String(getValue(classItem, "section", "Section") || "");
};

const getClassName = (classItem) => {
    const directName =
        getValue(classItem, "className", "ClassName") ||
        getValue(classItem, "name", "Name");

    if (directName) return directName;

    const grade = getClassGrade(classItem);
    const section = getClassSection(classItem);

    if (grade && section) return `${grade}-${section}`;

    return "-";
};

const getStudentId = (student) => {
    return getValue(student, "id", "Id");
};

const getStudentClassroomId = (student) => {
    return (
        getValue(student, "classroomId", "ClassroomId") ||
        getValue(student, "classId", "ClassId")
    );
};

const getStudentNumber = (student) => {
    return (
        getValue(student, "studentNumber", "StudentNumber") ||
        getValue(student, "schoolNumber", "SchoolNumber") ||
        "-"
    );
};

const getParentName = (student) => {
    const parentName = getValue(student, "parentName", "ParentName");

    if (parentName) return parentName;

    const motherFullName = getValue(student, "motherFullName", "MotherFullName");
    const fatherFullName = getValue(student, "fatherFullName", "FatherFullName");

    return [motherFullName, fatherFullName].filter(Boolean).join(" / ") || "-";
};

const getStudentGradeStudentId = (studentGrade) => {
    return getValue(studentGrade, "studentId", "StudentId");
};

const getStudentGradeLessonName = (studentGrade) => {
    return (
        getValue(studentGrade, "lessonName", "LessonName") ||
        getValue(studentGrade, "lesson", "Lesson") ||
        "-"
    );
};

const getGradeAverage = (studentGrade) => {
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

const getStudentAverage = (student, studentGrades = []) => {
    const directAverage =
        getValue(student, "average", "Average", null) ||
        getValue(student, "lessonAverage", "LessonAverage", null);

    if (directAverage !== null && directAverage !== undefined) {
        return Number(directAverage) || 0;
    }

    const studentId = getStudentId(student);

    const averages = studentGrades
        .filter((studentGrade) => getStudentGradeStudentId(studentGrade) === studentId)
        .map(getGradeAverage)
        .filter((average) => average > 0);

    if (!averages.length) return 0;

    const total = averages.reduce((sum, value) => sum + value, 0);

    return Math.round(total / averages.length);
};

const getStudentLessons = (student, studentGrades = []) => {
    const directLessons = getValue(student, "lessons", "Lessons", null);

    if (Array.isArray(directLessons)) return directLessons;

    const studentId = getStudentId(student);

    return studentGrades
        .filter((studentGrade) => getStudentGradeStudentId(studentGrade) === studentId)
        .map((studentGrade) => ({
            id: getId(studentGrade),
            name: getStudentGradeLessonName(studentGrade),
            average: getGradeAverage(studentGrade),
            examGrades: [
                getValue(studentGrade, "exam1", "Exam1", "-"),
                getValue(studentGrade, "exam2", "Exam2", "-"),
            ],
            projectGrade: getValue(studentGrade, "project", "Project", "-"),
            activityGrades: [
                getValue(studentGrade, "activity1", "Activity1", "-"),
                getValue(studentGrade, "activity2", "Activity2", "-"),
                getValue(studentGrade, "activity3", "Activity3", "-"),
            ],
        }));
};

const getStudentTrialExams = (student, trialExams = []) => {
    const directTrialExams = getValue(student, "trialExams", "TrialExams", null);

    if (Array.isArray(directTrialExams)) return directTrialExams;

    const studentId = getStudentId(student);

    return trialExams
        .filter((trialExam) => {
            const trialExamStudentId = getValue(trialExam, "studentId", "StudentId");

            return trialExamStudentId === studentId;
        })
        .map((trialExam) => ({
            id: getId(trialExam),
            name:
                getValue(trialExam, "name", "Name") ||
                getValue(trialExam, "examName", "ExamName") ||
                "Deneme Sınavı",
            net:
                getValue(trialExam, "net", "Net", null) ??
                getValue(trialExam, "totalNet", "TotalNet", null) ??
                getValue(trialExam, "score", "Score", "-"),
        }));
};

const getStudentClubName = ({ student, clubs = [], clubMembers = [] }) => {
    const directClubName =
        getValue(student, "club", "Club") ||
        getValue(student, "clubName", "ClubName");

    if (directClubName) return directClubName;

    const studentId = getStudentId(student);

    const member = clubMembers.find((clubMember) => {
        const memberStudentId = getValue(clubMember, "studentId", "StudentId");
        const isActive = getValue(clubMember, "isActive", "IsActive", true);

        return memberStudentId === studentId && isActive !== false;
    });

    const clubId =
        getValue(student, "clubId", "ClubId") ||
        getValue(member, "clubId", "ClubId");

    const club = clubs.find((clubItem) => getId(clubItem) === clubId);

    return (
        getValue(club, "name", "Name") ||
        getValue(club, "clubName", "ClubName") ||
        "-"
    );
};

export const getStudentReportStatus = (average = 0) => {
    if (average >= 90) return "Çok Başarılı";
    if (average >= 75) return "Başarılı";
    if (average >= 60) return "Takip Edilmeli";

    return "Riskli";
};

export const buildTeacherClass = ({
    teachers = [],
    classes = [],
    currentUser = null,
}) => {
    const currentUserId = getCurrentUserId(currentUser);

    const currentTeacher =
        teachers.find((teacher) => {
            const teacherId = getTeacherId(teacher);
            const teacherUserId = getTeacherUserId(teacher);

            return teacherId === currentUserId || teacherUserId === currentUserId;
        }) || null;

    const currentTeacherId = getTeacherId(currentTeacher);
    const currentTeacherUserId = getTeacherUserId(currentTeacher);

    const classItem =
        classes.find((classroom) => {
            const classTeacherId = getClassTeacherId(classroom);

            return (
                classTeacherId === currentTeacherId ||
                classTeacherId === currentTeacherUserId
            );
        }) || null;

    return {
        id: getClassId(classItem),
        className: getClassName(classItem),
    };
};

export const buildTeacherStudentReports = ({
    students = [],
    classes = [],
    clubs = [],
    clubMembers = [],
    studentGrades = [],
    trialExams = [],
    teacherClass,
}) => {
    const teacherClassId = teacherClass?.id;

    if (!teacherClassId) return [];

    return students
        .filter((student) => getStudentClassroomId(student) === teacherClassId)
        .map((student) => {
            const classItem = classes.find(
                (classData) => getClassId(classData) === getStudentClassroomId(student)
            );

            const average = getStudentAverage(student, studentGrades);
            const lessons = getStudentLessons(student, studentGrades);
            const studentTrialExams = getStudentTrialExams(student, trialExams);

            const trialExamAverage =
                studentTrialExams.length > 0
                    ? Math.round(
                        studentTrialExams.reduce((total, trialExam) => {
                            const net = Number(trialExam.net);

                            return total + (Number.isNaN(net) ? 0 : net);
                        }, 0) / studentTrialExams.length
                    )
                    : 0;

            return {
                ...student,
                id: getStudentId(student),
                fullName: getFullName(student),
                schoolNumber: getStudentNumber(student),
                parentName: getParentName(student),
                className: getClassName(classItem),
                club: getStudentClubName({
                    student,
                    clubs,
                    clubMembers,
                }),
                average,
                status: getStudentReportStatus(average),
                lessonAverage: average,
                examAverage: average,
                trialExamAverage,
                projectCount: lessons.filter((lesson) => lesson.projectGrade !== "-").length,
                schoolRank:
                    getValue(student, "schoolRank", "SchoolRank") ||
                    getValue(student, "rank", "Rank") ||
                    "-",
                teacherNote:
                    getValue(student, "teacherNote", "TeacherNote") ||
                    "Öğretmen notu bulunmuyor.",
                lessons,
                trialExams: studentTrialExams,
            };
        });
};

export const getTeacherClassStats = (students = []) => {
    const studentCount = students.length;

    const average =
        studentCount > 0
            ? Math.round(
                students.reduce(
                    (total, student) => total + Number(student.average || 0),
                    0
                ) / studentCount
            )
            : 0;

    const successCount = students.filter(
        (student) =>
            student.status === "Çok Başarılı" || student.status === "Başarılı"
    ).length;

    const successRate =
        studentCount > 0 ? Math.round((successCount / studentCount) * 100) : 0;

    return {
        studentCount,
        average,
        successRate,
    };
};

export const filterTeacherStudents = ({
    students = [],
    search = "",
    status = "all",
}) => {
    const normalizedSearch = search.toLowerCase().trim();

    return students.filter((student) => {
        const matchesSearch =
            student.fullName?.toLowerCase().includes(normalizedSearch) ||
            student.club?.toLowerCase().includes(normalizedSearch) ||
            student.className?.toLowerCase().includes(normalizedSearch) ||
            String(student.schoolNumber || "")
                .toLowerCase()
                .includes(normalizedSearch) ||
            student.parentName?.toLowerCase().includes(normalizedSearch);

        const matchesStatus = status === "all" || student.status === status;

        return matchesSearch && matchesStatus;
    });
};