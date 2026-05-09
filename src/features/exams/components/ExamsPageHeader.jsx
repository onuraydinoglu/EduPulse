import ExportButton from "../../../components/ui/ExportButton";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";

function ExamsPageHeader({ onExport }) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <ClipboardDocumentCheckIcon className="h-6 w-6" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-base-content">Sınavlar</h1>
                        <p className="mt-1 text-sm text-base-content/60">
                            Öğrencileri listeleyin, seçili ders için notları tablo üzerinden
                            girin ve satır bazlı kaydedin.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                <ExportButton onClick={onExport}>PDF İndir</ExportButton>
            </div>
        </div>
    );
}

export default ExamsPageHeader;