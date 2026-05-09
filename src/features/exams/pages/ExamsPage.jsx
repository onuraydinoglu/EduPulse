import Toast from "../../../components/ui/Toast";

import ExamEditableTable from "../components/ExamEditableTable";
import ExamStatsCards from "../components/ExamStatsCards";
import ExamsPageHeader from "../components/ExamsPageHeader";

import { getExamStats } from "../constants/examTableColumns";
import { useExamsPage } from "../hooks/useExamsPage";

function ExamsPage() {
  const {
    selectedLessonId,
    setSelectedLessonId,
    classroomFilter,
    setClassroomFilter,
    search,
    setSearch,
    lessonOptions,
    classroomOptions,
    examRows,
    filteredRows,
    savingRows,
    rowErrors,
    toast,
    handleGradeChange,
    handleSaveRow,
    handleResetRow,
    handleExportExamsPdf,
  } = useExamsPage();

  return (
    <div className="space-y-6">
      <ExamsPageHeader onExport={handleExportExamsPdf} />

      <ExamStatsCards items={getExamStats(examRows)} />

      <ExamEditableTable
        rows={filteredRows}
        search={search}
        setSearch={setSearch}
        selectedLessonId={selectedLessonId}
        setSelectedLessonId={setSelectedLessonId}
        lessonOptions={lessonOptions}
        classroomFilter={classroomFilter}
        setClassroomFilter={setClassroomFilter}
        classroomOptions={classroomOptions}
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