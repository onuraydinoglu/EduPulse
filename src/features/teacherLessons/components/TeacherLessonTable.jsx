import TeacherLessonTableRow from "./TeacherLessonTableRow";

function TeacherLessonTable({ items, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden border border-base-300 bg-base-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Öğretmen</th>
              <th>Ders</th>
              <th>Sınıf</th>
              <th>Durum</th>
              <th className="text-right">İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <TeacherLessonTableRow
                key={item.id}
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}

            {items.length === 0 && (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">
                  Atama bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeacherLessonTable;