import PageHeader from "../../../components/common/PageHeader";
import StatCard from "../../../components/ui/StatCard";
import DataTable from "../../../components/ui/DataTable";

function TeacherDashboard() {
  const students = [
    { id: 1, fullName: "Ali Yıldız", average: 84, examAverage: 78, status: "Başarılı" },
    { id: 2, fullName: "Ayşe Kaya", average: 67, examAverage: 61, status: "Takip Edilmeli" },
    { id: 3, fullName: "Mehmet Can", average: 92, examAverage: 89, status: "Çok Başarılı" },
    { id: 4, fullName: "Zeynep Kara", average: 48, examAverage: 42, status: "Riskli" },
  ];

  const columns = [
    { key: "fullName", title: "Öğrenci" },
    {
      key: "average",
      title: "Ders Ort.",
      render: (row) => <span className="font-semibold">%{row.average}</span>,
    },
    {
      key: "examAverage",
      title: "Sınav Ort.",
      render: (row) => <span className="font-semibold">%{row.examAverage}</span>,
    },
    {
      key: "status",
      title: "Durum",
      render: (row) => (
        <span className="badge badge-info rounded-lg">
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Öğretmen Ana Sayfa"
        description="Sorumlu olduğunuz sınıfın öğrenci ve başarı özeti"
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Sorumlu Sınıf"
          value="9-A"
          icon="🏫"
          description="Öğretmenin sınıfı"
          color="primary"
        />

        <StatCard
          title="Toplam Öğrenci"
          value="32"
          icon="🎓"
          description="Sınıftaki öğrenci sayısı"
          color="info"
        />

        <StatCard
          title="Sınıf Ortalaması"
          value="%74"
          icon="📊"
          description="Ders başarı ortalaması"
          color="success"
        />

        <StatCard
          title="Takip Öğrencisi"
          value="2"
          icon="⚠️"
          description="Yakından takip gereken öğrenci"
          color="warning"
        />
      </div>

      <div className="mt-6 card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Sınıf Öğrenci Özeti</h2>
          <p className="mb-4 text-sm text-base-content/50">
            Sorumlu olduğunuz sınıftaki öğrencilerin son durumu
          </p>

          <DataTable columns={columns} data={students} />
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;