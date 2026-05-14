import FilterSelect from "../../../components/ui/FilterSelect";
import Pagination from "../../../components/ui/Pagination";
import SearchInput from "../../../components/ui/SearchInput";
import { usePagination } from "../../../hooks/usePagination";
import { teacherLessonStatusFilterOptions } from "../constants/teacherLessonFilters";
import TeacherLessonTableRow from "./TeacherLessonTableRow";

function TeacherLessonTable({
  teacherLessons,
  items,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  onEdit,
  onDelete,
}) {
  const safeTeacherLessons = Array.isArray(teacherLessons)
    ? teacherLessons
    : Array.isArray(items)
      ? items
      : [];

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
  } = usePagination(safeTeacherLessons, 5);

  const tableHeadTextClass =
    "text-[11px] font-semibold uppercase tracking-[0.16em] text-base-content/45";

  return (
    <div className="rounded-3xl border border-base-300/60 bg-base-100 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-base-300/60 p-5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="text-lg font-bold text-base-content">
            Öğretmen Ders Atama Listesi
          </h2>

          <p className="text-sm text-base-content/60">
            {safeTeacherLessons.length} kayıt listeleniyor.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Öğretmen, ders veya sınıf ara..."
          />

          <FilterSelect
            value={statusFilter}
            onChange={setStatusFilter}
            hideLabel
            className="w-full shrink-0 sm:w-48"
            options={teacherLessonStatusFilterOptions}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-base-200/70">
            <tr className="border-b border-base-300 [&_th]:px-6">
              <th>
                <span className={tableHeadTextClass}>Öğretmen</span>
              </th>

              <th>
                <span className={tableHeadTextClass}>Ders</span>
              </th>

              <th>
                <span className={tableHeadTextClass}>Sınıf</span>
              </th>

              <th className="text-right">
                <span className={tableHeadTextClass}>İşlemler</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedItems.map((teacherLesson) => (
              <TeacherLessonTableRow
                key={teacherLesson.id || teacherLesson.Id}
                item={teacherLesson}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}

            {safeTeacherLessons.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-sm text-base-content/60"
                >
                  Öğretmen ders ataması bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4">
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

export default TeacherLessonTable;