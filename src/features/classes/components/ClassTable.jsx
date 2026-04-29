import ClassTableRow from "./ClassTableRow";

function ClassTable({ classes, teachers = [], onEdit, onDelete }) {
  const getTeacherName = (classItem) => {
    if (classItem.teacherFullName) return classItem.teacherFullName;

    const teacher = teachers.find((x) => x.id === classItem.teacherId);

    return (
      teacher?.fullName ||
      `${teacher?.firstName || ""} ${teacher?.lastName || ""}`.trim()
    );
  };

  return (
    <div className="overflow-hidden border border-base-300 bg-base-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Sınıf</th>
              <th>Sınıf Öğretmeni</th>
              <th>Öğrenci Sayısı</th>
              <th className="text-right">İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {classes.map((classItem) => (
              <ClassTableRow
                key={classItem.id}
                classItem={classItem}
                teacherName={getTeacherName(classItem)}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}

            {classes.length === 0 && (
              <tr>
                <td colSpan="4" className="py-8 text-center text-gray-500">
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

export default ClassTable;