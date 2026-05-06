export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/Auth/login",
    REGISTER: "/Auth/register",
  },

  USERS: {
    BASE: "/Users",
    OFFICER: "/Users/officer",
    OFFICERS: "/Users/officers",
  },

  SCHOOLS: "/Schools",
  TEACHERS: "/Teachers",
  CLASSROOMS: "/Classrooms",
  LESSONS: "/Lessons",
  STUDENTS: "/Students",
  STUDENT_GRADES: "/StudentGrades",
  TEACHER_LESSONS: "/TeacherLessons",

  CLUBS: "/Clubs",
  CLUB_MEMBERS: "/ClubMembers",

  EVENTS: "/Events",
  EVENT_MEMBERS: "/EventMembers",

  PERSONAL_NOTES: "/PersonalNotes",

  MESSAGES: {
    BASE: "/Messages",
    USERS: "/Messages/users",
    INBOX: "/Messages/inbox",
    SENT: "/Messages/sent",
    CONVERSATION: "/Messages/conversation",
  },
};
