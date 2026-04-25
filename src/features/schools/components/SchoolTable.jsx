import SchoolTableRow from "./SchoolTableRow";

function SchoolTable({ schools, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="px-5 py-4 font-medium">Okul Adı</th>
            <th className="px-5 py-4 font-medium">Müdür</th>
            <th className="px-5 py-4 font-medium">Öğrenci Sayısı</th>
            <th className="px-5 py-4 font-medium">Durum</th>
            <th className="px-5 py-4 text-right font-medium">İşlemler</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {schools.map((school) => (
            <SchoolTableRow
              key={school.id}
              school={school}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>

      {schools.length === 0 && (
        <div className="p-8 text-center text-sm text-gray-500">
          Kayıt bulunamadı.
        </div>
      )}
    </div>
  );
}

export default SchoolTable;