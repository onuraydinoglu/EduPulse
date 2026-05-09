import FilterSelect from "../../../components/ui/FilterSelect";
import Pagination from "../../../components/ui/Pagination";
import SearchInput from "../../../components/ui/SearchInput";
import { usePagination } from "../../../hooks/usePagination";

import { examTableHeaders } from "../constants/examTableColumns";
import ExamEditableTableRow from "./ExamEditableTableRow";

function ExamEditableTable({
    rows,
    search,
    setSearch,
    selectedLessonId,
    setSelectedLessonId,
    lessonOptions,
    classroomFilter,
    setClassroomFilter,
    classroomOptions,
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

    return (
        <div className="rounded-3xl border border-base-300/70 bg-base-100 shadow-sm">
            <div className="flex flex-col gap-4 border-b border-base-300/70 p-5 xl:flex-row xl:items-center xl:justify-between">
                <div>
                    <h2 className="text-lg font-bold text-base-content">
                        Öğrenci Not Girişi
                    </h2>
                    <p className="mt-1 text-sm text-base-content/60">
                        Ders seçtikten sonra bütün öğrenciler listelenir. Değişiklikler
                        satır bazlı kaydedilir.
                    </p>
                </div>

                <div className="grid gap-3 md:grid-cols-3 xl:min-w-[820px]">
                    <FilterSelect
                        value={selectedLessonId}
                        onChange={setSelectedLessonId}
                        options={lessonOptions}
                        hideLabel
                    />

                    <FilterSelect
                        value={classroomFilter}
                        onChange={setClassroomFilter}
                        options={classroomOptions}
                        hideLabel
                    />

                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Öğrenci, numara veya sınıf ara..."
                    />
                </div>
            </div>

            {!selectedLessonId ? (
                <div className="p-10 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <span className="text-2xl font-bold">!</span>
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-base-content">
                        Önce ders seçiniz
                    </h3>

                    <p className="mt-2 text-sm text-base-content/60">
                        Not girişi yapabilmek için yukarıdaki ders alanından bir ders
                        seçmelisiniz.
                    </p>
                </div>
            ) : (
                <>
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
                </>
            )}
        </div>
    );
}

export default ExamEditableTable;