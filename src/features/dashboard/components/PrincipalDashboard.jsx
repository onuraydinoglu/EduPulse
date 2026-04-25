import PageHeader from "../../../components/common/PageHeader";
import StatCard from "../../../components/ui/StatCard";
import DataTable from "../../../components/ui/DataTable";

function PrincipalDashboard() {
  const classes = [
    { id: 1, className: "9-A", teacher: "Ayşe Demir", studentCount: 32, average: 74 },
    { id: 2, className: "10-B", teacher: "Murat Çelik", studentCount: 28, average: 81 },
    { id: 3, className: "11-A", teacher: "Elif Şahin", studentCount: 30, average: 69 },
    { id: 4, className: "12-C", teacher: "Ayşe Demir", studentCount: 26, average: 88 },
  ];

  const columns = [
    { key: "className", title: "Sınıf" },
    { key: "teacher", title: "Öğretmen" },
    { key: "studentCount", title: "Öğrenci" },
    {
      key: "average",
      title: "Ortalama",
      render: (row) => (
        <span className="font-semibold">%{row.average}</span>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Müdür Ana Sayfa"
        description="Okulunuzdaki öğretmen, öğrenci ve sınıf başarı durumları"
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Toplam Öğretmen"
          value="24"
          icon="👨‍🏫"
          description="Okuldaki öğretmen sayısı"
          color="primary"
        />

        <StatCard
          title="Toplam Öğrenci"
          value="116"
          icon="🎓"
          description="Okuldaki öğrenci sayısı"
          color="info"
        />

        <StatCard
          title="Aktif Sınıf"
          value="4"
          icon="🏫"
          description="Takip edilen sınıf sayısı"
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

      <div className="mt-6 grid gap-5 xl:grid-cols-3">
        <div className="card border border-base-300 bg-base-100 shadow-sm xl:col-span-2">
          <div className="card-body">
            <h2 className="card-title">Sınıf Performansları</h2>
            <p className="mb-4 text-sm text-base-content/50">
              Okulunuzdaki sınıfların başarı durumu
            </p>

            <DataTable columns={columns} data={classes} />
          </div>
        </div>

        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Son Okul Aktiviteleri</h2>

            <div className="mt-4 space-y-4">
              {[
                "Yeni öğretmen kaydı oluşturuldu",
                "12-C sınıf raporu incelendi",
                "Robotik kulübüne yeni öğrenci eklendi",
                "10-B sınav ortalaması güncellendi",
              ].map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary"></div>
                  <p className="text-sm text-base-content/70">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrincipalDashboard;