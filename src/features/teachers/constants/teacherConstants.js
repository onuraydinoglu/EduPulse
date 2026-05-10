export const TEACHER_MODAL_ID = "teacher_modal";
export const TEACHER_DELETE_MODAL_ID = "teacher_delete_modal";
export const TEACHER_LESSON_ASSIGN_MODAL_ID = "teacher_lesson_assign_modal";

export const emptyTeacherForm = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  branchLessonId: "",
  department: "",
  isActive: true,
};

export const emptyTeacherLessonAssignForm = {
  lessonId: "",
  classroomIds: [],
};