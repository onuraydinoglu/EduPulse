import SchoolTableRow from "./SchoolTableRow";

function SchoolTable({ schools, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-base-200/70">
            <tr>
              <th className="text-sm">Okul Adı</th>
              <th className="text-sm">Müdür</th>
              <th className="text-sm">Öğrenci Sayısı</th>
              <th className="text-sm">Durum</th>
              <th className="text-right text-sm">İşlemler</th>
            </tr>
          </thead>

          <tbody>
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
      </div>

      {schools.length === 0 && (
        <div className="p-8 text-center text-sm text-base-content/60">
          Kayıt bulunamadı.
        </div>
      )}
    </div>
  );
}

export default SchoolTable;