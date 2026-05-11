import { PlusIcon } from "@heroicons/react/24/outline";
import CreateButton from "../../../components/ui/CreateButton";
import ExportButton from "../../../components/ui/ExportButton";

function ClubsPageHeader({ onCreate, onExport }) {
    return (
        <div className="modern-card mb-6 flex flex-col gap-4 rounded-3xl border border-base-300 bg-base-100/90 p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
            <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                    Kulüp Yönetimi
                </p>

                <h1 className="mt-2 text-3xl font-bold text-base-content">
                    Kulüpler
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-base-content/60">
                    Kulüpleri oluşturun, sorumlu öğretmen atamalarını yönetin ve kulüp
                    üye süreçlerini takip edin.
                </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <ExportButton onClick={onExport}>
                    PDF İndir
                </ExportButton>

                <CreateButton icon={PlusIcon} onClick={onCreate}>
                    Yeni Kulüp
                </CreateButton>
            </div>
        </div>
    );
}

export default ClubsPageHeader;