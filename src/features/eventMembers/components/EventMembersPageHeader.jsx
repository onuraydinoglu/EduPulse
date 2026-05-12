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
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <div className="flex items-center gap-4">
                    <BackButton onClick={onBack} title="Etkinliklere dön" />

                    <h1 className="text-2xl font-bold text-base-content">
                        {getEventName(event)}
                    </h1>
                </div>

                <p className="mt-1 text-sm text-base-content/60">
                    Etkinlik katılımcılarını yönetin, öğrenci atamalarını düzenleyin
                    ve katılım süreçlerini takip edin.
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                <ExportButton onClick={onExport}>PDF İndir</ExportButton>

                {canManage && (
                    <CreateButton icon={PlusIcon} onClick={onCreate}>
                        Öğrenci Ekle
                    </CreateButton>
                )}
            </div>
        </div>
    );
}

export default EventMembersPageHeader;