import ClubTableRow from "./ClubTableRow";

function ClubTable({ clubs, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="px-5 py-4 font-medium">Kulüp Adı</th>
            <th className="px-5 py-4 font-medium">Öğrenci Sayısı</th>
            <th className="px-5 py-4 font-medium">Durum</th>
            <th className="px-5 py-4 text-right font-medium">İşlemler</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {clubs.map((club) => (
            <ClubTableRow
              key={club.id}
              club={club}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>

      {clubs.length === 0 && (
        <div className="p-8 text-center text-sm text-gray-500">
          Kayıt bulunamadı.
        </div>
      )}
    </div>
  );
}

export default ClubTable;