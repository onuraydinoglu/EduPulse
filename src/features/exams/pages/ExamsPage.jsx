import Toast from "../../../components/ui/Toast";

import ExamDeleteModal from "../components/ExamDeleteModal";
import ExamFormModal from "../components/ExamFormModal";
import ExamTable from "../components/ExamTable";
import ExamsPageHeader from "../components/ExamsPageHeader";

import {
  EXAM_DELETE_MODAL_ID,
  EXAM_MODAL_ID,
} from "../constants/examConstants";
import { getExamStats } from "../constants/examTableColumns";
import { useExamsPage } from "../hooks/useExamsPage";

function ExamsPage() {
  const {
    exams,
    filteredExams,
    students,
    lessons,
    formData,
    setFormData,
    errors,
    isEditing,
    toast,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    averageFilter,
    setAverageFilter,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseExamModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
    handleSubmit,
    handleExportExamsPdf,
  } = useExamsPage();

  return (
    <div className="space-y-6">
      <ExamsPageHeader
        onCreate={() => handleOpenCreateModal(EXAM_MODAL_ID)}
        onExport={handleExportExamsPdf}
      />

      <ExamTable
        exams={filteredExams}
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        averageFilter={averageFilter}
        setAverageFilter={setAverageFilter}
        onEdit={(exam) => handleOpenEditModal(exam, EXAM_MODAL_ID)}
        onDelete={(id) => handleOpenDeleteModal(id, EXAM_DELETE_MODAL_ID)}
      />

      <ExamFormModal
        modalId={EXAM_MODAL_ID}
        isEditing={isEditing}
        formData={formData}
        setFormData={setFormData}
        students={students}
        lessons={lessons}
        errors={errors}
        onClose={() => handleCloseExamModal(EXAM_MODAL_ID)}
        onSubmit={() => handleSubmit(EXAM_MODAL_ID)}
      />

      <ExamDeleteModal
        modalId={EXAM_DELETE_MODAL_ID}
        onClose={() => handleCloseDeleteModal(EXAM_DELETE_MODAL_ID)}
        onConfirm={() => handleDelete(EXAM_DELETE_MODAL_ID)}
      />

      {toast.message && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default ExamsPage;