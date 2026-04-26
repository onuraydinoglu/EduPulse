import {
  schools,
  principals,
  classes,
  teachers,
  students,
  clubs,
  exams,
  trialExamResults,
} from "../data/mockData";

const findById = (items, id) => items.find((item) => item.id === id);

export const mockApi = {
  getSchools() {
    return schools.map((school) => {
      const principal = findById(principals, school.principalId);
      const schoolStudents = students.filter(
        (student) => student.schoolId === school.id,
      );

      return {
        ...school,
        principal: principal?.fullName || "-",
        studentCount: schoolStudents.length,
      };
    });
  },

  getTeachers() {
    return teachers.map((teacher) => {
      const school = findById(schools, teacher.schoolId);
      const teacherClasses = classes.filter(
        (item) => item.teacherId === teacher.id,
      );

      return {
        ...teacher,
        school: school?.name || "-",
        classCount: teacherClasses.length,
        className: teacherClasses.map((item) => item.name).join(", ") || "-",
      };
    });
  },

  getStudents() {
    return students.map((student) => {
      const school = findById(schools, student.schoolId);
      const classItem = findById(classes, student.classId);
      const club = findById(clubs, student.clubId);

      return {
        ...student,
        fullName: `${student.firstName} ${student.lastName}`,
        school: school?.name || "-",
        className: classItem?.name || "-",
        club: club?.name || "-",
      };
    });
  },

  getClasses() {
    return classes.map((classItem) => {
      const school = findById(schools, classItem.schoolId);
      const teacher = findById(teachers, classItem.teacherId);
      const classStudents = students.filter(
        (student) => student.classId === classItem.id,
      );

      const average =
        classStudents.length > 0
          ? Math.round(
              classStudents.reduce(
                (total, student) => total + student.average,
                0,
              ) / classStudents.length,
            )
          : 0;

      return {
        ...classItem,
        className: classItem.name,
        school: school?.name || "-",
        teacher: teacher?.fullName || "-",
        studentCount: classStudents.length,
        average,
      };
    });
  },

  getClubs() {
    return clubs.map((club) => {
      const teacher = findById(teachers, club.teacherId);
      const clubStudents = students.filter(
        (student) => student.clubId === club.id,
      );

      return {
        ...club,
        teacher: teacher?.fullName || "-",
        studentCount: clubStudents.length,
      };
    });
  },

  getExams() {
    return exams.map((exam) => {
      const classItem = findById(classes, exam.classId);

      return {
        ...exam,
        className: classItem?.name || "-",
      };
    });
  },

  getTrialExamResults() {
    return trialExamResults.map((result) => {
      const student = findById(students, result.studentId);
      const exam = findById(exams, result.examId);
      const classItem = student ? findById(classes, student.classId) : null;

      return {
        ...result,
        studentName: student ? `${student.firstName} ${student.lastName}` : "-",
        className: classItem?.name || "-",
        examName: exam?.name || "-",
      };
    });
  },

  getDashboardStats() {
    const activeSchools = schools.filter(
      (school) => school.status === "Aktif",
    ).length;
    const activeTeachers = teachers.filter(
      (teacher) => teacher.status === "Aktif",
    ).length;
    const activeStudents = students.filter(
      (student) => student.status === "Aktif",
    ).length;

    const generalAverage =
      students.length > 0
        ? Math.round(
            students.reduce((total, student) => total + student.average, 0) /
              students.length,
          )
        : 0;

    return {
      schoolCount: schools.length,
      activeSchools,
      teacherCount: teachers.length,
      activeTeachers,
      studentCount: students.length,
      activeStudents,
      classCount: classes.length,
      clubCount: clubs.length,
      examCount: exams.length,
      generalAverage,
    };
  },
};
