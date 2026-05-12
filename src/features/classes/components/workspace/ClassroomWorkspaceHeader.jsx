import {
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

import CreateButton from "../../../../components/ui/CreateButton";
import BackButton from "../../../../components/ui/BackButton";
import { getClassName } from "../../utils/classFormatters";

function ClassroomWorkspaceHeader({
  classroom,
  onBack,
  onOpenStudentModal,
  onOpenGrades,
  canManageStudents = true,
}) {
  const isActive = classroom?.isActive ?? classroom?.IsActive;

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="flex items-center gap-4">
          <BackButton onClick={onBack} />

          <h1 className="text-2xl font-bold text-base-content">
            {getClassName(classroom)} Sınıfı
          </h1>
        </div>

        <p className="mt-1 text-sm text-base-content/60">
          Bu alandan sınıfa ait öğrenci kayıtlarını ve sınav notlarını
          yönetin.
        </p>
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
            Öğrenci Kaydı
          </CreateButton>
        )}
      </div>
    </div>
  );
}

export default ClassroomWorkspaceHeader;