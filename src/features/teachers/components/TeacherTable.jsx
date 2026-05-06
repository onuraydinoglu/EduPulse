import {
  AcademicCapIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

import SearchInput from "../../../components/ui/SearchInput";
import FilterSelect from "../../../components/ui/FilterSelect";
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
  return (
    <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-base-300 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-base-content">
              Öğretmen Listesi
            </h2>

            <span className="text-sm">
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
              { label: "Pasif", value: "passive" },
            ]}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-base-100">
            <tr className="border-b border-base-300">
              <th>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-base-content/50">
                  <AcademicCapIcon className="h-4 w-4" />
                  Öğretmen
                </div>
              </th>

              <th className="text-xs font-bold uppercase tracking-wide text-base-content/50">
                Branş / Bölüm
              </th>

              <th>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-base-content/50">
                  <EnvelopeIcon className="h-4 w-4" />
                  Email
                </div>
              </th>

              <th>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-base-content/50">
                  <PhoneIcon className="h-4 w-4" />
                  Telefon
                </div>
              </th>

              <th className="text-xs font-bold uppercase tracking-wide text-base-content/50">
                Durum
              </th>

              <th className="text-right text-xs font-bold uppercase tracking-wide text-base-content/50">
                İşlemler
              </th>
            </tr>
          </thead>

          <tbody>
            {teachers.map((teacher) => (
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
    </div>
  );
}

export default TeacherTable;