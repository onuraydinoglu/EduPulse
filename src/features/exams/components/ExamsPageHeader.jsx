import {
    ArrowLeftIcon,
    ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";

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
        <div className="rounded-3xl border border-base-300/70 bg-base-100 p-5 shadow-sm">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex items-start gap-4">
                    {isClassroomMode && (
                        <button
                            type="button"
                            onClick={onBack}
                            className="btn btn-ghost btn-sm rounded-xl"
                        >
                            <ArrowLeftIcon className="h-4 w-4" />
                        </button>
                    )}

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <ClipboardDocumentCheckIcon className="h-6 w-6" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-base-content">
                            {isClassroomMode ? `${classroomName} Not Girişi` : "Sınavlar"}
                        </h1>

                        <p className="mt-1 text-sm text-base-content/60">
                            {isClassroomMode
                                ? "Bu sınıfa ait öğrenciler listelenir. Giriş yapan öğretmen yalnızca bu sınıfta yetkili olduğu ders için not girişi yapabilir."
                                : "Öğrenci sınav notlarını yönetin, başarı durumlarını takip edin."}
                        </p>
                    </div>
                </div>

                <div className="flex w-full flex-col gap-3 xl:w-auto xl:min-w-[520px] xl:flex-row xl:items-end">
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
        </div>
    );
}

export default ExamsPageHeader;