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

  if (loading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} />

      <ClassroomWorkspaceHeader
        classroom={classroom}
        teachers={teachers}
        onBack={() => navigate("/dashboard/classes")}
        onOpenStudentModal={handleOpenStudentModal}
        onOpenGrades={() => setActiveTab("grades")}
      />

      <ClassroomWorkspaceSummary
        classroom={classroom}
        studentCount={classStudents.length}
        gradeCount={classGrades.length}
      />

      <ClassroomWorkspaceTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        students={classStudents}
        grades={classGrades}
        classroom={classroom}
        onEditStudent={() => {}}
        onDeleteStudent={() => {}}
      />

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
    </div>
  );
}

export default ClassroomWorkspacePage;