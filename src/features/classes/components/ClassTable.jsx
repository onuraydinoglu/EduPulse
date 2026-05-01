import ClassTableRow from "./ClassTableRow";

function ClassTable({ classes = [], teachers = [], onEdit, onDelete, onDetail }) {
  const getTeacherName = (classItem) => {
    if (classItem.teacherFullName) return classItem.teacherFullName;
    if (classItem.TeacherFullName) return classItem.TeacherFullName;

    const teacherId = classItem.teacherId || classItem.TeacherId;

    const teacher = teachers.find(
      (x) => (x.id || x.Id) === teacherId
    );

    const fullName =
      teacher?.fullName ||
      teacher?.FullName ||
      `${teacher?.firstName || teacher?.FirstName || ""} ${teacher?.lastName || teacher?.LastName || ""
        }`.trim();

    return fullName || "Atanmamış";
  };

  if (!classes || classes.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-base-300 bg-base-100 p-12 text-center text-base-content/60">
        Sınıf kaydı bulunamadı.
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {classes.map((classItem) => (
        <ClassTableRow
          key={classItem.id || classItem.Id}
          classItem={classItem}
          teacherName={getTeacherName(classItem)}
          onEdit={onEdit}
          onDelete={onDelete}
          onDetail={onDetail}
        />
      ))}
    </div>
  );
}

export default ClassTable;