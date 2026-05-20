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
}) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
      <div className="flex items-start gap-4">
        <BackButton onClick={onBack} />

        <div>
          <h1 className="text-2xl font-bold text-base-content">
            {getEventName(event)}
          </h1>

          <p className="mt-2 text-sm text-base-content/60">
            {canManage
              ? "Etkinlik katılımcılarını yönetin, öğrenci atamalarını düzenleyin ve katılım süreçlerini takip edin."
              : "Etkinlik bilgilerini görüntüleyin."}
          </p>
        </div>
      </div>

      {canManage && (
        <div className="flex flex-wrap gap-3">
          <ExportButton onClick={onExport}>PDF İndir</ExportButton>

          <CreateButton onClick={onCreate} icon={PlusIcon}>
            Öğrenci Ekle
          </CreateButton>
        </div>
      )}
    </div>
  );
}

export default EventMembersPageHeader;