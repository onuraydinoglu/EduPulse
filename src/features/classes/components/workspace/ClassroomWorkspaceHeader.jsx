import {
    ArrowLeftIcon,
    ClipboardDocumentListIcon,
    UserPlusIcon,
  } from "@heroicons/react/24/outline";
  
  import Button from "../../../../components/ui/Button";
  import {
    getClassName,
    getClassTeacherName,
  } from "../../utils/classFormatters";
  
  function ClassroomWorkspaceHeader({
    classroom,
    teachers,
    onBack,
    onOpenStudentModal,
    onOpenGrades,
  }) {
    const isActive = classroom?.isActive ?? classroom?.IsActive;
  
    return (
      <div className="rounded-3xl border border-base-300/60 bg-base-100 p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={onBack}
              className="btn btn-ghost btn-circle"
              aria-label="Sınıflara dön"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
  
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-base-content">
                  {getClassName(classroom)} Sınıfı
                </h1>
  
                <span className={`badge ${isActive ? "badge-success" : "badge-error"}`}>
                  {isActive ? "Aktif" : "Pasif"}
                </span>
              </div>
  
              <p className="mt-1 text-sm text-base-content/60">
                Sınıf öğretmeni:{" "}
                <span className="font-semibold text-base-content">
                  {getClassTeacherName(classroom, teachers) || "-"}
                </span>
              </p>
            </div>
          </div>
  
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Button type="button" onClick={onOpenStudentModal}>
              <UserPlusIcon className="h-5 w-5" />
              Öğrenci Kaydı
            </Button>
  
            <Button type="button" variant="outline" onClick={onOpenGrades}>
              <ClipboardDocumentListIcon className="h-5 w-5" />
              Not Girişi
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  export default ClassroomWorkspaceHeader;