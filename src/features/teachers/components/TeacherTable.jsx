import TeacherTableRow from "./TeacherTableRow";

function TeacherTable({ teachers, temporaryPasswords = {}, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden border border-base-300 bg-base-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-base-200/70">
            <tr>
              <th className="text-sm">Öğretmen</th>
              <th className="text-sm">Email</th>
              <th className="text-sm">Telefon</th>
              <th className="text-sm">Geçici Şifre</th>
              <th className="text-sm">Durum</th>
              <th className="text-right text-sm">İşlemler</th>
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
        <div className="p-8 text-center text-sm text-base-content/60">
          Kayıt bulunamadı.
        </div>
      )}
    </div>
  );
}

export default TeacherTable;