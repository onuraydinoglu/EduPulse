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
    const responsibleTeacherText = getEventResponsibleTeacherName(event);

    return (
        <div className="modern-card border border-base-300/60 bg-base-100/80 p-5 shadow-sm backdrop-blur">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="btn btn-ghost btn-circle"
                        aria-label="Etkinliklere dön"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                    </button>

                    <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                            <h1 className="text-2xl font-bold tracking-tight text-base-content">
                                {getEventName(event)}
                            </h1>

                            <span
                                className={`badge ${isActive ? "badge-success" : "badge-error"
                                    } badge-sm text-white`}
                            >
                                {isActive ? "Aktif" : "Pasif"}
                            </span>
                        </div>

                        <p className="text-sm text-base-content/70">
                            Sorumlu Hocalar:{" "}
                            <span className="font-semibold text-base-content">
                                {responsibleTeacherText}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <ExportButton onClick={onExport}>PDF İndir</ExportButton>

                    {canManage && (
                        <CreateButton onClick={onCreate} icon={PlusIcon}>
                            Öğrenci Ekle
                        </CreateButton>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EventMembersPageHeader;