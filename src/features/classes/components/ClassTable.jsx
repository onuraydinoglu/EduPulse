import FilterSelect from "../../../components/ui/FilterSelect";
import Pagination from "../../../components/ui/Pagination";
import SearchInput from "../../../components/ui/SearchInput";
import { usePagination } from "../../../hooks/usePagination";
import { classGradeFilterOptions } from "../constants/classFilters";
import ClassTableRow from "./ClassTableRow";

function ClassTable({
  classes,
  teachers = [],
  search,
  setSearch,
  gradeFilter,
  setGradeFilter,
  canManage = true,
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
  } = usePagination(classes, 5);

  return (
    <div className="rounded-3xl border border-base-300 bg-base-100 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-base-300 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-base font-semibold text-base-content">
            Sınıf Listesi
          </h2>
          <p className="mt-1 text-sm text-base-content/60">
            {classes.length} kayıt listeleniyor.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <SearchInput
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Sınıf veya öğretmen ara..."
          />

          <FilterSelect
            value={gradeFilter}
            onChange={setGradeFilter}
            className="w-full sm:w-48 shrink-0"
            options={classGradeFilterOptions}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-base-200/70">
            <tr>
              <th className="text-sm">Sınıf</th>
              <th className="text-sm">Sınıf Öğretmeni</th>
              <th className="text-sm">Öğrenci Sayısı</th>
              <th className="text-sm">Sınıf İşlemi</th>
              {canManage && <th className="text-right text-sm">İşlemler</th>}
            </tr>
          </thead>

          <tbody>
            {paginatedItems.map((classItem) => (
              <ClassTableRow
                key={classItem.id || classItem.Id}
                classItem={classItem}
                teachers={teachers}
                canManage={canManage}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}

            {classes.length === 0 && (
              <tr>
                <td
                  colSpan={canManage ? 5 : 4}
                  className="py-10 text-center text-sm text-base-content/60"
                >
                  Sınıf kaydı bulunamadı.
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

export default ClassTable;