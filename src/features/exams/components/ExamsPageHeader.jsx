import CreateButton from "../../../components/ui/CreateButton";
import ExportButton from "../../../components/ui/ExportButton";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";

function ExamsPageHeader({ onCreate, onExport }) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h1 className="text-2xl font-bold text-base-content">Sınavlar</h1>
                <p className="mt-1 text-sm text-base-content/60">
                    Öğrenci sınav notlarını yönetin, başarı durumlarını takip edin.
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                <ExportButton onClick={onExport}>PDF İndir</ExportButton>

                <CreateButton icon={ClipboardDocumentCheckIcon} onClick={onCreate}>
                    Yeni Not Girişi
                </CreateButton>
            </div>
        </div>
    );
}

export default ExamsPageHeader;