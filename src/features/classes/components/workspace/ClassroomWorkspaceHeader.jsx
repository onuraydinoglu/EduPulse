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
}) {
  const isActive = classroom?.isActive ?? classroom?.IsActive;

  return (
    <div className="rounded-3xl border border-base-300/70 bg-base-100 p-5 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <button
            type="button"
            onClick={onBack}
            className="btn btn-ghost btn-sm rounded-xl"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-base-content">
                {getClassName(classroom)} Sınıfı
              </h1>

              <StatusBadge status={isActive ? "aktif" : "pasif"} />
            </div>

            <p className="mt-1 text-sm text-base-content/60">
              Bu alandan sınıfa ait öğrenci kayıtlarını ve sınav notlarını
              yönetin.
            </p>

            <p className="mt-2 text-xs text-base-content/50">
              Sınıf Öğretmeni: {getClassTeacherName(classroom, teachers) || "-"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <ExportButton
            icon={ClipboardDocumentListIcon}
            onClick={onOpenGrades}
          >
            Not Girişi
          </ExportButton>

          <CreateButton icon={UserPlusIcon} onClick={onOpenStudentModal}>
            Öğrenci Kaydı
          </CreateButton>
        </div>
      </div>
    </div>
  );
}

export default ClassroomWorkspaceHeader;