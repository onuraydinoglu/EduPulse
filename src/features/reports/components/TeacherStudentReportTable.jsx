import TeacherStudentReportTableRow from "./TeacherStudentReportTableRow";

function TeacherStudentReportTable({ students, className }) {
  return (
    <div className="overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-5 py-4 font-medium">Öğrenci</th>
              <th className="px-5 py-4 font-medium">Ders Ort.</th>
              <th className="px-5 py-4 font-medium">Sınav Ort.</th>
              <th className="px-5 py-4 font-medium">Deneme Ort.</th>
              <th className="px-5 py-4 font-medium">Proje</th>
              <th className="px-5 py-4 font-medium">Durum</th>
              <th className="px-5 py-4 text-right font-medium">İşlemler</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {students.map((student) => (
              <TeacherStudentReportTableRow
                key={student.id}
                student={student}
                className={className}
              />
            ))}
          </tbody>
        </table>
      </div>

      {students.length === 0 && (
        <div className="p-8 text-center text-sm text-gray-500">
          Kayıt bulunamadı.
        </div>
      )}
    </div>
  );
}

export default TeacherStudentReportTable;