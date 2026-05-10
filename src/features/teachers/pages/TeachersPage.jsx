import {
  AcademicCapIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

import Toast from "../../../components/ui/Toast";
import TeacherTable from "../components/TeacherTable";
import TableStatsCards from "../components/TableStatsCards";
import TeachersPageHeader from "../components/TeachersPageHeader";
import TeacherFormModal from "../components/TeacherFormModal";
import TeacherDeleteModal from "../components/TeacherDeleteModal";
import TeacherLessonAssignModal from "../components/TeacherLessonAssignModal";

import { useTeachers } from "../hooks/useTeachers";

import {
  TEACHER_DELETE_MODAL_ID,
  TEACHER_MODAL_ID,
} from "../constants/teacherConstants";

const TEACHER_LESSON_ASSIGN_MODAL_ID = "teacher_lesson_assign_modal";

function TeachersPage() {
  const {
    teachers,
    filteredTeachers,
    lessons,
    classrooms,

    formData,
    setFormData,
    errors,
    isEditing,

    temporaryPasswords,
    toast,

    search,
    setSearch,
    statusFilter,
    setStatusFilter,

    selectedTeacherForLesson,
    lessonAssignFormData,
    setLessonAssignFormData,
    lessonAssignErrors,

    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseTeacherModal,

    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,

    handleSubmit,
    handleExportTeachersPdf,

    handleOpenLessonAssignModal,
    handleCloseLessonAssignModal,
    handleLessonAssignSubmit,
  } = useTeachers();

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} />

      <TeachersPageHeader
        onCreate={() => handleOpenCreateModal(TEACHER_MODAL_ID)}
        onExport={handleExportTeachersPdf}
      />

      <TableStatsCards
        cards={[
          {
            title: "Toplam Öğretmen",
            value: teachers.length,
            description: "Sisteme kayıtlı öğretmen",
            icon: UserGroupIcon,
            color: "primary",
          },
          {
            title: "Aktif Öğretmen",
            value: teachers.filter((x) => x.isActive !== false).length,
            description: "Görevde olan öğretmen",
            icon: AcademicCapIcon,
            color: "success",
          },
          {
            title: "Toplam Branş / Departman",
            value: new Set(
              teachers
                .map((x) => x.branchLessonName || x.department)
                .filter(Boolean),
            ).size,
            description: "Benzersiz branş ve departman",
            icon: ClipboardDocumentCheckIcon,
            color: "warning",
          },
        ]}
      />

      <TeacherTable
        teachers={filteredTeachers}
        temporaryPasswords={temporaryPasswords}
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onEdit={(teacher) => handleOpenEditModal(teacher, TEACHER_MODAL_ID)}
        onDelete={(id) => handleOpenDeleteModal(id, TEACHER_DELETE_MODAL_ID)}
        onAssignLesson={(teacher) =>
          handleOpenLessonAssignModal(teacher, TEACHER_LESSON_ASSIGN_MODAL_ID)
        }
      />

      <TeacherFormModal
        modalId={TEACHER_MODAL_ID}
        lessons={lessons}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        isEditing={isEditing}
        onClose={() => handleCloseTeacherModal(TEACHER_MODAL_ID)}
        onSubmit={() => handleSubmit(TEACHER_MODAL_ID)}
      />

      <TeacherDeleteModal
        modalId={TEACHER_DELETE_MODAL_ID}
        onClose={() => handleCloseDeleteModal(TEACHER_DELETE_MODAL_ID)}
        onConfirm={() => handleDelete(TEACHER_DELETE_MODAL_ID)}
      />

      <TeacherLessonAssignModal
        modalId={TEACHER_LESSON_ASSIGN_MODAL_ID}
        teacher={selectedTeacherForLesson}
        formData={lessonAssignFormData}
        setFormData={setLessonAssignFormData}
        lessons={lessons}
        classrooms={classrooms}
        errors={lessonAssignErrors}
        onClose={() =>
          handleCloseLessonAssignModal(TEACHER_LESSON_ASSIGN_MODAL_ID)
        }
        onSubmit={() => handleLessonAssignSubmit(TEACHER_LESSON_ASSIGN_MODAL_ID)}
      />
    </div>
  );
}

export default TeachersPage;