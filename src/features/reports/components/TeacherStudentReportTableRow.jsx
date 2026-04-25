import Button from "../../../components/ui/Button";

function TeacherStudentReportTableRow({ student, className }) {
  const getStatusClass = (status) => {
    if (status === "Çok Başarılı") return "bg-emerald-50 text-emerald-600";
    if (status === "Başarılı") return "bg-blue-50 text-blue-600";
    if (status === "Takip Edilmeli") return "bg-amber-50 text-amber-600";
    if (status === "Riskli") return "bg-rose-50 text-rose-600";

    return "bg-gray-100 text-gray-600";
  };

  return (
    <tr className="transition hover:bg-gray-50">
      <td className="px-5 py-4">
        <p className="font-medium text-gray-900">{student.fullName}</p>
        <p className="text-xs text-gray-400">
          {className} · {student.club}
        </p>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gradient-premium"
              style={{ width: `${student.average}%` }}
            />
          </div>

          <span className="text-sm font-semibold text-gray-700">
            %{student.average}
          </span>
        </div>
      </td>

      <td className="px-5 py-4">
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          %{student.examAverage}
        </span>
      </td>

      <td className="px-5 py-4">
        <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
          {student.projectCount}
        </span>
      </td>

      <td className="px-5 py-4">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
            student.status
          )}`}
        >
          {student.status}
        </span>
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="outline">
            Detay
          </Button>

          <Button size="sm" variant="ghost">
            Rapor
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default TeacherStudentReportTableRow;