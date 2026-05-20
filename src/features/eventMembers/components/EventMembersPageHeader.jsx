import { PlusIcon } from "@heroicons/react/24/outline";
import BackButton from "../../../components/ui/BackButton";
import CreateButton from "../../../components/ui/CreateButton";
import ExportButton from "../../../components/ui/ExportButton";
import { getEventName } from "../utils/eventMemberFormatters";

function EventMembersPageHeader({
  event,
  onBack,
  onCreate,
  onExport,
  canManage = true,
  isStudentView = false,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-start gap-3">
        <BackButton onClick={onBack} />

        <div>
          <h1 className="text-2xl font-bold text-base-content">
            {getEventName(event)}
          </h1>

          <p className="mt-1 text-sm text-base-content/55">
            {isStudentView
              ? "Etkinlik ile ilgili tarih, saat, yer ve sorumlu öğretmen bilgilerini görüntüleyin."
              : "Etkinlik katılımcılarını yönetin, öğrenci atamalarını düzenleyin ve katılım süreçlerini takip edin."}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {onExport && <ExportButton onClick={onExport}>PDF İndir</ExportButton>}

        {canManage && (
          <CreateButton onClick={onCreate} icon={PlusIcon}>
            Öğrenci Ekle
          </CreateButton>
        )}
      </div>
    </div>
  );
}

export default EventMembersPageHeader;