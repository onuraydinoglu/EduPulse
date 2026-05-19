import { useNavigate } from "react-router-dom";

import Toast from "../../../components/ui/Toast";
import PrincipalReportSection from "../components/PrincipalReportSection";
import ReportPageHeader from "../components/ReportPageHeader";
import ReportStatsCards from "../components/ReportStatsCards";
import { usePrincipalReportsPage } from "../hooks/usePrincipalReportsPage";

function PrincipalReportsPage() {
  const navigate = useNavigate();

  const {
    gradeFilter,
    setGradeFilter,
    filteredClassReports,
    stats,
    isLoading,
    toast,
    handleExportPrincipalReport,
  } = usePrincipalReportsPage();

  const handleOpenClassReport = (report) => {
    if (!report?.id) return;

    navigate(`/dashboard/teacher-reports?classId=${report.id}`, {
      state: {
        selectedClassReport: report,
      },
    });
  };

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

      {isLoading ? (
        <section className="radius-card border border-gray-200 bg-white p-6 text-sm text-gray-500">
          Müdür raporları yükleniyor...
        </section>
      ) : (
        <PrincipalReportSection
          reports={filteredClassReports}
          gradeFilter={gradeFilter}
          setGradeFilter={setGradeFilter}
          onOpenClassReport={handleOpenClassReport}
        />
      )}

      {toast.message && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default PrincipalReportsPage;