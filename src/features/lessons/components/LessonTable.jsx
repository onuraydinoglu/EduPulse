import LessonTableRow from "./LessonTableRow";

function LessonTable({ lessons, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Ders Adı</th>
              <th>Durum</th>
              <th className="text-right">İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {lessons.length > 0 ? (
              lessons.map((lesson) => (
                <LessonTableRow
                  key={lesson.id}
                  lesson={lesson}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-8 text-center text-gray-500">
                  Ders kaydı bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LessonTable;