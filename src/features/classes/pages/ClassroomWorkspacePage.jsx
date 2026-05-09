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
    canManageStudents,
    resetStudentForm,
    createStudent,
  } = useClassroomWorkspace(classId);

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
          onBack={() => navigate("/dashboard/classes")}
          onOpenStudentModal={handleOpenStudentModal}
          onOpenGrades={() => setActiveTab("grades")}
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
          onEditStudent={() => { }}
          onDeleteStudent={() => { }}
        />
      </div>

      {canManageStudents && (
        <ClassroomStudentCreateModal
          formData={studentFormData}
          setFormData={setStudentFormData}
          errors={studentErrors}
          saving={savingStudent}
          onClose={handleCloseStudentModal}
          onSubmit={handleCreateStudent}
        />
      )}
    </>
  );
}

export default ClassroomWorkspacePage;