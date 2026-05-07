import Toast from "../../../components/ui/Toast";

import StudentDeleteModal from "../components/StudentDeleteModal";
import StudentFormModal from "../components/StudentFormModal";
import StudentsPageHeader from "../components/StudentsPageHeader";
import StudentStatsCards from "../components/StudentStatsCards";
import StudentTable from "../components/StudentTable";

import {
  STUDENT_DELETE_MODAL_ID,
  STUDENT_MODAL_ID,
} from "../constants/studentConstants";

import { getStudentStats } from "../constants/studentTableColumns";
import { useStudentsPage } from "../hooks/useStudentsPage";

function StudentsPage() {
  const {
    students,
    filteredStudents,
    classrooms,
    classroomOptions,

    formData,
    setFormData,
    errors,
    isEditing,

    toast,

    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    classroomFilter,
    setClassroomFilter,

    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseStudentModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
    handleSubmit,
    handleExportStudentsPdf,
  } = useStudentsPage();

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} />

      <StudentsPageHeader
        onCreate={() => handleOpenCreateModal(STUDENT_MODAL_ID)}
        onExport={handleExportStudentsPdf}
      />

      <StudentStatsCards items={getStudentStats(students)} />

      <StudentTable
        students={filteredStudents}
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        classroomFilter={classroomFilter}
        setClassroomFilter={setClassroomFilter}
        classroomOptions={classroomOptions}
        onEdit={(student) => handleOpenEditModal(student, STUDENT_MODAL_ID)}
        onDelete={(id) => handleOpenDeleteModal(id, STUDENT_DELETE_MODAL_ID)}
      />

      <StudentFormModal
        modalId={STUDENT_MODAL_ID}
        isEditing={isEditing}
        formData={formData}
        setFormData={setFormData}
        classrooms={classrooms}
        errors={errors}
        onClose={() => handleCloseStudentModal(STUDENT_MODAL_ID)}
        onSubmit={() => handleSubmit(STUDENT_MODAL_ID)}
      />

      <StudentDeleteModal
        modalId={STUDENT_DELETE_MODAL_ID}
        onClose={() => handleCloseDeleteModal(STUDENT_DELETE_MODAL_ID)}
        onConfirm={() => handleDelete(STUDENT_DELETE_MODAL_ID)}
      />
    </div>
  );
}

export default StudentsPage;