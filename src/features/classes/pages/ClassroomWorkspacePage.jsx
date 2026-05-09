import { useNavigate, useParams } from "react-router-dom";

import Toast from "../../../components/ui/Toast";

import ClassroomWorkspaceHeader from "../components/workspace/ClassroomWorkspaceHeader";
import ClassroomWorkspaceSummary from "../components/workspace/ClassroomWorkspaceSummary";
import ClassroomWorkspaceTabs from "../components/workspace/ClassroomWorkspaceTabs";
import ClassroomStudentCreateModal from "../components/workspace/ClassroomStudentCreateModal";

import { useClassroomWorkspace } from "../hooks/useClassroomWorkspace";

function ClassroomWorkspacePage() {
  const { classId } = useParams();
  const navigate = useNavigate();

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
    savingStudent,
    loading,
    toast,
    resetStudentForm,
    createStudent,
  } = useClassroomWorkspace(classId);

  const handleOpenStudentModal = () => {
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

  const handleOpenExamEntry = () => {
    navigate(`/dashboard/classes/${classId}/exams`);
  };

  if (loading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ClassroomWorkspaceHeader
        classroom={classroom}
        teachers={teachers}
        onBack={() => navigate("/dashboard/classes")}
        onOpenStudentModal={handleOpenStudentModal}
        onOpenGrades={handleOpenExamEntry}
      />

      <ClassroomWorkspaceSummary
        classroom={classroom}
        teachers={teachers}
        students={classStudents}
        grades={classGrades}
      />

      <ClassroomWorkspaceTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        students={classStudents}
        grades={classGrades}
        onEditStudent={() => { }}
        onDeleteStudent={() => { }}
      />

      <ClassroomStudentCreateModal
        formData={studentFormData}
        setFormData={setStudentFormData}
        errors={studentErrors}
        loading={savingStudent}
        onClose={handleCloseStudentModal}
        onSubmit={handleCreateStudent}
      />

      {toast.message && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default ClassroomWorkspacePage;