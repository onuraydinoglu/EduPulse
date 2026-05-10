import Toast from "../../../components/ui/Toast";

import LessonDeleteModal from "../components/LessonDeleteModal";
import LessonFormModal from "../components/LessonFormModal";
import LessonTable from "../components/LessonTable";
import LessonsPageHeader from "../components/LessonsPageHeader";

import {
  LESSON_DELETE_MODAL_ID,
  LESSON_MODAL_ID,
} from "../constants/lessonConstants";

import { useLessonsPage } from "../hooks/useLessonsPage";

function LessonsPage() {
  const {
    filteredLessons,
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
    handleCloseLessonModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleSubmit,
    handleDelete,
    handleExportLessonsPdf,
  } = useLessonsPage();

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} />

      <LessonsPageHeader
        onCreate={() => handleOpenCreateModal(LESSON_MODAL_ID)}
        onExport={handleExportLessonsPdf}
      />

      <LessonTable
        lessons={filteredLessons}
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onEdit={(lesson) => handleOpenEditModal(lesson, LESSON_MODAL_ID)}
        onDelete={(id) => handleOpenDeleteModal(id, LESSON_DELETE_MODAL_ID)}
      />

      <LessonFormModal
        modalId={LESSON_MODAL_ID}
        isEditing={isEditing}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        onClose={() => handleCloseLessonModal(LESSON_MODAL_ID)}
        onSubmit={() => handleSubmit(LESSON_MODAL_ID)}
      />

      <LessonDeleteModal
        modalId={LESSON_DELETE_MODAL_ID}
        onClose={() => handleCloseDeleteModal(LESSON_DELETE_MODAL_ID)}
        onConfirm={() => handleDelete(LESSON_DELETE_MODAL_ID)}
      />
    </div>
  );
}

export default LessonsPage;