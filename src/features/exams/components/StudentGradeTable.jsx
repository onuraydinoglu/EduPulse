function StudentGradeTable({ students, grades, onGradeChange }) {
  const getGradeValue = (studentId, field) => {
    return grades[studentId]?.[field] ?? "";
  };

  const gradeFields = [
    {
      key: "exam1",
      title: "1. Sınav",
    },
    {
      key: "exam2",
      title: "2. Sınav",
    },
    {
      key: "project",
      title: "Proje",
    },
    {
      key: "classwork1",
      title: "Sınıf İçi 1",
    },
    {
      key: "classwork2",
      title: "Sınıf İçi 2",
    },
    {
      key: "classwork3",
      title: "Sınıf İçi 3",
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-base-200/70">
            <tr>
              <th className="text-sm">Öğrenci</th>
              <th className="text-sm">Sınıf</th>
              <th className="text-sm">Kulüp</th>

              {gradeFields.map((field) => (
                <th key={field.key} className="text-sm">
                  {field.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-base-200/60">
                <td>
                  <p className="font-semibold">
                    {student.firstName} {student.lastName}
                  </p>
                </td>

                <td>
                  <span className="badge badge-primary rounded-lg">
                    {student.className}
                  </span>
                </td>

                <td>{student.club || "Yok"}</td>

                {gradeFields.map((field) => (
                  <td key={field.key}>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="input input-bordered w-24 rounded-xl"
                      placeholder="0-100"
                      value={getGradeValue(student.id, field.key)}
                      onChange={(e) =>
                        onGradeChange(student.id, field.key, e.target.value)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {students.length === 0 && (
        <div className="p-8 text-center text-sm text-base-content/60">
          Bu sınıfa ait öğrenci bulunamadı.
        </div>
      )}
    </div>
  );
}

export default StudentGradeTable;