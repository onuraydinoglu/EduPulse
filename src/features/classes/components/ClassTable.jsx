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

  const tableHeadTextClass =
    "text-[11px] font-semibold uppercase tracking-[0.16em] text-base-content/45";

  return (
    <div className="rounded-3xl border border-base-300/60 bg-base-100 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-base-300/60 p-5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="text-lg font-bold text-base-content">
            Sınıf Listesi
          </h2>

          <p className="text-sm text-base-content/60">
            {classes.length} kayıt listeleniyor.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Sınıf veya öğretmen ara..."
          />

          <FilterSelect
            value={gradeFilter}
            onChange={setGradeFilter}
            hideLabel
            className="w-full shrink-0 sm:w-48"
            options={classGradeFilterOptions}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-base-200/70">
            <tr className="border-b border-base-300 [&_th]:px-6">
              <th>
                <span className={tableHeadTextClass}>Sınıf</span>
              </th>

              <th>
                <span className={tableHeadTextClass}>Sınıf Öğretmeni</span>
              </th>

              <th>
                <span className={tableHeadTextClass}>Öğrenci Sayısı</span>
              </th>

              <th>
                <span className={tableHeadTextClass}>Sınıf İşlemi</span>
              </th>

              {canManage && (
                <th className="text-right">
                  <span className={tableHeadTextClass}>İşlemler</span>
                </th>
              )}
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
                  className="px-6 py-10 text-center text-sm text-base-content/60"
                >
                  Sınıf kaydı bulunamadı.
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

export default ClassTable;