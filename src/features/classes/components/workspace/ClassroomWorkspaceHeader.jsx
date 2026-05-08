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
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col items-start gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="btn btn-ghost btn-circle"
              aria-label="Sınıflara dön"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold text-base-content">
              {getClassName(classroom)} Sınıfı
            </h1>
          </div>

          <p className="mt-1 text-sm text-base-content/60">
            Bu alandan sınıfa ait öğrenci kayıtlarını ve sınav notlarını
            yönetin.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <ExportButton
          onClick={onOpenGrades}
          icon={ClipboardDocumentListIcon}
          className="btn-outline"
        >
          Not Girişi
        </ExportButton>

        <CreateButton onClick={onOpenStudentModal} icon={UserPlusIcon}>
          Öğrenci Kaydı
        </CreateButton>
      </div>
    </div>
  );
}

export default ClassroomWorkspaceHeader;
