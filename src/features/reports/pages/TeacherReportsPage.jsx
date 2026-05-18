import {
  ArrowDownTrayIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import Button from "../../../components/ui/Button";
import StatCard from "../../../components/ui/StatCard";
import TeacherStudentReportTable from "../components/TeacherStudentReportTable";
import { teacherReportStatusOptions } from "../constants/reportConstants";
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
    isLoading,
    toast,
    handleExportTeacherReport,
    handlePrepareParentReport,
  } = useTeacherReportsPage();

  return (
    <div className="space-y-6">
      {toast.message && (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm font-medium ${toast.type === "error"
              ? "border-rose-200 bg-rose-50 text-rose-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
        >
          {toast.message}
        </div>
      )}

      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              Öğretmen Raporları
            </p>

            <h1 className="mt-2 flex items-center gap-3 text-2xl font-bold text-gray-900">
              <ChartBarIcon className="h-7 w-7 text-blue-600" />
              Sınıf Performans Raporu
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Kendi sınıfınıza ait öğrenci ve başarı raporlarını takip edin
            </p>
          </div>

          <Button
            type="button"
            variant="primary"
            onClick={handleExportTeacherReport}
            disabled={isLoading}
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
            {teacherClass.className} Raporu Dışa Aktar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {teacherClass.className} Sınıfı Öğrenci Raporu
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Sorumlu olduğunuz sınıftaki öğrenci performansları
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <Button
              type="button"
              variant="secondary"
              onClick={handlePrepareParentReport}
              disabled={isLoading}
            >
              {teacherClass.className} Veli Raporu Hazırla
            </Button>

            <div className="relative w-full md:w-72">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={studentSearch}
                onChange={(event) => setStudentSearch(event.target.value)}
                placeholder="Öğrenci veya kulüp ara..."
                className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
              />
            </div>

            <select
              value={studentStatus}
              onChange={(event) => setStudentStatus(event.target.value)}
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 md:w-56"
            >
              {teacherReportStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          {isLoading ? (
            <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-10 text-center text-sm font-medium text-gray-500">
              Öğretmen raporları yükleniyor...
            </div>
          ) : (
            <TeacherStudentReportTable
              students={filteredStudents}
              className={teacherClass.className}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherReportsPage;