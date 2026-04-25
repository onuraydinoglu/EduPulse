import ClassTableRow from "./ClassTableRow";

function ClassTable({ classes, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden border border-base-300 bg-base-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-base-200/70">
            <tr>
              <th className="text-sm">Sınıf</th>
              <th className="text-sm">Sınıf Öğretmeni</th>
              <th className="text-sm">Öğrenci Sayısı</th>
              <th className="text-right text-sm">İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {classes.map((classItem) => (
              <ClassTableRow
                key={classItem.id}
                classItem={classItem}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {classes.length === 0 && (
        <div className="p-8 text-center text-sm text-base-content/60">
          Kayıt bulunamadı.
        </div>
      )}
    </div>
  );
}

export default ClassTable;