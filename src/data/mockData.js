export const schools = [
  {
    id: 1,
    name: "Atatürk Anadolu Lisesi",
    city: "Samsun",
    principalId: 1,
    status: "Aktif",
  },
  {
    id: 2,
    name: "Cumhuriyet Fen Lisesi",
    city: "Ankara",
    principalId: 2,
    status: "Aktif",
  },
  {
    id: 3,
    name: "19 Mayıs Lisesi",
    city: "İstanbul",
    principalId: 3,
    status: "Pasif",
  },
];

export const principals = [
  { id: 1, fullName: "Ahmet Yılmaz", schoolId: 1 },
  { id: 2, fullName: "Zeynep Kaya", schoolId: 2 },
  { id: 3, fullName: "Mehmet Demir", schoolId: 3 },
];

export const classes = [
  { id: 1, name: "9-A", grade: "9", schoolId: 1, teacherId: 1 },
  { id: 2, name: "10-B", grade: "10", schoolId: 1, teacherId: 2 },
  { id: 3, name: "11-C", grade: "11", schoolId: 2, teacherId: 3 },
  { id: 4, name: "12-A", grade: "12", schoolId: 2, teacherId: 4 },
  { id: 5, name: "12-C", grade: "12", schoolId: 3, teacherId: 5 },
];

export const teachers = [
  {
    id: 1,
    fullName: "Ayşe Demir",
    branch: "Matematik",
    schoolId: 1,
    status: "Aktif",
  },
  {
    id: 2,
    fullName: "Murat Çelik",
    branch: "Türk Dili ve Edebiyatı",
    schoolId: 1,
    status: "Aktif",
  },
  {
    id: 3,
    fullName: "Elif Şahin",
    branch: "Fizik",
    schoolId: 2,
    status: "Aktif",
  },
  {
    id: 4,
    fullName: "Mehmet Yıldız",
    branch: "Kimya",
    schoolId: 2,
    status: "Aktif",
  },
  {
    id: 5,
    fullName: "Canan Arslan",
    branch: "Biyoloji",
    schoolId: 3,
    status: "Pasif",
  },
];

export const students = [
  {
    id: 1,
    firstName: "Ali",
    lastName: "Yıldız",
    schoolId: 1,
    classId: 1,
    average: 84,
    clubId: 1,
    status: "Aktif",

    schoolNumber: "1001",
    studentPhone: "05001234567",
    parentName: "Ahmet Yıldız",
    parentPhone: "05551234567",

    // 🔥 EKLENEN RAPOR ALANLARI
    lessonAverage: 84,
    examAverage: 78,
    trialExamAverage: 74.5,
    projectCount: 3,
    schoolRank: "24 / 320",
    teacherNote:
      "Genel performansı iyi. Deneme sınavlarında düzenli artış var.",

    lessons: [
      {
        name: "Matematik",
        examGrades: [84, 88],
        projectGrade: 90,
        activityGrade: 86,
        average: 88,
      },
      {
        name: "Türkçe",
        examGrades: [80, 84],
        projectGrade: 85,
        activityGrade: 82,
        average: 82,
      },
    ],

    trialExams: [
      {
        name: "1. Deneme Sınavı",
        correct: 72,
        wrong: 18,
        empty: 10,
        net: 67.5,
        classRank: "6 / 32",
        schoolRank: "42 / 320",
      },
    ],
  },

  {
    id: 2,
    firstName: "Ayşe",
    lastName: "Kaya",
    schoolId: 1,
    classId: 1,
    average: 91,
    clubId: 2,
    status: "Aktif",

    schoolNumber: "1002",
    studentPhone: "05002345678",
    parentName: "Fatma Kaya",
    parentPhone: "05552345678",

    lessonAverage: 91,
    examAverage: 88,
    trialExamAverage: 86,
    projectCount: 2,
    schoolRank: "10 / 320",
    teacherNote: "Başarılı ve düzenli.",

    lessons: [],
    trialExams: [],
  },

  {
    id: 3,
    firstName: "Mehmet",
    lastName: "Can",
    schoolId: 1,
    classId: 2,
    average: 76,
    clubId: 3,
    status: "Aktif",

    schoolNumber: "1003",
    studentPhone: "05003456789",
    parentName: "Hasan Can",
    parentPhone: "05553456789",

    lessonAverage: 76,
    examAverage: 72,
    trialExamAverage: 70,
    projectCount: 1,
    schoolRank: "120 / 320",
    teacherNote: "Orta seviyede.",

    lessons: [],
    trialExams: [],
  },

  {
    id: 4,
    firstName: "Zeynep",
    lastName: "Kara",
    schoolId: 2,
    classId: 3,
    average: 88,
    clubId: 1,
    status: "Aktif",

    schoolNumber: "2001",
    studentPhone: "05004567890",
    parentName: "Ayşe Kara",
    parentPhone: "05554567890",

    lessonAverage: 88,
    examAverage: 85,
    trialExamAverage: 83,
    projectCount: 2,
    schoolRank: "30 / 320",
    teacherNote: "Başarılı öğrenci.",

    lessons: [],
    trialExams: [],
  },

  {
    id: 5,
    firstName: "Ece",
    lastName: "Arslan",
    schoolId: 2,
    classId: 4,
    average: 94,
    clubId: 2,
    status: "Aktif",

    schoolNumber: "2002",
    studentPhone: "05005678901",
    parentName: "Mehmet Arslan",
    parentPhone: "05555678901",

    lessonAverage: 94,
    examAverage: 92,
    trialExamAverage: 90,
    projectCount: 4,
    schoolRank: "5 / 320",
    teacherNote: "Çok başarılı.",

    lessons: [],
    trialExams: [],
  },

  {
    id: 6,
    firstName: "Kerem",
    lastName: "Aksoy",
    schoolId: 3,
    classId: 5,
    average: 69,
    clubId: 3,
    status: "Pasif",

    schoolNumber: "3001",
    studentPhone: "05006789012",
    parentName: "Ali Aksoy",
    parentPhone: "05556789012",

    lessonAverage: 69,
    examAverage: 65,
    trialExamAverage: 60,
    projectCount: 0,
    schoolRank: "200 / 320",
    teacherNote: "Takip edilmeli.",

    lessons: [],
    trialExams: [],
  },
];

export const clubs = [
  { id: 1, name: "Robotik Kulübü", teacherId: 1, status: "Aktif" },
  { id: 2, name: "Müzik Kulübü", teacherId: 2, status: "Aktif" },
  { id: 3, name: "Tiyatro Kulübü", teacherId: 3, status: "Aktif" },
];

export const exams = [
  {
    id: 1,
    name: "TYT Deneme Sınavı",
    classId: 5,
    date: "2026-04-15",
    average: 72,
  },
  {
    id: 2,
    name: "Matematik Yazılısı",
    classId: 2,
    date: "2026-04-18",
    average: 81,
  },
  {
    id: 3,
    name: "Fizik Tarama Testi",
    classId: 3,
    date: "2026-04-20",
    average: 68,
  },
];

export const trialExamResults = [
  { id: 1, examId: 1, studentId: 1, score: 78 },
  { id: 2, examId: 1, studentId: 2, score: 88 },
  { id: 3, examId: 1, studentId: 3, score: 65 },
  { id: 4, examId: 2, studentId: 1, score: 82 },
  { id: 5, examId: 2, studentId: 2, score: 92 },
  { id: 6, examId: 3, studentId: 4, score: 74 },
];

export const mockDb = {
  schools,
  principals,
  classes,
  teachers,
  students,
  clubs,
  exams,
  trialExamResults,
};
