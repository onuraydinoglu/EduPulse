import FilterSelect from "../../../components/ui/FilterSelect";
import Pagination from "../../../components/ui/Pagination";
import SearchInput from "../../../components/ui/SearchInput";
import { usePagination } from "../../../hooks/usePagination";

import { clubStatusFilterOptions } from "../constants/clubFilters";
import ClubTableRow from "./ClubTableRow";

function ClubTable({
  clubs,
  teachers = [],
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
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
  } = usePagination(clubs, 5);

  return (
    <div className="modern-card rounded-3xl border border-base-300 bg-base-100/90 p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-bold text-base-content">
            Kulüp Listesi
          </h2>

          <p className="mt-1 text-sm text-base-content/60">
            {clubs.length} kayıt listeleniyor.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Kulüp veya öğretmen ara..."
          />

          <FilterSelect
            value={statusFilter}
            onChange={setStatusFilter}
            options={clubStatusFilterOptions}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="border-base-300 text-xs uppercase text-base-content/50">
              <th>Kulüp</th>
              <th>Sorumlu Öğretmen</th>
              <th>Üye Sayısı</th>
              <th>Durum</th>
              <th>İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {paginatedItems.map((club) => (
              <ClubTableRow
                key={club.id || club.Id}
                club={club}
                teachers={teachers}
                canManage={canManage}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}

            {clubs.length === 0 && (
              <tr>
                <td colSpan="5">
                  <div className="rounded-2xl border border-dashed border-base-300 py-10 text-center text-sm text-base-content/50">
                    Kulüp kaydı bulunamadı.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalItems > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          totalItems={totalItems}
          startItem={startItem}
          endItem={endItem}
        />
      )}
    </div>
  );
}

export default ClubTable;