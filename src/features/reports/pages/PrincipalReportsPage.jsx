import { useMemo, useState } from "react";
import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

import StatCard from "../../../components/ui/StatCard";
import DataTable from "../../../components/ui/DataTable";
import Button from "../../../components/ui/Button";
import FilterSelect from "../../../components/ui/FilterSelect";

function PrincipalReportsPage() {
  const [gradeFilter, setGradeFilter] = useState("all");

  const classReports = [
    {
      id: 1,
      className: "9-A",
      grade: "9",
      teacher: "Ayşe Demir",
      studentCount: 32,
      average: 74,
      successRate: 68,
    },
    {
      id: 2,
      className: "9-B",
      grade: "9",
      teacher: "Mehmet Yıldız",
      studentCount: 29,
      average: 77,
      successRate: 71,
    },
    {
      id: 3,
      className: "10-B",
      grade: "10",
      teacher: "Murat Çelik",
      studentCount: 28,
      average: 81,
      successRate: 76,
    },
    {
      id: 4,
      className: "10-C",
      grade: "10",
      teacher: "Zeynep Kaya",
      studentCount: 31,
      average: 79,
      successRate: 73,
    },
    {
      id: 5,
      className: "11-A",
      grade: "11",
      teacher: "Elif Şahin",
      studentCount: 30,
      average: 69,
      successRate: 62,
    },
    {
      id: 6,
      className: "11-D",
      grade: "11",
      teacher: "Ahmet Demir",
      studentCount: 27,
      average: 72,
      successRate: 66,
    },
    {
      id: 7,
      className: "12-C",
      grade: "12",
      teacher: "Ayşe Demir",
      studentCount: 26,
      average: 88,
      successRate: 84,
    },
    {
      id: 8,
      className: "12-A",
      grade: "12",
      teacher: "Murat Çelik",
      studentCount: 25,
      average: 85,
      successRate: 80,
    },
  ];

  const filteredClassReports = useMemo(() => {
    if (gradeFilter === "all") return classReports;

    return classReports.filter((item) => item.grade === gradeFilter);
  }, [gradeFilter]);

  const columns = [
    {
      key: "className",
      title: "Sınıf",
      render: (row) => (
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          {row.className}
        </span>
      ),
    },
    {
      key: "teacher",
      title: "Sorumlu Öğretmen",
      render: (row) => (
        <p className="font-medium text-gray-900">{row.teacher}</p>
      ),
    },
    {
      key: "studentCount",
      title: "Öğrenci Sayısı",
      render: (row) => (
        <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
          {row.studentCount} Öğrenci
        </span>
      ),
    },
    {
      key: "average",
      title: "Sınıf Ortalaması",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-2 w-28 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gradient-premium"
              style={{ width: `${row.average}%` }}
            />
          </div>

          <span className="text-sm font-semibold text-gray-700">
            %{row.average}
          </span>
        </div>
      ),
    },
    {
      key: "successRate",
      title: "Başarı Oranı",
      render: (row) => (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${row.successRate >= 75
            ? "bg-emerald-50 text-emerald-600"
            : row.successRate >= 65
              ? "bg-amber-50 text-amber-600"
              : "bg-rose-50 text-rose-600"
            }`}
        >
          %{row.successRate}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <section className="radius-card border border-gray-200 bg-white px-6 py-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Rapor Yönetimi
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950">
              Müdür Raporları
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Okulunuza ait genel başarı ve sınıf performans raporlarını takip edin
            </p>
          </div>

          <Button>
            <ArrowDownTrayIcon className="h-5 w-5" />
            Okul Raporu Dışa Aktar
          </Button>
        </div>
      </section>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Okul Genel Başarı"
          value="%78"
          icon={<ArrowTrendingUpIcon className="h-5 w-5" />}
          description="Tüm sınıfların ortalaması"
          color="primary"
        />

        <StatCard
          title="Toplam Öğrenci"
          value="228"
          icon={<AcademicCapIcon className="h-5 w-5" />}
          description="Okuldaki toplam öğrenci"
          color="info"
        />

        <StatCard
          title="En Başarılı Sınıf"
          value="12-C"
          icon={<TrophyIcon className="h-5 w-5" />}
          description="%88 sınıf ortalaması"
          color="success"
        />

        <StatCard
          title="Riskli Öğrenci"
          value="1"
          icon={<ExclamationTriangleIcon className="h-5 w-5" />}
          description="Takip edilmesi gereken öğrenci"
          color="warning"
        />
      </div>

      <section className="radius-card overflow-hidden border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ChartBarIcon className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold tracking-tight text-gray-950">
                Okul Sınıf Performansları
              </h2>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              Sınıfları 9, 10, 11 ve 12. sınıf seviyesine göre filtreleyin
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <FilterSelect
              value={gradeFilter}
              onChange={setGradeFilter}
              options={[
                { label: "Tüm Sınıflar", value: "all" },
                { label: "9. Sınıflar", value: "9" },
                { label: "10. Sınıflar", value: "10" },
                { label: "11. Sınıflar", value: "11" },
                { label: "12. Sınıflar", value: "12" },
              ]}
              className="w-full sm:w-44"
            />

            <Button variant="outline" size="sm">
              Detaylı Analiz
            </Button>
          </div>
        </div>

        <DataTable columns={columns} data={filteredClassReports} />
      </section>
    </div>
  );
}

export default PrincipalReportsPage;