import SearchInput from "../../../components/ui/SearchInput";
import FilterSelect from "../../../components/ui/FilterSelect";
import Pagination from "../../../components/ui/Pagination";
import { usePagination } from "../../../hooks/usePagination";

import TeacherTableRow from "./TeacherTableRow";

function TeacherTable({
  teachers,
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
  } = usePagination(teachers, 5);

  return (
    <div className="rounded-3xl border border-base-300 bg-base-100 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-base-300 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-base-content">
              Öğretmen Listesi
            </h2>

            <span className="text-sm text-base-content/60">
              - {teachers.length} Kayıt
            </span>
          </div>

          <p className="mt-1 text-sm text-base-content/60">
            Kayıtlı öğretmenlerin temel bilgileri ve durumları.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Öğretmen, telefon veya email ara..."
            className="h-11 w-full sm:w-80"
          />

          <FilterSelect
            value={statusFilter}
            onChange={setStatusFilter}
            hideLabel
            className="w-full sm:w-44"
            options={[
              { label: "Tüm Durumlar", value: "all" },
              { label: "Aktif", value: "active" },
              { label: "İzinde", value: "leave" },
            ]}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-base-100 ">
            <tr className="border-b border-base-300">
              <th className="px-6 py-5 text-left">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-base-content/45">
                  Öğretmen
                </span>
              </th>

              <th className="px-6 py-5 text-left">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-base-content/45">
                  Branş / Bölüm
                </span>
              </th>

              <th className="px-6 py-5 text-left">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-base-content/45">
                  Email
                </span>
              </th>

              <th className="px-6 py-5 text-left">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-base-content/45">
                  Telefon
                </span>
              </th>

              <th className="px-6 py-5 text-left">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-base-content/45">
                  Durum
                </span>
              </th>

              <th className="px-6 py-5 text-right">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-base-content/45">
                  İşlemler
                </span>
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedItems.map((teacher) => (
              <TeacherTableRow
                key={teacher.id}
                teacher={teacher}
                temporaryPassword={temporaryPasswords[teacher.email]}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}

            {teachers.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-sm text-base-content/50"
                >
                  Kayıt bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="overflow-hidden rounded-b-3xl">
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

export default TeacherTable;