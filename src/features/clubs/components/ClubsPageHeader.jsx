import CreateButton from "../../../components/ui/CreateButton";
import ExportButton from "../../../components/ui/ExportButton";
import { PlusIcon } from "@heroicons/react/24/outline";

function ClubsPageHeader({ onCreate, onExport, canManage = true }) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h1 className="text-2xl font-bold text-base-content">Kulüpler</h1>

                <p className="mt-1 text-sm text-base-content/60">
                    Kulüpleri oluşturun, sorumlu öğretmen bilgilerini yönetin ve kulüp
                    üye süreçlerini düzenleyin.
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                <ExportButton onClick={onExport}>PDF İndir</ExportButton>

                {canManage && (
                    <CreateButton icon={PlusIcon} onClick={onCreate}>
                        Yeni Kulüp
                    </CreateButton>
                )}
            </div>
        </div>
    );
}

export default ClubsPageHeader;