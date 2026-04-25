import Button from "../../../components/ui/Button";

function PrincipalReportTableRow({ report }) {
  const successRateClass =
    report.successRate >= 75
      ? "bg-emerald-50 text-emerald-600"
      : report.successRate >= 65
        ? "bg-amber-50 text-amber-600"
        : "bg-rose-50 text-rose-600";

  return (
    <tr className="transition hover:bg-gray-50">
      <td className="px-5 py-4">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          {report.className}
        </span>
      </td>

      <td className="px-5 py-4 font-medium text-gray-900">
        {report.teacher}
      </td>

      <td className="px-5 py-4 text-gray-600">
        {report.studentCount} Öğrenci
      </td>

      <td className="px-5 py-4">
        <span className="font-semibold text-gray-900">%{report.average}</span>
      </td>

      <td className="px-5 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${successRateClass}`}
        >
          %{report.successRate}
        </span>
      </td>

      <td className="px-5 py-4 text-right">
        <Button size="sm" variant="outline">
          Detaylı Analiz
        </Button>
      </td>
    </tr>
  );
}

export default PrincipalReportTableRow;