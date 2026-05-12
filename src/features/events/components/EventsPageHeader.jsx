import CreateButton from "../../../components/ui/CreateButton";
import ExportButton from "../../../components/ui/ExportButton";

function EventsPageHeader({ onCreate, onExport, canManage = true }) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h1 className="text-2xl font-bold text-base-content">Etkinlikler</h1>

                <p className="mt-1 text-sm text-base-content/60">
                    Etkinlikleri oluşturun, sorumlu öğretmenleri yönetin ve katılımcı
                    süreçlerini düzenleyin.
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                <ExportButton onClick={onExport}>PDF İndir</ExportButton>

                {canManage && (
                    <CreateButton onClick={onCreate}>
                        Yeni Etkinlik
                    </CreateButton>
                )}
            </div>
        </div>
    );
}

export default EventsPageHeader;