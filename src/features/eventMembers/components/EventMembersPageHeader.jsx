import {
    ArrowLeftIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";

import CreateButton from "../../../components/ui/CreateButton";
import ExportButton from "../../../components/ui/ExportButton";

import {
    getEventIsActive,
    getEventName,
    getEventResponsibleTeacherName,
} from "../utils/eventMemberFormatters";

function EventMembersPageHeader({
    event,
    onBack,
    onCreate,
    onExport,
    canManage = true,
}) {
    const isActive = getEventIsActive(event);

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
                <button
                    type="button"
                    onClick={onBack}
                    className="btn btn-square btn-sm border-base-300 bg-base-100"
                    title="Etkinliklere dön"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                </button>

                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-2xl font-bold text-base-content">
                            {getEventName(event)}
                        </h1>

                        <span
                            className={`badge rounded-xl ${isActive ? "badge-success" : "badge-error"
                                }`}
                        >
                            {isActive ? "Aktif" : "Pasif"}
                        </span>
                    </div>

                    <p className="mt-1 text-sm text-base-content/60">
                        Etkinlik Sorumlusu:{" "}
                        <span className="font-medium text-base-content">
                            {getEventResponsibleTeacherName(event)}
                        </span>
                    </p>
                </div>
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