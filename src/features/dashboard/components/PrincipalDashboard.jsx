import {
  AcademicCapIcon,
  BuildingOffice2Icon,
  ExclamationTriangleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import StatCard from "../../../components/ui/StatCard";

function ManagerDashboard() {
  const classPerformances = [
    { id: 1, className: "9-A", teacher: "Ayşe Demir", studentCount: 32, average: 74 },
    { id: 2, className: "10-B", teacher: "Murat Çelik", studentCount: 28, average: 81 },
    { id: 3, className: "11-A", teacher: "Elif Şahin", studentCount: 30, average: 69 },
    { id: 4, className: "12-C", teacher: "Ayşe Demir", studentCount: 26, average: 88 },
  ];

  const activities = [
    "Yeni öğretmen kaydı oluşturuldu",
    "12-C sınıf raporu incelendi",
    "Robotik kulübüne yeni öğrenci eklendi",
    "10-B sınav ortalaması güncellendi",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-gray-200 bg-white px-6 py-5 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-medium text-blue-600">Müdür Paneli</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950">
            Müdür Ana Sayfa
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Okulunuzdaki genel akademik ve yönetim özetleri
          </p>
        </div>

        <button className="btn-gradient rounded-2xl px-5 py-2.5 text-sm font-semibold">
          Raporları Gör
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Toplam Öğretmen"
          value="24"
          description="Okuldaki öğretmen sayısı"
          color="primary"
          icon={<UserGroupIcon className="h-5 w-5" />}
        />

        <StatCard
          title="Toplam Öğrenci"
          value="116"
          description="Okuldaki öğrenci sayısı"
          color="info"
          icon={<AcademicCapIcon className="h-5 w-5" />}
        />

        <StatCard
          title="Aktif Sınıf"
          value="4"
          description="Takip edilen sınıf sayısı"
          color="success"
          icon={<BuildingOffice2Icon className="h-5 w-5" />}
        />

        <StatCard
          title="Riskli Öğrenci"
          value="1"
          description="Takip edilmesi gereken öğrenci"
          color="warning"
          icon={<ExclamationTriangleIcon className="h-5 w-5" />}
        />
      </div>

      {/* Content */}
      <div className="grid gap-5 xl:grid-cols-[1.5fr_0.8fr]">
        {/* Table */}
        <section className="radius-card border border-gray-200 bg-white p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold tracking-tight text-gray-950">
              Sınıf Performansları
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Sınıfların genel başarı ortalamaları
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-medium">Sınıf</th>
                  <th className="px-5 py-4 font-medium">Öğretmen</th>
                  <th className="px-5 py-4 font-medium">Öğrenci</th>
                  <th className="px-5 py-4 font-medium">Ortalama</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {classPerformances.map((item) => (
                  <tr key={item.id} className="transition hover:bg-gray-50">
                    <td className="px-5 py-4 font-medium text-gray-900">
                      {item.className}
                    </td>
                    <td className="px-5 py-4 text-gray-600">{item.teacher}</td>
                    <td className="px-5 py-4 text-gray-600">
                      {item.studentCount}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                        %{item.average}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Activities */}
        <section className="radius-card border border-gray-200 bg-white p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold tracking-tight text-gray-950">
              Son Aktiviteler
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Okuldaki son sistem hareketleri
            </p>
          </div>

          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-2xl px-3 py-2.5 transition hover:bg-gray-50"
              >
                <span className="mt-1.5 h-2 w-2 rounded-full bg-gradient-premium" />
                <p className="text-sm text-gray-600">{activity}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ManagerDashboard;