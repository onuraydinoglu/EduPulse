import Toast from "../../../components/ui/Toast";

import TeacherLessonDeleteModal from "../components/TeacherLessonDeleteModal";
import TeacherLessonFormModal from "../components/TeacherLessonFormModal";
import TeacherLessonsPageHeader from "../components/TeacherLessonsPageHeader";
import TeacherLessonStatsCards from "../components/TeacherLessonStatsCards";
import TeacherLessonTable from "../components/TeacherLessonTable";

import {
  TEACHER_LESSON_DELETE_MODAL_ID,
  TEACHER_LESSON_MODAL_ID,
} from "../constants/teacherLessonConstants";

import { getTeacherLessonStats } from "../constants/teacherLessonTableColumns";
import { useTeacherLessonsPage } from "../hooks/useTeacherLessonsPage";

function TeacherLessonsPage() {
  const {
    teacherLessons = [],
    filteredTeacherLessons = [],
    teachers = [],
    lessons = [],
    classrooms = [],
    formData,
    setFormData,
    errors,
    isEditing,
    toast,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseTeacherLessonModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
    handleSubmit,
    handleExportTeacherLessonsPdf,
  } = useTeacherLessonsPage();

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} />

      <TeacherLessonsPageHeader
        onCreate={() => handleOpenCreateModal(TEACHER_LESSON_MODAL_ID)}
        onExport={handleExportTeacherLessonsPdf}
      />

      <TeacherLessonStatsCards items={getTeacherLessonStats(teacherLessons)} />

      <TeacherLessonTable
        teacherLessons={filteredTeacherLessons}
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onEdit={(teacherLesson) =>
          handleOpenEditModal(teacherLesson, TEACHER_LESSON_MODAL_ID)
        }
        onDelete={(id) =>
          handleOpenDeleteModal(id, TEACHER_LESSON_DELETE_MODAL_ID)
        }
      />

      <TeacherLessonFormModal
        modalId={TEACHER_LESSON_MODAL_ID}
        isEditing={isEditing}
        formData={formData}
        setFormData={setFormData}
        teachers={teachers}
        lessons={lessons}
        classrooms={classrooms}
        errors={errors}
        onClose={() => handleCloseTeacherLessonModal(TEACHER_LESSON_MODAL_ID)}
        onSubmit={() => handleSubmit(TEACHER_LESSON_MODAL_ID)}
      />

      <TeacherLessonDeleteModal
        modalId={TEACHER_LESSON_DELETE_MODAL_ID}
        onClose={() => handleCloseDeleteModal(TEACHER_LESSON_DELETE_MODAL_ID)}
        onConfirm={() => handleDelete(TEACHER_LESSON_DELETE_MODAL_ID)}
      />
    </div>
  );
}

export default TeacherLessonsPage;