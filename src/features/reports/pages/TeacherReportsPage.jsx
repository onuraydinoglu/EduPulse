import ReportPageHeader from "../components/ReportPageHeader";
import ReportStatsCards from "../components/ReportStatsCards";
import TeacherReportSection from "../components/TeacherReportSection";
import { useTeacherReportsPage } from "../hooks/useTeacherReportsPage";

function TeacherReportsPage() {
  const {
    teacherClass,
    studentSearch,
    setStudentSearch,
    studentStatus,
    setStudentStatus,
    filteredStudents,
    stats,
    handleExportTeacherReport,
    handlePrepareParentReport,
  } = useTeacherReportsPage();

  return (
    <div className="space-y-6">
      <ReportPageHeader
        eyebrow="Öğretmen Raporları"
        title="Sınıf Performans Raporu"
        description="Kendi sınıfınıza ait öğrenci ve başarı raporlarını takip edin"
        buttonText={`${teacherClass.className} Raporu Dışa Aktar`}
        onExport={handleExportTeacherReport}
      />

      <ReportStatsCards
        items={stats}
        className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
      />

      <TeacherReportSection
        teacherClass={teacherClass}
        students={filteredStudents}
        studentSearch={studentSearch}
        setStudentSearch={setStudentSearch}
        studentStatus={studentStatus}
        setStudentStatus={setStudentStatus}
        onPrepareParentReport={handlePrepareParentReport}
      />
    </div>
  );
}

export default TeacherReportsPage;