import PageHeader from "../../../components/common/PageHeader";
import StatCard from "../../../components/ui/StatCard";
import DataTable from "../../../components/ui/DataTable";

function AdminDashboard() {
  const schools = [
    {
      id: 1,
      name: "Atatürk Anadolu Lisesi",
      city: "Samsun",
      plan: "Satın Alındı",
      status: "Aktif",
    },
    {
      id: 2,
      name: "Cumhuriyet Fen Lisesi",
      city: "Ankara",
      plan: "Deneme Sürümü",
      status: "Aktif",
    },
    {
      id: 3,
      name: "19 Mayıs Lisesi",
      city: "İstanbul",
      plan: "Satın Alındı",
      status: "Aktif",
    },
  ];

  const columns = [
    { key: "name", title: "Okul" },
    { key: "city", title: "Şehir" },
    {
      key: "plan",
      title: "Paket",
      render: (row) => (
        <span
          className={`badge rounded-lg ${row.plan === "Satın Alındı" ? "badge-success" : "badge-warning"
            }`}
        >
          {row.plan}
        </span>
      ),
    },
    { key: "status", title: "Durum" },
  ];

  return (
    <div>
      <PageHeader
        title="Admin Ana Sayfa"
        description="Sisteme kayıtlı okulların genel kullanım ve lisans durumu"
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Kayıtlı Okul"
          value="3"
          icon="🏫"
          description="Sistemdeki toplam okul"
          color="primary"
        />

        <StatCard
          title="Deneme Sürümü"
          value="1"
          icon="🧪"
          description="Trial kullanım yapan okul"
          color="warning"
        />

        <StatCard
          title="Satın Alan Okul"
          value="2"
          icon="💳"
          description="Aktif aboneliği olan okul"
          color="success"
        />

        <StatCard
          title="Aktif Okul"
          value="3"
          icon="✅"
          description="Sistemi aktif kullanan okul"
          color="info"
        />
      </div>

      <div className="mt-6 card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Okul Lisans Durumları</h2>
          <p className="mb-4 text-sm text-base-content/50">
            Okulların deneme ve satın alma durumları
          </p>

          <DataTable columns={columns} data={schools} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;