import { useMemo, useState } from "react";
import PageHeader from "../../../components/common/PageHeader";
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
    { key: "className", title: "Sınıf" },
    { key: "teacher", title: "Sorumlu Öğretmen" },
    { key: "studentCount", title: "Öğrenci Sayısı" },
    {
      key: "average",
      title: "Sınıf Ortalaması",
      render: (row) => (
        <div className="flex items-center gap-3">
          <progress
            className="progress progress-primary w-28"
            value={row.average}
            max="100"
          ></progress>
          <span className="text-sm font-semibold">%{row.average}</span>
        </div>
      ),
    },
    {
      key: "successRate",
      title: "Başarı Oranı",
      render: (row) => (
        <span className="font-semibold">%{row.successRate}</span>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Müdür Raporları"
        description="Müdürün kendi okuluna ait genel başarı ve sınıf raporları"
      >
        <Button>Okul Raporu Dışa Aktar</Button>
      </PageHeader>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Okul Genel Başarı"
          value="%78"
          icon="📈"
          description="Tüm sınıfların ortalaması"
          color="primary"
        />

        <StatCard
          title="Toplam Öğrenci"
          value="228"
          icon="🎓"
          description="Okuldaki toplam öğrenci"
          color="info"
        />

        <StatCard
          title="En Başarılı Sınıf"
          value="12-C"
          icon="🏆"
          description="%88 sınıf ortalaması"
          color="success"
        />

        <StatCard
          title="Riskli Öğrenci"
          value="1"
          icon="⚠️"
          description="Takip edilmesi gereken öğrenci"
          color="warning"
        />
      </div>

      <div className="mt-6 card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h2 className="card-title">Okul Sınıf Performansları</h2>
              <p className="text-sm text-base-content/50">
                Müdür sınıfları 9, 10, 11 ve 12. sınıf seviyesine göre filtreleyebilir.
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
        </div>
      </div>
    </div>
  );
}

export default PrincipalReportsPage;