import {
  AcademicCapIcon,
  BuildingOffice2Icon,
  CheckCircleIcon,
  ChartBarIcon,
  PlusIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

import StatCard from "../../../components/ui/StatCard";
import DataTable from "../../../components/ui/DataTable";
import Button from "../../../components/ui/Button";

function AdminDashboard() {
  const schools = [
    { id: 1, name: "Atatürk Anadolu Lisesi", city: "Samsun", plan: "Satın Alındı", status: "Aktif" },
    { id: 2, name: "Cumhuriyet Fen Lisesi", city: "Ankara", plan: "Deneme Sürümü", status: "Aktif" },
    { id: 3, name: "19 Mayıs Lisesi", city: "İstanbul", plan: "Satın Alındı", status: "Aktif" },
  ];

  const columns = [
    {
      key: "name",
      title: "Okul",
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-400">{row.city}</p>
        </div>
      ),
    },
    {
      key: "plan",
      title: "Paket",
      render: (row) => (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${row.plan === "Satın Alındı"
            ? "bg-blue-50 text-blue-600"
            : "bg-amber-50 text-amber-600"
            }`}
        >
          {row.plan}
        </span>
      ),
    },
    {
      key: "status",
      title: "Durum",
      render: (row) => (
        <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
          {row.status}
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
              EduPulse Yönetim Paneli
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950">
              Okul yönetimini sade ve düzenli takip edin.
            </h1>

            <p className="mt-1 max-w-xl text-sm text-gray-500">
              Okullar, öğretmenler, öğrenciler ve lisans durumları için temiz bir
              yönetim ekranı.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button>
              <PlusIcon className="h-5 w-5" />
              Okul Ekle
            </Button>

            <Button variant="outline">
              Raporlar
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Okul"
          value="12"
          description="Kayıtlı okul"
          color="primary"
          icon={<BuildingOffice2Icon className="h-5 w-5" />}
        />

        <StatCard
          title="Öğrenci"
          value="1.284"
          description="Aktif öğrenci"
          color="info"
          icon={<UserGroupIcon className="h-5 w-5" />}
        />

        <StatCard
          title="Öğretmen"
          value="86"
          description="Aktif öğretmen"
          color="success"
          icon={<AcademicCapIcon className="h-5 w-5" />}
        />

        <StatCard
          title="Durum"
          value="Aktif"
          description="Sistem çalışıyor"
          color="warning"
          icon={<CheckCircleIcon className="h-5 w-5" />}
        />
      </div>

      <section className="radius-card overflow-hidden border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <ChartBarIcon className="h-5 w-5 text-blue-600" />

            <h2 className="text-lg font-semibold tracking-tight text-gray-950">
              Okul Lisans Durumları
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Sistemdeki okulların güncel paket durumu
          </p>
        </div>

        <DataTable columns={columns} data={schools} />
      </section>
    </div>
  );
}

export default AdminDashboard;