import { useMemo } from "react";

import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import TeacherStudentReportModal from "./TeacherStudentReportModal";
import StudentDetailModal from "../../students/components/StudentDetailModal";

function TeacherStudentReportTableRow({ student, className }) {
  const detailModalId = `student_detail_modal_${student.id}`;
  const reportModalId = `student_report_modal_${student.id}`;

  const studentDetailData = useMemo(() => {
    const nameParts = student.fullName?.split(" ") || [];

    return {
      ...student,
      firstName: student.firstName || nameParts[0] || "",
      lastName: student.lastName || nameParts.slice(1).join(" ") || "",
      className,
      schoolNumber: student.schoolNumber || "-",
      studentPhone: student.studentPhone || "-",
      parentName: student.parentName || "-",
      parentPhone: student.parentPhone || "-",
      classTeacher: student.classTeacher || "-",
    };
  }, [student, className]);

  const getStatusClass = (status) => {
    if (status === "Çok Başarılı") return "bg-emerald-50 text-emerald-600";
    if (status === "Başarılı") return "bg-blue-50 text-blue-600";
    if (status === "Takip Edilmeli") return "bg-amber-50 text-amber-600";
    if (status === "Riskli") return "bg-rose-50 text-rose-600";

    return "bg-gray-100 text-gray-600";
  };

  return (
    <>
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
          <span className="inline-flex rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600">
            {student.trialExamAverage} Net
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
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                document.getElementById(detailModalId).showModal()
              }
            >
              Detay
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={() =>
                document.getElementById(reportModalId).showModal()
              }
            >
              Rapor
            </Button>
          </div>
        </td>
      </tr>

      <Modal
        id={detailModalId}
        title="Öğrenci Detayları"
        showDescription={false}
        footer={
          <form method="dialog">
            <Button variant="ghost">Kapat</Button>
          </form>
        }
      >
        <StudentDetailModal student={studentDetailData} />
      </Modal>

      <TeacherStudentReportModal
        id={reportModalId}
        student={student}
        className={className}
      />
    </>
  );
}

export default TeacherStudentReportTableRow;