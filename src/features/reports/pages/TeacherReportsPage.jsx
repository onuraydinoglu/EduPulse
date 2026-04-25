import { useMemo, useState } from "react";
import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  ChartBarIcon,
  CheckCircleIcon,
  HomeModernIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

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

  const getStatusClass = (status) => {
    if (status === "Çok Başarılı") return "bg-emerald-50 text-emerald-600";
    if (status === "Başarılı") return "bg-blue-50 text-blue-600";
    if (status === "Takip Edilmeli") return "bg-amber-50 text-amber-600";
    if (status === "Riskli") return "bg-rose-50 text-rose-600";
    return "bg-gray-100 text-gray-600";
  };

  const studentColumns = [
    {
      key: "fullName",
      title: "Öğrenci",
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.fullName}</p>
          <p className="text-xs text-gray-400">
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
          <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gradient-premium"
              style={{ width: `${row.average}%` }}
            />
          </div>

          <span className="text-sm font-semibold text-gray-700">
            %{row.average}
          </span>
        </div>
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
      key: "projectCount",
      title: "Proje",
      render: (row) => (
        <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
          {row.projectCount}
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
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Öğretmen Raporları
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950">
              Sınıf Performans Raporu
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Kendi sınıfınıza ait öğrenci ve başarı raporlarını takip edin
            </p>
          </div>

          <Button>
            <ArrowDownTrayIcon className="h-5 w-5" />
            {teacherClass.className} Raporu Dışa Aktar
          </Button>
        </div>
      </section>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Sorumlu Sınıf"
          value={teacherClass.className}
          icon={<HomeModernIcon className="h-5 w-5" />}
          description="Öğretmenin kendi sınıfı"
          color="primary"
        />

        <StatCard
          title="Toplam Öğrenci"
          value={teacherClass.studentCount}
          icon={<UserGroupIcon className="h-5 w-5" />}
          description="Sınıftaki öğrenci sayısı"
          color="info"
        />

        <StatCard
          title="Sınıf Ortalaması"
          value={`%${teacherClass.average}`}
          icon={<ChartBarIcon className="h-5 w-5" />}
          description="Ders başarı ortalaması"
          color="success"
        />

        <StatCard
          title="Başarı Oranı"
          value={`%${teacherClass.successRate}`}
          icon={<CheckCircleIcon className="h-5 w-5" />}
          description="Genel başarı yüzdesi"
          color="warning"
        />
      </div>

      <section className="radius-card overflow-hidden border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <AcademicCapIcon className="h-5 w-5 text-blue-600" />

              <h2 className="text-lg font-semibold tracking-tight text-gray-950">
                {teacherClass.className} Sınıfı Öğrenci Raporu
              </h2>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              Sorumlu olduğunuz sınıftaki öğrenci performansları
            </p>
          </div>

          <Button variant="outline" size="sm">
            {teacherClass.className} Veli Raporu Hazırla
          </Button>
        </div>

        <div className="flex flex-col gap-3 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              placeholder="Öğrenci veya kulüp ara..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <select
            value={studentStatus}
            onChange={(e) => setStudentStatus(e.target.value)}
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 md:w-56"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="Çok Başarılı">Çok Başarılı</option>
            <option value="Başarılı">Başarılı</option>
            <option value="Takip Edilmeli">Takip Edilmeli</option>
            <option value="Riskli">Riskli</option>
          </select>
        </div>

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
      </section>
    </div>
  );
}

export default TeacherReportsPage;