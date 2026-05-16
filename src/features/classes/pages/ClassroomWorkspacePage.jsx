import { useNavigate, useParams } from "react-router-dom";

import Toast from "../../../components/ui/Toast";

import StudentDeleteModal from "../../students/components/StudentDeleteModal";
import StudentFormModal from "../../students/components/StudentFormModal";

import ClassroomWorkspaceHeader from "../components/workspace/ClassroomWorkspaceHeader";
import ClassroomWorkspaceSummary from "../components/workspace/ClassroomWorkspaceSummary";
import ClassroomWorkspaceTabs from "../components/workspace/ClassroomWorkspaceTabs";
import ClassroomStudentCreateModal from "../components/workspace/ClassroomStudentCreateModal";

import { useClassroomWorkspace } from "../hooks/useClassroomWorkspace";

const CLASSROOM_STUDENT_CREATE_MODAL_ID = "classroom_student_modal";
const CLASSROOM_STUDENT_EDIT_MODAL_ID = "classroom_student_edit_modal";
const CLASSROOM_STUDENT_DELETE_MODAL_ID = "classroom_student_delete_modal";

function ClassroomWorkspacePage() {
  const params = useParams();
  const navigate = useNavigate();
  const classId = params.classId || params.classroomId || params.id;

  const {
    activeTab,
    setActiveTab,
    classroom,
    classrooms,
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
    document.getElementById(CLASSROOM_STUDENT_CREATE_MODAL_ID)?.showModal();
  };

  const handleCloseStudentModal = () => {
    resetStudentForm();
    document.getElementById(CLASSROOM_STUDENT_CREATE_MODAL_ID)?.close();
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
          classrooms={classrooms}
          students={classStudents}
          grades={classGrades}
          teachers={teachers}
          onEditStudent={(student) =>
            openEditStudentModal(student, CLASSROOM_STUDENT_EDIT_MODAL_ID)
          }
          onDeleteStudent={(id) =>
            openDeleteStudentModal(id, CLASSROOM_STUDENT_DELETE_MODAL_ID)
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
            modalId={CLASSROOM_STUDENT_EDIT_MODAL_ID}
            isEditing={isEditingStudent}
            formData={studentFormData}
            setFormData={setStudentFormData}
            classrooms={classrooms}
            errors={studentErrors}
            onClose={() => closeEditStudentModal(CLASSROOM_STUDENT_EDIT_MODAL_ID)}
            onSubmit={() => updateStudent(CLASSROOM_STUDENT_EDIT_MODAL_ID)}
          />

          <StudentDeleteModal
            modalId={CLASSROOM_STUDENT_DELETE_MODAL_ID}
            onClose={() =>
              closeDeleteStudentModal(CLASSROOM_STUDENT_DELETE_MODAL_ID)
            }
            onConfirm={() => deleteStudent(CLASSROOM_STUDENT_DELETE_MODAL_ID)}
          />
        </>
      )}
    </>
  );
}

export default ClassroomWorkspacePage;