import OfficerTableRow from "./OfficerTableRow";

function OfficerTable({ officers, temporaryPasswords = {}, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Ad Soyad</th>
              <th>E-posta</th>
              <th>Telefon</th>
              <th>Geçici Şifre</th>
              <th>Durum</th>
              <th className="text-right">İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {officers.length > 0 ? (
              officers.map((officer) => (
                <OfficerTableRow
                  key={officer.id}
                  officer={officer}
                  temporaryPassword={temporaryPasswords[officer.email]}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-8 text-center text-gray-500">
                  Memur kaydı bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OfficerTable;