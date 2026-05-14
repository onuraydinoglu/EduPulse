import FilterSelect from "../../../components/ui/FilterSelect";
import Pagination from "../../../components/ui/Pagination";
import SearchInput from "../../../components/ui/SearchInput";

import { usePagination } from "../../../hooks/usePagination";
import { teacherStatusFilterOptions } from "../constants/teacherFilters";

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
    <div className="rounded-3xl border border-base-300/60 bg-base-100 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-base-300/60 p-5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="text-lg font-bold text-base-content">
            Öğretmen Listesi
          </h2>

          <p className="text-sm text-base-content/60">
            {teachers.length} kayıt listeleniyor.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Öğretmen, branş, telefon veya email ara..."
          />

          <FilterSelect
            value={statusFilter}
            onChange={setStatusFilter}
            hideLabel
            className="w-full sm:w-48 shrink-0"
            options={teacherStatusFilterOptions}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-base-200/70">
            <tr className="border-b border-base-300 [&_th]:px-6">
              <th>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-base-content/45">
                  Öğretmen
                </span>
              </th>

              <th>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-base-content/45">
                  Branş / Bölüm
                </span>
              </th>

              <th>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-base-content/45">
                  E-Posta
                </span>
              </th>

              <th>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-base-content/45">
                  Telefon
                </span>
              </th>

              <th>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-base-content/45">
                  Durum
                </span>
              </th>

              <th className="text-right">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-base-content/45">
                  İşlemler
                </span>
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedItems.map((teacher) => {
              const teacherId = teacher.id || teacher.Id;
              const email = teacher.email || teacher.Email;

              return (
                <TeacherTableRow
                  key={teacherId}
                  teacher={teacher}
                  temporaryPassword={
                    temporaryPasswords[email] ||
                    temporaryPasswords[email?.toLowerCase?.()]
                  }
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              );
            })}

            {teachers.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-sm text-base-content/60"
                >
                  Öğretmen kaydı bulunamadı.
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

export default TeacherTable;