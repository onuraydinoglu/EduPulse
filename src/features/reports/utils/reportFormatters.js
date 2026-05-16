export const getStudentReportStatus = (average = 0) => {
    if (average >= 90) return "Çok Başarılı";
    if (average >= 75) return "Başarılı";
    if (average >= 60) return "Takip Edilmeli";

    return "Riskli";
};

export const filterClassReportsByGrade = (reports = [], gradeFilter = "all") => {
    if (gradeFilter === "all") return reports;

    return reports.filter((item) => item.grade === gradeFilter);
};

export const buildTeacherStudentReports = ({
    students = [],
    classes = [],
    teachers = [],
    clubs = [],
    teacherClass,
}) => {
    return students
        .filter((student) => student.classId === teacherClass.id)
        .map((student) => {
            const classItem = classes.find(
                (classData) => classData.id === student.classId
            );

            const teacher = teachers.find(
                (teacherData) => teacherData.id === classItem?.teacherId
            );

            const club = clubs.find((clubData) => clubData.id === student.clubId);

            return {
                ...student,
                fullName: `${student.firstName} ${student.lastName}`,
                className: classItem?.name || "-",
                classTeacher: teacher?.fullName || "-",
                club: club?.name || "-",
                status: getStudentReportStatus(student.average),
                lessonAverage: student.lessonAverage ?? student.average,
                examAverage: student.examAverage ?? student.average,
                trialExamAverage: student.trialExamAverage ?? 0,
                projectCount: student.projectCount ?? 0,
                schoolRank: student.schoolRank || "-",
                teacherNote: student.teacherNote || "Öğretmen notu bulunmuyor.",
                lessons: student.lessons || [],
                trialExams: student.trialExams || [],
            };
        });
};

export const getTeacherClassStats = (students = []) => {
    const studentCount = students.length;

    const average =
        studentCount > 0
            ? Math.round(
                students.reduce((total, student) => total + student.average, 0) /
                studentCount
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
            student.fullName.toLowerCase().includes(normalizedSearch) ||
            student.club.toLowerCase().includes(normalizedSearch) ||
            student.className.toLowerCase().includes(normalizedSearch) ||
            student.schoolNumber?.toLowerCase().includes(normalizedSearch) ||
            student.parentName?.toLowerCase().includes(normalizedSearch);

        const matchesStatus = status === "all" || student.status === status;

        return matchesSearch && matchesStatus;
    });
};