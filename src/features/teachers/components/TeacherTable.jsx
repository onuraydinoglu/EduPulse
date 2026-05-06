import TeacherTableRow from "./TeacherTableRow";

function TeacherTable({ teachers, temporaryPasswords = {}, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/80">
              <th className="py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                Öğretmen
              </th>
              <th className="py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                Branş / Bölüm
              </th>
              <th className="py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                Email
              </th>
              <th className="py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                Telefon
              </th>
              <th className="py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                Durum
              </th>
              <th className="py-4 text-right text-xs font-bold uppercase tracking-wide text-gray-500">
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
          </tbody>
        </table>
      </div>

      {teachers.length === 0 && (
        <div className="p-10 text-center">
          <p className="text-sm font-semibold text-gray-700">
            Kayıt bulunamadı.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Arama veya filtre kriterlerini değiştirerek tekrar deneyin.
          </p>
        </div>
      )}
    </div>
  );
}

export default TeacherTable;