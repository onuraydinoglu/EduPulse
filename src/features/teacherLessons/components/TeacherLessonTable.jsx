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
            placeholder="Durum filtresi"
            options={teacherLessonStatusFilterOptions}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-xs uppercase text-base-content/50">
              <th>Öğretmen</th>
              <th>Ders</th>
              <th>Sınıf</th>
              <th>Durum</th>
              <th className="text-right">İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {paginatedItems.map((teacherLesson) => (
              <TeacherLessonTableRow
                key={teacherLesson.id || teacherLesson.Id}
                teacherLesson={teacherLesson}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}

            {safeTeacherLessons.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="py-10 text-center text-base-content/50"
                >
                  Öğretmen ders ataması bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-base-300/60 p-4">
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