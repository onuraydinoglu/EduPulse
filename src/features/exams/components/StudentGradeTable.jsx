function StudentGradeTable({ students, grades, onGradeChange }) {
  const getGradeValue = (studentId, field) => {
    return grades[studentId]?.[field] ?? "";
  };

  const gradeFields = [
    { key: "exam1", title: "1. Sınav" },
    { key: "exam2", title: "2. Sınav" },
    { key: "project", title: "Proje" },
    { key: "class1", title: "Sınıf İçi 1" },
    { key: "class2", title: "Sınıf İçi 2" },
    { key: "class3", title: "Sınıf İçi 3" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="px-5 py-4 font-medium">Öğrenci</th>
            <th className="px-5 py-4 font-medium">Sınıf</th>

            {gradeFields.map((field) => (
              <th key={field.key} className="px-5 py-4 font-medium">
                {field.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {students.map((student) => (
            <tr key={student.id} className="transition hover:bg-gray-50">
              <td className="px-5 py-4">
                <p className="font-medium text-gray-900">
                  {student.firstName} {student.lastName}
                </p>
              </td>

              <td className="px-5 py-4">
                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                  {student.className}
                </span>
              </td>

              {gradeFields.map((field) => (
                <td key={field.key} className="px-5 py-4">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0-100"
                    value={getGradeValue(student.id, field.key)}
                    onChange={(e) =>
                      onGradeChange(student.id, field.key, e.target.value)
                    }
                    className="h-10 w-24 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {students.length === 0 && (
        <div className="p-8 text-center text-sm text-gray-500">
          Bu sınıfa ait öğrenci bulunamadı.
        </div>
      )}
    </div>
  );
}

export default StudentGradeTable;