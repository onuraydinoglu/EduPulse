import {
    ArrowLeftIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";

import CreateButton from "../../../components/ui/CreateButton";
import ExportButton from "../../../components/ui/ExportButton";

import {
    getAdvisorName,
    getClubIsActive,
    getClubName,
} from "../utils/clubMemberFormatters";

function ClubMembersPageHeader({
    club,
    onBack,
    onCreate,
    onExport,
    canManage = true,
}) {
    const isActive = getClubIsActive(club);

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
                <button
                    type="button"
                    onClick={onBack}
                    className="btn btn-square btn-sm border-base-300 bg-base-100"
                    title="Kulüplere dön"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                </button>

                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-2xl font-bold text-base-content">
                            {getClubName(club)}
                        </h1>

                        <span
                            className={`badge rounded-xl ${isActive ? "badge-success" : "badge-error"
                                }`}
                        >
                            {isActive ? "Aktif" : "Pasif"}
                        </span>
                    </div>

                    <p className="mt-1 text-sm text-base-content/60">
                        Sorumlu Öğretmen:{" "}
                        <span className="font-medium text-base-content">
                            {getAdvisorName(club)}
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

export default ClubMembersPageHeader;