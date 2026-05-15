import FilterSelect from "../../../components/ui/FilterSelect";
import Pagination from "../../../components/ui/Pagination";
import SearchInput from "../../../components/ui/SearchInput";
import { usePagination } from "../../../hooks/usePagination";

import {
    examAverageFilterOptions,
    examStatusFilterOptions,
} from "../constants/examFilters";
import { examTableHeaders } from "../constants/examTableColumns";
import ExamTableRow from "./ExamTableRow";

function ExamTable({
    exams,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    averageFilter,
    setAverageFilter,
    onEdit,
    onDelete,
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
    } = usePagination(exams, 10);

    return (
        <div className="rounded-3xl border border-base-300/70 bg-base-100 shadow-sm">
            <div className="flex flex-col gap-4 border-b border-base-300/70 p-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 className="text-lg font-bold text-base-content">
                        Sınav Notları Listesi
                    </h2>
                    <p className="mt-1 text-sm text-base-content/60">
                        {exams.length} kayıt listeleniyor.
                    </p>
                </div>

                <div className="grid gap-3 md:grid-cols-3 lg:min-w-[720px]">
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Öğrenci, sınıf veya ders ara..."
                    />

                    <FilterSelect
                        value={statusFilter}
                        onChange={setStatusFilter}
                        options={examStatusFilterOptions}
                        hideLabel
                    />

                    <FilterSelect
                        value={averageFilter}
                        onChange={setAverageFilter}
                        options={examAverageFilterOptions}
                        hideLabel
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
                        {paginatedItems.map((exam) => (
                            <ExamTableRow
                                key={exam.id || exam.Id}
                                exam={exam}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}

                        {exams.length === 0 && (
                            <tr>
                                <td
                                    colSpan={examTableHeaders.length}
                                    className="py-10 text-center text-sm text-base-content/60"
                                >
                                    Sınav notu kaydı bulunamadı.
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

export default ExamTable;