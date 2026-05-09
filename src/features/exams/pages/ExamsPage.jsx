import Toast from "../../../components/ui/Toast";
import ExamEditableTable from "../components/ExamEditableTable";
import ExamStatsCards from "../components/ExamStatsCards";
import ExamsPageHeader from "../components/ExamsPageHeader";
import { getExamStats } from "../constants/examTableColumns";
import { useExamsPage } from "../hooks/useExamsPage";

function ExamsPage() {
  const {
    isClassroomMode,
    isLoading,
    classroomName,
    selectedLessonId,
    setSelectedLessonId,
    lessonOptions,
    filteredRows,
    search,
    setSearch,
    isSavingAll,
    rowErrors,
    toast,
    handleGradeChange,
    handleSaveAllGrades,
    handleResetRow,
    handleBackToClasses,
    handleExportExamsPdf,
  } = useExamsPage();

  const stats = getExamStats(filteredRows);

  if (isLoading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-base-300 bg-base-100 px-8 py-7 shadow-sm">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="text-sm text-base-content/60">
            Not giriş verileri yükleniyor...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ExamsPageHeader
        isClassroomMode={isClassroomMode}
        classroomName={classroomName}
        lessonOptions={lessonOptions}
        selectedLessonId={selectedLessonId}
        setSelectedLessonId={setSelectedLessonId}
        onBack={handleBackToClasses}
        onExport={handleExportExamsPdf}
      />

      <ExamStatsCards items={stats} />

      <ExamEditableTable
        rows={filteredRows}
        search={search}
        setSearch={setSearch}
        selectedLessonId={selectedLessonId}
        isClassroomMode={isClassroomMode}
        isSavingAll={isSavingAll}
        rowErrors={rowErrors}
        onGradeChange={handleGradeChange}
        onSaveAll={handleSaveAllGrades}
        onReset={handleResetRow}
      />

      {toast.message && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default ExamsPage;