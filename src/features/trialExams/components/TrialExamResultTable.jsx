function TrialExamResultTable({ students, results, onResultChange }) {
  const getValue = (studentId, field) => {
    return results[studentId]?.[field] ?? "";
  };

  const resultFields = [
    { key: "turkish", title: "Türkçe" },
    { key: "math", title: "Matematik" },
    { key: "science", title: "Fen" },
    { key: "social", title: "Sosyal" },
    { key: "english", title: "İngilizce" },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-5 py-4 font-medium">Öğrenci</th>
              <th className="px-5 py-4 font-medium">Sınıf</th>

              {resultFields.map((field) => (
                <th key={field.key} className="px-5 py-4 font-medium">
                  {field.title}
                </th>
              ))}

              <th className="px-5 py-4 font-medium">Toplam Net</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {students.map((student) => {
              const totalNet = resultFields.reduce((total, field) => {
                const value = Number(getValue(student.id, field.key) || 0);
                return total + value;
              }, 0);

              return (
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

                  {resultFields.map((field) => (
                    <td key={field.key} className="px-5 py-4">
                      <input
                        type="text"
                        inputMode="decimal"
                        value={getValue(student.id, field.key)}
                        onChange={(e) =>
                          onResultChange(student.id, field.key, e.target.value)
                        }
                        placeholder="Net"
                        className="h-10 w-24 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                      />
                    </td>
                  ))}

                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                      {totalNet}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {students.length === 0 && (
        <div className="p-8 text-center text-sm text-gray-500">
          Bu sınıfa ait öğrenci bulunamadı.
        </div>
      )}
    </div>
  );
}

export default TrialExamResultTable;