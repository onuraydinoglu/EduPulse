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
    savingRows,
    rowErrors,
    onGradeChange,
    onSave,
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

    if (!selectedLessonId) {
        return (
            <div className="rounded-3xl border border-base-300/70 bg-base-100 p-10 text-center shadow-sm">
                <h3 className="text-lg font-bold text-base-content">
                    {isClassroomMode
                        ? "Bu sınıf için ders yetkisi bulunamadı"
                        : "Önce ders seçiniz"}
                </h3>

                <p className="mt-2 text-sm text-base-content/60">
                    {isClassroomMode
                        ? "Giriş yapan öğretmen bu sınıfta herhangi bir derse atanmadıysa not girişi yapamaz. Önce Öğretmen-Ders-Sınıf ataması yapılmalıdır."
                        : "Not girişi yapabilmek için yukarıdan bir ders seçmelisiniz."}
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-3xl border border-base-300/70 bg-base-100 shadow-sm">
            <div className="flex flex-col gap-4 border-b border-base-300/70 p-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 className="text-lg font-bold text-base-content">
                        Öğrenci Notları
                    </h2>
                    <p className="mt-1 text-sm text-base-content/60">
                        {rows.length} öğrenci listeleniyor. Notlar satır bazlı kaydedilir.
                    </p>
                </div>

                <div className="w-full lg:max-w-md">
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Öğrenci adı veya numara ara..."
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            {examTableHeaders.map((header) => (
                                <th key={header} className="text-xs uppercase tracking-wide">
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
                                isSaving={savingRows[row.studentId]}
                                error={rowErrors[row.studentId]}
                                onGradeChange={onGradeChange}
                                onSave={onSave}
                                onReset={onReset}
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

            <div className="border-t border-base-300/70 p-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    startItem={startItem}
                    endItem={endItem}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default ExamEditableTable;