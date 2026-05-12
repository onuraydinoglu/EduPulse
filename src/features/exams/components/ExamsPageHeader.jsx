import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";

import BackButton from "../../../components/ui/BackButton";
import ExportButton from "../../../components/ui/ExportButton";

function ExamsPageHeader({
    isClassroomMode = false,
    classroomName = "",
    lessonOptions = [],
    selectedLessonId,
    setSelectedLessonId,
    onBack,
    onExport,
}) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <div className="flex items-center gap-4">
                    {isClassroomMode && (
                        <BackButton onClick={onBack} title="Sınıfa dön" />
                    )}

                    <h1 className="text-2xl font-bold text-base-content">
                        {isClassroomMode ? `${classroomName} Not Girişi` : "Sınavlar"}
                    </h1>
                </div>

                <p className="mt-1 text-sm text-base-content/60">
                    {isClassroomMode
                        ? "Bu sınıfa ait öğrenciler listelenir. Giriş yapan öğretmen yalnızca bu sınıfta yetkili olduğu ders için not girişi yapabilir."
                        : "Öğrenci sınav notlarını yönetin, başarı durumlarını takip edin."}
                </p>
            </div>

            <div className="flex w-full flex-col gap-3 md:w-auto md:min-w-[420px] sm:flex-row sm:items-end">
                <div className="w-full">
                    <label className="mb-1 block text-xs font-semibold text-base-content/60">
                        Ders
                    </label>

                    <select
                        value={selectedLessonId}
                        onChange={(event) => setSelectedLessonId(event.target.value)}
                        className="select select-bordered w-full rounded-xl focus:border-primary focus:outline-none"
                        disabled={!lessonOptions.length}
                    >
                        {lessonOptions.length === 0 && (
                            <option value="">Ders bulunamadı</option>
                        )}

                        {lessonOptions.map((lesson) => (
                            <option key={lesson.value} value={lesson.value}>
                                {lesson.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex shrink-0">
                    <ExportButton onClick={onExport}>PDF İndir</ExportButton>
                </div>
            </div>
        </div>
    );
}

export default ExamsPageHeader;