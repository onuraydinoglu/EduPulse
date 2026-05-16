import { useNavigate, useParams } from "react-router-dom";

import Toast from "../../../components/ui/Toast";

import ClassroomWorkspaceHeader from "../components/workspace/ClassroomWorkspaceHeader";
import ClassroomWorkspaceSummary from "../components/workspace/ClassroomWorkspaceSummary";

import ClassroomWorkspaceTabs from "../components/workspace/ClassroomWorkspaceTabs";

import ClassroomStudentCreateModal from "../components/workspace/ClassroomStudentCreateModal";

import StudentDeleteModal from "../../students/components/StudentDeleteModal";
import StudentFormModal from "../../students/components/StudentFormModal";

import {
  STUDENT_DELETE_MODAL_ID,
  STUDENT_MODAL_ID,
} from "../../students/constants/studentConstants";

import { useClassroomWorkspace } from "../hooks/useClassroomWorkspace";

function ClassroomWorkspacePage() {
  const params = useParams();

  const navigate = useNavigate();
  const classId = params.classId || params.classroomId || params.id;

  const {
    activeTab,

    setActiveTab,

    classroom,

    teachers,

    classStudents,

    classGrades,

    studentFormData,

    setStudentFormData,

    studentErrors,

    isEditingStudent,

    savingStudent,

    loading,

    toast,

    canManageStudents,

    resetStudentForm,

    createStudent,

    openEditStudentModal,

    closeEditStudentModal,

    updateStudent,

    openDeleteStudentModal,

    closeDeleteStudentModal,

    deleteStudent,
  } = useClassroomWorkspace(classId);

  const handleBackToClasses = () => {
    navigate("/dashboard/classes");
  };

  const handleOpenStudentModal = () => {
    if (!canManageStudents) return;
    resetStudentForm();

    document.getElementById("classroom_student_modal")?.showModal();
  };

  const handleCloseStudentModal = () => {
    resetStudentForm();

    document.getElementById("classroom_student_modal")?.close();
  };

  const handleCreateStudent = async () => {
    const isCreated = await createStudent();

    if (isCreated) {
      handleCloseStudentModal();
    }
  };

  const handleOpenGrades = () => {
    if (!classId) return;

    navigate(`/dashboard/classes/${classId}/exams`);
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <>
      <Toast message={toast.message} type={toast.type} />

      <div className="space-y-6">
        <ClassroomWorkspaceHeader
          classroom={classroom}
          teachers={teachers}
          onBack={handleBackToClasses}
          onOpenStudentModal={handleOpenStudentModal}
          onOpenGrades={handleOpenGrades}
          canManageStudents={canManageStudents}
        />

        <ClassroomWorkspaceSummary
          classroom={classroom}
          studentCount={classStudents.length}
        />

        <ClassroomWorkspaceTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          classroom={classroom}
          students={classStudents}
          grades={classGrades}
          teachers={teachers}
          onEditStudent={(student) =>
            openEditStudentModal(student, STUDENT_MODAL_ID)
          }
          onDeleteStudent={(id) =>
            openDeleteStudentModal(id, STUDENT_DELETE_MODAL_ID)
          }
        />
      </div>

      {canManageStudents && (
        <>
          <ClassroomStudentCreateModal
            classroom={classroom}
            classId={classId}
            formData={studentFormData}
            setFormData={setStudentFormData}
            errors={studentErrors}
            saving={savingStudent}
            onClose={handleCloseStudentModal}
            onSubmit={handleCreateStudent}
          />

          <StudentFormModal
            modalId={STUDENT_MODAL_ID}
            isEditing={isEditingStudent}
            formData={studentFormData}
            setFormData={setStudentFormData}
            classrooms={classroom ? [classroom] : []}
            errors={studentErrors}
            onClose={() => closeEditStudentModal(STUDENT_MODAL_ID)}
            onSubmit={() => updateStudent(STUDENT_MODAL_ID)}
          />

          <StudentDeleteModal
            modalId={STUDENT_DELETE_MODAL_ID}
            onClose={() => closeDeleteStudentModal(STUDENT_DELETE_MODAL_ID)}
            onConfirm={() => deleteStudent(STUDENT_DELETE_MODAL_ID)}
          />
        </>
      )}
    </>
  );
}

export default ClassroomWorkspacePage;