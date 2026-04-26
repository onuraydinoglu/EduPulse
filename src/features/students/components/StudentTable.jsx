import StudentTableRow from "./StudentTableRow";

function StudentTable({ students, onDetail, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden border border-base-300 bg-base-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-base-200/70">
            <tr>
              <th className="text-sm">No</th>
              <th className="text-sm">Öğrenci</th>
              <th className="text-sm">Sınıf</th>
              <th className="text-sm">Kulüp</th>
              <th className="text-sm">Öğrenci Tel</th>
              <th className="text-sm">Veli</th>
              <th className="text-sm">Veli Tel</th>
              <th className="text-sm">Durum</th>
              <th className="text-right text-sm">İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <StudentTableRow
                key={student.id}
                student={student}
                onDetail={onDetail}
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