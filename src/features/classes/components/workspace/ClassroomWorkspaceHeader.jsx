import {
  ArrowLeftIcon,
  ClipboardDocumentListIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

import CreateButton from "../../../../components/ui/CreateButton";
import ExportButton from "../../../../components/ui/ExportButton";
import StatusBadge from "../../../../components/ui/StatusBadge";
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
  canManageStudents = true,
}) {
  const isActive = classroom?.isActive ?? classroom?.IsActive;

  return (
    <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          <button
            type="button"
            onClick={onBack}
            className="btn btn-circle btn-sm border-base-300 bg-base-100 text-base-content hover:border-primary hover:bg-primary hover:text-primary-content"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-base-content">
                {getClassName(classroom)} Sınıfı
              </h1>

              <StatusBadge status={isActive ? "Aktif" : "Pasif"} />
            </div>

            <p className="mt-1 text-sm text-base-content/60">
              Bu alandan sınıfa ait öğrenci kayıtlarını ve sınav notlarını
              yönetin.
            </p>

            <div className="mt-3 flex flex-wrap gap-2 text-sm text-base-content/70">
              <span className="rounded-xl bg-base-200 px-3 py-1">
                Sınıf Öğretmeni:{" "}
                <span className="font-medium text-base-content">
                  {getClassTeacherName(classroom, teachers) || "-"}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onOpenGrades}
            className="btn rounded-xl border-base-300 bg-base-100 text-base-content hover:border-primary hover:bg-primary hover:text-primary-content"
          >
            <ClipboardDocumentListIcon className="h-5 w-5" />
            Not Girişi
          </button>

          {canManageStudents && (
            <CreateButton onClick={onOpenStudentModal}>
              <UserPlusIcon className="h-5 w-5" />
              Öğrenci Kaydı
            </CreateButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClassroomWorkspaceHeader;