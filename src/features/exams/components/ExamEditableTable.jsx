import { CheckCircleIcon } from "@heroicons/react/24/outline";

import Pagination from "../../../components/ui/Pagination";
import SearchInput from "../../../components/ui/SearchInput";
import { usePagination } from "../../../hooks/usePagination";
import { examTableHeaders } from "../constants/examTableColumns";
import ExamEditableTableRow from "./ExamEditableTableRow";

function ExamEditableTable({
    rows = [],
    search,
    setSearch,
    selectedLessonId,
    isClassroomMode = false,
    isSavingAll = false,
    rowErrors,
    onGradeChange,
    onSaveAll,
    onReset,
}) {
    const {
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        totalItems,
        totalPages,
        paginatedItems,
        startItem,
        endItem,
    } = usePagination(rows, 10);

    const dirtyCount = rows.filter((row) => row.isDirty).length;
    const hasDirtyRows = dirtyCount > 0;

    if (!selectedLessonId) {
        return (
            <div className="rounded-3xl border border-base-300 bg-base-100 p-8 text-center shadow-sm">
                <h2 className="text-lg font-semibold text-base-content">
                    {isClassroomMode
                        ? "Bu sınıf için ders yetkisi bulunamadı"
                        : "Önce ders seçiniz"}
                </h2>

                <p className="mt-2 text-sm text-base-content/60">
                    {isClassroomMode
                        ? "Giriş yapan öğretmen bu sınıfta herhangi bir derse atanmadıysa not girişi yapamaz. Önce Öğretmen-Ders-Sınıf ataması yapılmalıdır."
                        : "Not girişi yapabilmek için yukarıdan bir ders seçmelisiniz."}
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-3xl border border-base-300 bg-base-100 shadow-sm">
            <div className="flex flex-col gap-4 border-b border-base-300 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 className="text-base font-semibold text-base-content">
                        Öğrenci Notları
                    </h2>

                    <p className="mt-1 text-sm text-base-content/60">
                        {rows.length} öğrenci listeleniyor. Notları girip tek seferde
                        kaydedebilirsiniz.
                    </p>

                    {hasDirtyRows && (
                        <p className="mt-2 text-xs font-medium text-warning">
                            {dirtyCount} öğrencide kaydedilmemiş değişiklik var.
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <SearchInput
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Öğrenci ara..."
                    />

                    <button
                        type="button"
                        onClick={onSaveAll}
                        disabled={!hasDirtyRows || isSavingAll}
                        className="btn btn-primary rounded-xl"
                    >
                        {isSavingAll ? (
                            <span className="loading loading-spinner loading-sm" />
                        ) : (
                            <CheckCircleIcon className="h-5 w-5" />
                        )}
                        Tümünü Kaydet
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead className="bg-base-200/70">
                        <tr>
                            {examTableHeaders.map((header) => (
                                <th
                                    key={header}
                                    className={
                                        header === "İşlem"
                                            ? "text-right text-sm"
                                            : "text-sm"
                                    }
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedItems.map((row) => (
                            <ExamEditableTableRow
                                key={row.studentId}
                                row={row}
                                onGradeChange={onGradeChange}
                                onReset={onReset}
                                error={rowErrors[row.studentId]}
                            />
                        ))}

                        {rows.length === 0 && (
                            <tr>
                                <td
                                    colSpan={examTableHeaders.length}
                                    className="py-10 text-center text-sm text-base-content/60"
                                >
                                    Öğrenci bulunamadı.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={totalItems}
                startItem={startItem}
                endItem={endItem}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
            />
        </div>
    );
}

export default ExamEditableTable;