import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";

function TeacherStudentReportModal({ id, student, className }) {
  const lessons = student.lessons || [];
  const trialExams = student.trialExams || [];

  const getGrade = (grades, index) => {
    return grades?.[index] ?? "-";
  };

  const downloadStudentReport = () => {
    const lessonText = lessons
      .map(
        (lesson) => `
${lesson.name}
- Sınav 1: ${getGrade(lesson.examGrades, 0)}
- Sınav 2: ${getGrade(lesson.examGrades, 1)}
- Proje: ${lesson.projectGrade ?? "-"}
- Sınıf İçi 1: ${getGrade(lesson.activityGrades, 0)}
- Sınıf İçi 2: ${getGrade(lesson.activityGrades, 1)}
- Sınıf İçi 3: ${getGrade(lesson.activityGrades, 2)}
`
      )
      .join("\n");

    const trialExamText = trialExams
      .map(
        (exam) => `
${exam.name}
- Net: ${exam.net ?? "-"}
`
      )
      .join("\n");

    const reportContent = `
ÖĞRENCİ AKADEMİK RAPORU

Öğrenci: ${student.fullName}
Sınıf: ${className}
Kulüp: ${student.club}
Durum: ${student.status}

DERS NOTLARI
${lessonText || "Ders notu bulunmuyor."}

DENEME SINAVLARI
${trialExamText || "Deneme sınavı sonucu bulunmuyor."}

GENEL DEĞERLENDİRME
${student.teacherNote || "Değerlendirme bulunmuyor."}
`;

    const blob = new Blob([reportContent.trim()], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${student.fullName}-akademik-rapor.txt`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Modal
      id={id}
      title={`${student.fullName} Akademik Raporu`}
      showDescription={false}
      footer={
        <>
          <form method="dialog">
            <Button variant="ghost">Kapat</Button>
          </form>

          <Button onClick={downloadStudentReport}>
            <ArrowDownTrayIcon className="h-5 w-5" />
            Raporu İndir
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <section>
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-900">
              Sınav Notları
            </h4>
            <p className="mt-1 text-xs text-gray-500">
              Ders bazlı sınav, proje ve sınıf içi notları
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-4 py-3">Ders</th>
                  <th className="px-4 py-3">Sınav 1</th>
                  <th className="px-4 py-3">Sınav 2</th>
                  <th className="px-4 py-3">Proje</th>
                  <th className="px-4 py-3">Sınıf İçi 1</th>
                  <th className="px-4 py-3">Sınıf İçi 2</th>
                  <th className="px-4 py-3">Sınıf İçi 3</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {lessons.length > 0 ? (
                  lessons.map((lesson) => (
                    <tr key={lesson.name}>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {lesson.name}
                      </td>
                      <td className="px-4 py-3">{getGrade(lesson.examGrades, 0)}</td>
                      <td className="px-4 py-3">{getGrade(lesson.examGrades, 1)}</td>
                      <td className="px-4 py-3">{lesson.projectGrade ?? "-"}</td>
                      <td className="px-4 py-3">{getGrade(lesson.activityGrades, 0)}</td>
                      <td className="px-4 py-3">{getGrade(lesson.activityGrades, 1)}</td>
                      <td className="px-4 py-3">{getGrade(lesson.activityGrades, 2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-6 text-center text-sm text-gray-500"
                    >
                      Ders notu bulunmuyor.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-900">
              Deneme Sınav Netleri
            </h4>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-4 py-3">Deneme Sınavı</th>
                  <th className="px-4 py-3">Net</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {trialExams.length > 0 ? (
                  trialExams.map((exam) => (
                    <tr key={exam.name}>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {exam.name}
                      </td>
                      <td className="px-4 py-3 font-semibold text-blue-600">
                        {exam.net ?? "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="2"
                      className="px-4 py-6 text-center text-sm text-gray-500"
                    >
                      Deneme sınavı sonucu bulunmuyor.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-900">
            Genel Değerlendirme
          </p>

          <p className="mt-1 text-sm text-gray-600">
            {student.teacherNote || "Değerlendirme bulunmuyor."}
          </p>
        </section>
      </div>
    </Modal>
  );
}

export default TeacherStudentReportModal;