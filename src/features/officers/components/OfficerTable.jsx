import FilterSelect from "../../../components/ui/FilterSelect";
import Pagination from "../../../components/ui/Pagination";
import SearchInput from "../../../components/ui/SearchInput";
import { usePagination } from "../../../hooks/usePagination";

import { officerStatusFilterOptions } from "../constants/officerFilters";

import OfficerTableRow from "./OfficerTableRow";

function OfficerTable({
  officers,
  temporaryPasswords = {},
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
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
  } = usePagination(officers, 5);

  return (
    <div className="rounded-3xl border border-base-300/60 bg-base-100 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-base-300/60 p-5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="text-lg font-bold text-base-content">
            Memur Listesi
          </h2>

          <p className="text-sm text-base-content/60">
            {officers.length} kayıt listeleniyor.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Memur, e-posta veya telefon ara..."
          />

          <FilterSelect
            value={statusFilter}
            onChange={setStatusFilter}
            hideLabel
            placeholder="Durum filtresi"
            options={officerStatusFilterOptions}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-xs uppercase text-base-content/50">
              <th>Memur</th>
              <th>E-Posta</th>
              <th>Telefon</th>
              <th>Geçici Şifre</th>
              <th>Durum</th>
              <th className="text-right">İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {paginatedItems.map((officer) => (
              <OfficerTableRow
                key={officer.id || officer.Id}
                officer={officer}
                temporaryPasswords={temporaryPasswords}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}

            {officers.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="py-10 text-center text-base-content/50"
                >
                  Memur kaydı bulunamadı.
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

export default OfficerTable;