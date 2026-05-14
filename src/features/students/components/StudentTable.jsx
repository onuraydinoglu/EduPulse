import FilterSelect from "../../../components/ui/FilterSelect";

import Pagination from "../../../components/ui/Pagination";

import SearchInput from "../../../components/ui/SearchInput";

import { usePagination } from "../../../hooks/usePagination";
import { defaultClassroomFilterOption } from "../constants/studentFilters";

import StudentTableRow from "./StudentTableRow";

function StudentTable({
  students,
  search,
  setSearch,
  classroomFilter,
  setClassroomFilter,
  classroomOptions = [],
  backPath = "/dashboard/students",
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
  } = usePagination(students, 5);

  return (
    <div className="rounded-3xl border border-base-300/60 bg-base-100 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-base-300/60 p-5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="text-lg font-bold text-base-content">
            Öğrenci Listesi
          </h2>

          <p className="text-sm text-base-content/60">
            {students.length} kayıt listeleniyor.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Öğrenci ara..."
          />

          <FilterSelect
            value={classroomFilter}
            onChange={setClassroomFilter}
            hideLabel
            className="w-full sm:w-48 shrink-0"
            options={[defaultClassroomFilterOption, ...classroomOptions]}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="border-b border-base-300 [&_th]:px-6">
              <th>Öğrenci</th>

              <th>Öğrenci No</th>

              <th>Sınıf</th>

              <th>E-Posta</th>

              <th>Telefon</th>

              <th>Durum</th>

              <th className="text-right">İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {paginatedItems.map((student) => (
              <StudentTableRow
                key={student.id || student.Id}
                student={student}
                backPath={backPath}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}

            {students.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="py-10 text-center text-base-content/50"
                >
                  Kayıt bulunamadı.
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

export default StudentTable;