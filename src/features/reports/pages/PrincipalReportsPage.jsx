import PrincipalReportSection from "../components/PrincipalReportSection";
import ReportPageHeader from "../components/ReportPageHeader";
import ReportStatsCards from "../components/ReportStatsCards";
import { usePrincipalReportsPage } from "../hooks/usePrincipalReportsPage";

function PrincipalReportsPage() {
  const {
    gradeFilter,
    setGradeFilter,
    filteredClassReports,
    stats,
    handleExportPrincipalReport,
  } = usePrincipalReportsPage();

  return (
    <div className="space-y-6">
      <ReportPageHeader
        eyebrow="Rapor Yönetimi"
        title="Müdür Raporları"
        description="Okulunuza ait genel başarı ve sınıf performans raporlarını takip edin."
        buttonText="Okul Raporu Dışa Aktar"
        onExport={handleExportPrincipalReport}
      />

      <ReportStatsCards items={stats} />

      <PrincipalReportSection
        reports={filteredClassReports}
        gradeFilter={gradeFilter}
        setGradeFilter={setGradeFilter}
      />
    </div>
  );
}

export default PrincipalReportsPage;