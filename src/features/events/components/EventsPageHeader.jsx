import { PlusIcon } from "@heroicons/react/24/outline";
import CreateButton from "../../../components/ui/CreateButton";
import ExportButton from "../../../components/ui/ExportButton";

function EventsPageHeader({ onCreate, onExport, canManage = true }) {
    return (
        <div className="modern-card flex flex-col gap-4 rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
            <div>
                <h1 className="text-2xl font-bold text-base-content">Etkinlikler</h1>
                <p className="mt-1 text-sm text-base-content/50">
                    Etkinlikleri oluşturun, sorumlu öğretmenleri yönetin ve katılımcı
                    süreçlerini düzenleyin.
                </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <ExportButton onClick={onExport}>PDF İndir</ExportButton>

                {canManage && (
                    <CreateButton onClick={onCreate}>
                        <PlusIcon className="h-5 w-5" />
                        Yeni Etkinlik
                    </CreateButton>
                )}
            </div>
        </div>
    );
}

export default EventsPageHeader;