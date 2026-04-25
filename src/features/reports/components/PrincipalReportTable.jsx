import PrincipalReportTableRow from "./PrincipalReportTableRow";

function PrincipalReportTable({ reports }) {
  return (
    <div className="overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-5 py-4 font-medium">Sınıf</th>
              <th className="px-5 py-4 font-medium">Sorumlu Öğretmen</th>
              <th className="px-5 py-4 font-medium">Öğrenci Sayısı</th>
              <th className="px-5 py-4 font-medium">Sınıf Ortalaması</th>
              <th className="px-5 py-4 font-medium">Başarı Oranı</th>
              <th className="px-5 py-4 text-right font-medium">İşlemler</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {reports.map((report) => (
              <PrincipalReportTableRow key={report.id} report={report} />
            ))}
          </tbody>
        </table>
      </div>

      {reports.length === 0 && (
        <div className="p-8 text-center text-sm text-gray-500">
          Kayıt bulunamadı.
        </div>
      )}
    </div>
  );
}

export default PrincipalReportTable;