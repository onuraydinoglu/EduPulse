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
    examRows,
    filteredRows,
    search,
    setSearch,
    savingRows,
    rowErrors,
    toast,
    handleGradeChange,
    handleSaveRow,
    handleResetRow,
    handleBackToClasses,
    handleExportExamsPdf,
  } = useExamsPage();

  if (isLoading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
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

      <ExamStatsCards items={getExamStats(examRows)} />

      <ExamEditableTable
        rows={filteredRows}
        search={search}
        setSearch={setSearch}
        selectedLessonId={selectedLessonId}
        isClassroomMode={isClassroomMode}
        savingRows={savingRows}
        rowErrors={rowErrors}
        onGradeChange={handleGradeChange}
        onSave={handleSaveRow}
        onReset={handleResetRow}
      />

      {toast.message && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default ExamsPage;