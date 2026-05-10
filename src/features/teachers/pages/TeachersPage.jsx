import Toast from "../../../components/ui/Toast";

import TeacherDeleteModal from "../components/TeacherDeleteModal";
import TeacherFormModal from "../components/TeacherFormModal";
import TeacherLessonAssignModal from "../components/TeacherLessonAssignModal";
import TeacherStatsCards from "../components/TeacherStatsCards";
import TeacherTable from "../components/TeacherTable";
import TeachersPageHeader from "../components/TeachersPageHeader";

import {
  TEACHER_DELETE_MODAL_ID,
  TEACHER_LESSON_ASSIGN_MODAL_ID,
  TEACHER_MODAL_ID,
} from "../constants/teacherConstants";

import { getTeacherStats } from "../constants/teacherTableColumns";
import { useTeachersPage } from "../hooks/useTeachers";

function TeachersPage() {
  const {
    teachers,
    filteredTeachers,
    lessons,
    classrooms,
    formData,
    setFormData,
    assignFormData,
    setAssignFormData,
    errors,
    assignErrors,
    isEditing,
    selectedTeacher,
    temporaryPasswords,
    toast,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseTeacherModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
    handleSubmit,
    handleOpenAssignLessonModal,
    handleCloseAssignLessonModal,
    handleAssignLessonSubmit,
    handleExportTeachersPdf,
  } = useTeachersPage();

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} />

      <TeachersPageHeader
        onCreate={() => handleOpenCreateModal(TEACHER_MODAL_ID)}
        onExport={handleExportTeachersPdf}
      />

      <TeacherStatsCards
        items={getTeacherStats(teachers, temporaryPasswords)}
      />

      <TeacherTable
        teachers={filteredTeachers}
        temporaryPasswords={temporaryPasswords}
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onEdit={(teacher) => handleOpenEditModal(teacher, TEACHER_MODAL_ID)}
        onDelete={(id) =>
          handleOpenDeleteModal(id, TEACHER_DELETE_MODAL_ID)
        }
        onAssignLesson={(teacher) =>
          handleOpenAssignLessonModal(
            teacher,
            TEACHER_LESSON_ASSIGN_MODAL_ID
          )
        }
      />

      <TeacherFormModal
        modalId={TEACHER_MODAL_ID}
        isEditing={isEditing}
        formData={formData}
        setFormData={setFormData}
        lessons={lessons}
        errors={errors}
        onClose={() => handleCloseTeacherModal(TEACHER_MODAL_ID)}
        onSubmit={() => handleSubmit(TEACHER_MODAL_ID)}
      />

      <TeacherLessonAssignModal
        modalId={TEACHER_LESSON_ASSIGN_MODAL_ID}
        teacher={selectedTeacher}
        formData={assignFormData}
        setFormData={setAssignFormData}
        lessons={lessons}
        classrooms={classrooms}
        errors={assignErrors}
        onClose={() =>
          handleCloseAssignLessonModal(TEACHER_LESSON_ASSIGN_MODAL_ID)
        }
        onSubmit={() =>
          handleAssignLessonSubmit(TEACHER_LESSON_ASSIGN_MODAL_ID)
        }
      />

      <TeacherDeleteModal
        modalId={TEACHER_DELETE_MODAL_ID}
        onClose={() => handleCloseDeleteModal(TEACHER_DELETE_MODAL_ID)}
        onConfirm={() => handleDelete(TEACHER_DELETE_MODAL_ID)}
      />
    </div>
  );
}

export default TeachersPage;