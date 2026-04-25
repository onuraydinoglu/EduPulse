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
    <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-base-200/70">
            <tr>
              <th className="text-sm">Öğrenci</th>
              <th className="text-sm">Sınıf</th>

              {resultFields.map((field) => (
                <th key={field.key} className="text-sm">
                  {field.title}
                </th>
              ))}

              <th className="text-sm">Toplam Net</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => {
              const totalNet = resultFields.reduce((total, field) => {
                const value = Number(getValue(student.id, field.key) || 0);
                return total + value;
              }, 0);

              return (
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

                  {resultFields.map((field) => (
                    <td key={field.key}>
                      <input
                        type="text"
                        inputMode="decimal"
                        className="input input-bordered w-24 rounded-xl"
                        placeholder="Net"
                        value={getValue(student.id, field.key)}
                        onChange={(e) =>
                          onResultChange(student.id, field.key, e.target.value)
                        }
                      />
                    </td>
                  ))}

                  <td>
                    <span className="font-bold text-primary">
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
        <div className="p-8 text-center text-sm text-base-content/60">
          Bu sınıfa ait öğrenci bulunamadı.
        </div>
      )}
    </div>
  );
}

export default TrialExamResultTable;