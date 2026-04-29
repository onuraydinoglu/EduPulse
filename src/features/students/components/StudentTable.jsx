import StudentTableRow from "./StudentTableRow";

function StudentTable({ students, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden border border-base-300 bg-base-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Öğrenci</th>
              <th>Öğrenci No</th>
              <th>Sınıf</th>
              <th>E-posta</th>
              <th>Telefon</th>
              <th>Durum</th>
              <th className="text-right">İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <StudentTableRow
                key={student.id}
                student={student}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {students.length === 0 && (
        <div className="p-8 text-center text-sm text-base-content/60">
          Kayıt bulunamadı.
        </div>
      )}
    </div>
  );
}

export default StudentTable;