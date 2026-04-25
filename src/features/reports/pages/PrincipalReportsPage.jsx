import { useMemo, useState } from "react";
import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

import Button from "../../../components/ui/Button";
import FilterSelect from "../../../components/ui/FilterSelect";
import StatCard from "../../../components/ui/StatCard";
import PrincipalReportTable from "../components/PrincipalReportTable";

function PrincipalReportsPage() {
  const [gradeFilter, setGradeFilter] = useState("all");

  const schoolInfo = {
    teacherCount: 24,
    studentCount: 228,
    classCount: 8,
    clubCount: 6,
  };

  const classReports = [
    { id: 1, className: "9-A", grade: "9", teacher: "Ayşe Demir", studentCount: 32, average: 74, successRate: 68 },
    { id: 2, className: "9-B", grade: "9", teacher: "Mehmet Yıldız", studentCount: 29, average: 77, successRate: 71 },
    { id: 3, className: "10-B", grade: "10", teacher: "Murat Çelik", studentCount: 28, average: 81, successRate: 76 },
    { id: 4, className: "10-C", grade: "10", teacher: "Zeynep Kaya", studentCount: 31, average: 79, successRate: 73 },
    { id: 5, className: "11-A", grade: "11", teacher: "Elif Şahin", studentCount: 30, average: 69, successRate: 62 },
    { id: 6, className: "11-D", grade: "11", teacher: "Ahmet Demir", studentCount: 27, average: 72, successRate: 66 },
    { id: 7, className: "12-C", grade: "12", teacher: "Ayşe Demir", studentCount: 26, average: 88, successRate: 84 },
    { id: 8, className: "12-A", grade: "12", teacher: "Murat Çelik", studentCount: 25, average: 85, successRate: 80 },
  ];

  const filteredClassReports = useMemo(() => {
    if (gradeFilter === "all") return classReports;
    return classReports.filter((item) => item.grade === gradeFilter);
  }, [gradeFilter]);

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
              Okulunuza ait genel başarı ve sınıf performans raporlarını takip edin.
            </p>
          </div>

          <Button>
            <ArrowDownTrayIcon className="h-5 w-5" />
            Okul Raporu Dışa Aktar
          </Button>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Toplam Öğretmen"
          value={schoolInfo.teacherCount}
          description="Okuldaki öğretmen sayısı"
          color="primary"
          icon={UserGroupIcon}
        />

        <StatCard
          title="Toplam Öğrenci"
          value={schoolInfo.studentCount}
          description="Okuldaki öğrenci sayısı"
          color="info"
          icon={AcademicCapIcon}
        />

        <StatCard
          title="Aktif Sınıf"
          value={schoolInfo.classCount}
          description="Takip edilen sınıf sayısı"
          color="success"
          icon={BuildingOffice2Icon}
        />

        <StatCard
          title="Kulüpler"
          value={schoolInfo.clubCount}
          description="Okuldaki aktif kulüp sayısı"
          color="warning"
          icon={UserPlusIcon}
        />
      </div>

      <section className="radius-card overflow-hidden border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-gray-950">
              Okul Sınıf Performansları
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Sınıfları 9, 10, 11 ve 12. sınıf seviyesine göre filtreleyin.
            </p>
          </div>

          <FilterSelect
            value={gradeFilter}
            onChange={setGradeFilter}
            options={[
              { value: "all", label: "Tüm Sınıflar" },
              { value: "9", label: "9. Sınıflar" },
              { value: "10", label: "10. Sınıflar" },
              { value: "11", label: "11. Sınıflar" },
              { value: "12", label: "12. Sınıflar" },
            ]}
          />
        </div>

        <PrincipalReportTable reports={filteredClassReports} />
      </section>
    </div>
  );
}

export default PrincipalReportsPage;