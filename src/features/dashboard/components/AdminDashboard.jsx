import {
  AcademicCapIcon,
  BuildingOffice2Icon,
  CheckCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

import StatCard from "../../../components/ui/StatCard";
import DataTable from "../../../components/ui/DataTable";

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
          <p className="font-medium">{row.name}</p>
          <p className="text-xs text-base-content/45">{row.city}</p>
        </div>
      ),
    },
    {
      key: "plan",
      title: "Paket",
      render: (row) => (
        <span className="rounded-full bg-base-200 px-3 py-1 text-xs font-medium text-base-content/60">
          {row.plan}
        </span>
      ),
    },
    {
      key: "status",
      title: "Durum",
      render: (row) => (
        <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-base-300 bg-base-100 p-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="mb-2 text-sm font-medium text-primary">
              EduPulse Yönetim Paneli
            </p>

            <h1 className="max-w-xl text-3xl font-semibold tracking-tight">
              Okul yönetimini sade ve düzenli takip edin.
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-6 text-base-content/55">
              Okullar, öğretmenler, öğrenciler ve lisans durumları için temiz bir
              yönetim ekranı.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="btn btn-primary rounded-xl px-5">
              Okul Ekle
            </button>
            <button className="btn btn-ghost rounded-xl px-5">
              Raporlar
            </button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Okul"
          value="12"
          description="Kayıtlı okul"
          icon={<BuildingOffice2Icon className="h-5 w-5" />}
        />
        <StatCard
          title="Öğrenci"
          value="1.284"
          description="Aktif öğrenci"
          icon={<UserGroupIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Öğretmen"
          value="86"
          description="Aktif öğretmen"
          icon={<AcademicCapIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Durum"
          value="Aktif"
          description="Sistem çalışıyor"
          icon={<CheckCircleIcon className="h-5 w-5" />}
        />
      </div>

      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold tracking-tight">
            Okul Lisans Durumları
          </h2>
          <p className="text-sm text-base-content/45">
            Sistemdeki okulların güncel paket durumu
          </p>
        </div>

        <DataTable columns={columns} data={schools} />
      </div>
    </div>
  );
}

export default AdminDashboard;