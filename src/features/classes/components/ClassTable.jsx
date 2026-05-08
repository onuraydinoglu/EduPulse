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
    <div className="rounded-3xl border border-base-300/60 bg-base-100 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-base-300/60 p-5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="text-lg font-bold text-base-content">Sınıf Listesi</h2>

          <p className="text-sm text-base-content/60">
            {classes.length} kayıt listeleniyor.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 xl:w-auto">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Sınıf veya öğretmen ara..."
          />

          <FilterSelect
            value={gradeFilter}
            onChange={setGradeFilter}
            hideLabel
            placeholder="Sınıf seviyesi"
            options={classGradeFilterOptions}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-xs uppercase text-base-content/50">
              <th>Sınıf</th>
              <th>Sınıf Öğretmeni</th>
              <th>Öğrenci Sayısı</th>
              <th className="text-right">İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {paginatedItems.map((classItem) => (
              <ClassTableRow
                key={classItem.id || classItem.Id}
                classItem={classItem}
                teachers={teachers}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}

            {classes.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="py-10 text-center text-base-content/50"
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