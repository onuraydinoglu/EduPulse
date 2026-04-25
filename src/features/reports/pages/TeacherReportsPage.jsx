import { useMemo, useState } from "react";
import PageHeader from "../../../components/common/PageHeader";
import PageToolbar from "../../../components/common/PageToolbar";
import StatCard from "../../../components/ui/StatCard";
import DataTable from "../../../components/ui/DataTable";
import Button from "../../../components/ui/Button";

function TeacherReportsPage() {
  const teacherClass = {
    className: "9-A",
    studentCount: 32,
    average: 74,
    successRate: 68,
  };

  const [studentSearch, setStudentSearch] = useState("");
  const [studentStatus, setStudentStatus] = useState("all");

  const students = [
    {
      id: 1,
      fullName: "Ali Yıldız",
      className: "9-A",
      average: 84,
      examAverage: 78,
      projectCount: 3,
      club: "Robotik",
      status: "Başarılı",
    },
    {
      id: 2,
      fullName: "Ayşe Kaya",
      className: "9-A",
      average: 67,
      examAverage: 61,
      projectCount: 1,
      club: "Müzik",
      status: "Takip Edilmeli",
    },
    {
      id: 3,
      fullName: "Mehmet Can",
      className: "9-A",
      average: 92,
      examAverage: 89,
      projectCount: 4,
      club: "Satranç",
      status: "Çok Başarılı",
    },
    {
      id: 4,
      fullName: "Zeynep Kara",
      className: "9-A",
      average: 48,
      examAverage: 42,
      projectCount: 0,
      club: "Yok",
      status: "Riskli",
    },
  ];

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.fullName.toLowerCase().includes(studentSearch.toLowerCase()) ||
        student.club.toLowerCase().includes(studentSearch.toLowerCase());

      const matchesStatus =
        studentStatus === "all" || student.status === studentStatus;

      return matchesSearch && matchesStatus;
    });
  }, [studentSearch, studentStatus]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Çok Başarılı":
        return "badge-success";
      case "Başarılı":
        return "badge-info";
      case "Takip Edilmeli":
        return "badge-warning";
      case "Riskli":
        return "badge-error";
      default:
        return "badge-neutral";
    }
  };

  const studentColumns = [
    {
      key: "fullName",
      title: "Öğrenci",
      render: (row) => (
        <div>
          <p className="font-semibold">{row.fullName}</p>
          <p className="text-xs text-base-content/50">
            {teacherClass.className} · {row.club}
          </p>
        </div>
      ),
    },
    {
      key: "average",
      title: "Ders Ort.",
      render: (row) => (
        <div className="flex items-center gap-3">
          <progress
            className="progress progress-primary w-24"
            value={row.average}
            max="100"
          ></progress>
          <span className="text-sm font-semibold">%{row.average}</span>
        </div>
      ),
    },
    {
      key: "examAverage",
      title: "Sınav Ort.",
      render: (row) => (
        <span className="font-semibold">%{row.examAverage}</span>
      ),
    },
    {
      key: "projectCount",
      title: "Proje",
      render: (row) => (
        <span className="font-semibold">{row.projectCount}</span>
      ),
    },
    {
      key: "status",
      title: "Durum",
      render: (row) => (
        <span className={`badge rounded-lg ${getStatusBadgeClass(row.status)}`}>
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Öğretmen Raporları"
        description="Öğretmenin kendi sınıfına ait öğrenci ve başarı raporu"
      >
        <Button>
          {teacherClass.className} Raporu Dışa Aktar
        </Button>
      </PageHeader>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Sorumlu Sınıf"
          value={teacherClass.className}
          icon="🏫"
          description="Öğretmenin kendi sınıfı"
          color="primary"
        />

        <StatCard
          title="Toplam Öğrenci"
          value={teacherClass.studentCount}
          icon="🎓"
          description="Sınıftaki öğrenci sayısı"
          color="info"
        />

        <StatCard
          title="Sınıf Ortalaması"
          value={`%${teacherClass.average}`}
          icon="📊"
          description="Ders başarı ortalaması"
          color="success"
        />

        <StatCard
          title="Başarı Oranı"
          value={`%${teacherClass.successRate}`}
          icon="✅"
          description="Genel başarı yüzdesi"
          color="warning"
        />
      </div>

      <div className="mt-6 card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="mb-4 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
            <div>
              <h2 className="card-title">
                {teacherClass.className} Sınıfı Öğrenci Raporu
              </h2>
              <p className="text-sm text-base-content/50">
                Öğretmenin sorumlu olduğu sınıftaki öğrenci performansları
              </p>
            </div>

            <Button variant="outline" size="sm">
              {teacherClass.className} Veli Raporu Hazırla
            </Button>
          </div>

          <PageToolbar
            searchValue={studentSearch}
            onSearchChange={setStudentSearch}
            searchPlaceholder="Öğrenci veya kulüp ara..."
            filterValue={studentStatus}
            onFilterChange={setStudentStatus}
            filterOptions={[
              { label: "Tüm Durumlar", value: "all" },
              { label: "Çok Başarılı", value: "Çok Başarılı" },
              { label: "Başarılı", value: "Başarılı" },
              { label: "Takip Edilmeli", value: "Takip Edilmeli" },
              { label: "Riskli", value: "Riskli" },
            ]}
          />

          <DataTable
            columns={studentColumns}
            data={filteredStudents}
            actions={() => (
              <div className="flex justify-end gap-2">
                <Button size="sm" variant="outline">
                  Detay
                </Button>

                <Button size="sm" variant="ghost">
                  Rapor
                </Button>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default TeacherReportsPage;