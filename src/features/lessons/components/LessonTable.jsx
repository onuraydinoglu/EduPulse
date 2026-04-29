import LessonTableRow from "./LessonTableRow";

function LessonTable({ lessons, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden border border-base-300 bg-base-100 shadow-sm">
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
            {lessons.map((lesson) => (
              <LessonTableRow
                key={lesson.id}
                lesson={lesson}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}

            {lessons.length === 0 && (
              <tr>
                <td colSpan="3" className="py-8 text-center text-gray-500">
                  Kayıt bulunamadı.
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