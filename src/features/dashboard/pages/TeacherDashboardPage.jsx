import {
  AcademicCapIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  HomeModernIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

import StatCard from "../../../components/ui/StatCard";
import DataTable from "../../../components/ui/DataTable";

function TeacherDashboardPage() {
  const students = [
    { id: 1, fullName: "Ali Yıldız", average: 84, examAverage: 78, status: "Başarılı" },
    { id: 2, fullName: "Ayşe Kaya", average: 67, examAverage: 61, status: "Takip Edilmeli" },
    { id: 3, fullName: "Mehmet Can", average: 92, examAverage: 89, status: "Çok Başarılı" },
    { id: 4, fullName: "Zeynep Kara", average: 48, examAverage: 42, status: "Riskli" },
  ];

  const getStatusClass = (status) => {
    if (status === "Çok Başarılı") return "bg-emerald-50 text-emerald-600";
    if (status === "Başarılı") return "bg-blue-50 text-blue-600";
    if (status === "Takip Edilmeli") return "bg-amber-50 text-amber-600";
    return "bg-rose-50 text-rose-600";
  };

  const columns = [
    {
      key: "fullName",
      title: "Öğrenci",
      render: (row) => (
        <p className="font-medium text-gray-900">{row.fullName}</p>
      ),
    },
    {
      key: "average",
      title: "Ders Ort.",
      render: (row) => (
        <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
          %{row.average}
        </span>
      ),
    },
    {
      key: "examAverage",
      title: "Sınav Ort.",
      render: (row) => (
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          %{row.examAverage}
        </span>
      ),
    },
    {
      key: "status",
      title: "Durum",
      render: (row) => (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
            row.status
          )}`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <section className="radius-card border border-gray-200 bg-white px-6 py-5">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Öğretmen Paneli
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950">
            Öğretmen Ana Sayfa
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Sorumlu olduğunuz sınıfın öğrenci ve başarı özetini takip edin
          </p>
        </div>
      </section>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Sorumlu Sınıf"
          value="9-A"
          icon={HomeModernIcon}
          description="Öğretmenin sınıfı"
          color="primary"
        />

        <StatCard
          title="Toplam Öğrenci"
          value="32"
          icon={UserGroupIcon}
          description="Sınıftaki öğrenci sayısı"
          color="info"
        />

        <StatCard
          title="Sınıf Ortalaması"
          value="%74"
          icon={ChartBarIcon}
          description="Ders başarı ortalaması"
          color="success"
        />

        <StatCard
          title="Takip Öğrencisi"
          value="2"
          icon={ExclamationTriangleIcon}
          description="Yakından takip gereken öğrenci"
          color="warning"
        />
      </div>

      <section className="radius-card overflow-hidden border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <AcademicCapIcon className="h-5 w-5 text-blue-600" />

            <h2 className="text-lg font-semibold tracking-tight text-gray-950">
              Sınıf Öğrenci Özeti
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Sorumlu olduğunuz sınıftaki öğrencilerin son durumu
          </p>
        </div>

        <DataTable columns={columns} data={students} />
      </section>
    </div>
  );
}

export default TeacherDashboardPage;