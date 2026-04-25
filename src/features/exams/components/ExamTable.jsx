import ExamTableRow from "./ExamTableRow";

function ExamTable({ exams, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-base-200/70">
            <tr>
              <th className="text-sm">Sınav Adı</th>
              <th className="text-sm">Sınıf</th>
              <th className="text-sm">Ortalama</th>
              <th className="text-right text-sm">İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {exams.map((exam) => (
              <ExamTableRow
                key={exam.id}
                exam={exam}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {exams.length === 0 && (
        <div className="p-8 text-center text-sm text-base-content/60">
          Kayıt bulunamadı.
        </div>
      )}
    </div>
  );
}

export default ExamTable;