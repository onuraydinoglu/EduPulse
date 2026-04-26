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
import Button from "../../../components/ui/Button";
import TeacherStudentReportTable from "../components/TeacherStudentReportTable";
import { mockDb } from "../../../data/mockData";

function TeacherReportsPage() {
  const teacherClass = {
    id: 1,
    className: "9-A",
  };

  const [studentSearch, setStudentSearch] = useState("");
  const [studentStatus, setStudentStatus] = useState("all");

  const students = useMemo(() => {
    return mockDb.students
      .filter((student) => student.classId === teacherClass.id)
      .map((student) => {
        const classItem = mockDb.classes.find(
          (classData) => classData.id === student.classId
        );

        const teacher = mockDb.teachers.find(
          (teacherData) => teacherData.id === classItem?.teacherId
        );

        const club = mockDb.clubs.find(
          (clubData) => clubData.id === student.clubId
        );

        const studentStatus =
          student.average >= 90
            ? "Çok Başarılı"
            : student.average >= 75
              ? "Başarılı"
              : student.average >= 60
                ? "Takip Edilmeli"
                : "Riskli";

        return {
          ...student,
          fullName: `${student.firstName} ${student.lastName}`,
          className: classItem?.name || "-",
          classTeacher: teacher?.fullName || "-",
          club: club?.name || "-",
          status: studentStatus,
          lessonAverage: student.lessonAverage ?? student.average,
          examAverage: student.examAverage ?? student.average,
          trialExamAverage: student.trialExamAverage ?? 0,
          projectCount: student.projectCount ?? 0,
          schoolRank: student.schoolRank || "-",
          teacherNote: student.teacherNote || "Öğretmen notu bulunmuyor.",
          lessons: student.lessons || [],
          trialExams: student.trialExams || [],
        };
      });
  }, []);

  const teacherClassStats = useMemo(() => {
    const studentCount = students.length;

    const average =
      studentCount > 0
        ? Math.round(
          students.reduce((total, student) => total + student.average, 0) /
          studentCount
        )
        : 0;

    const successCount = students.filter(
      (student) =>
        student.status === "Çok Başarılı" || student.status === "Başarılı"
    ).length;

    const successRate =
      studentCount > 0 ? Math.round((successCount / studentCount) * 100) : 0;

    return {
      studentCount,
      average,
      successRate,
    };
  }, [students]);

  const filteredStudents = useMemo(() => {
    const normalizedSearch = studentSearch.toLowerCase().trim();

    return students.filter((student) => {
      const matchesSearch =
        student.fullName.toLowerCase().includes(normalizedSearch) ||
        student.club.toLowerCase().includes(normalizedSearch) ||
        student.className.toLowerCase().includes(normalizedSearch) ||
        student.schoolNumber?.toLowerCase().includes(normalizedSearch) ||
        student.parentName?.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        studentStatus === "all" || student.status === studentStatus;

      return matchesSearch && matchesStatus;
    });
  }, [students, studentSearch, studentStatus]);

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
          icon={HomeModernIcon}
          description="Öğretmenin kendi sınıfı"
          color="primary"
        />

        <StatCard
          title="Toplam Öğrenci"
          value={teacherClassStats.studentCount}
          icon={UserGroupIcon}
          description="Sınıftaki öğrenci sayısı"
          color="info"
        />

        <StatCard
          title="Sınıf Ortalaması"
          value={`%${teacherClassStats.average}`}
          icon={ChartBarIcon}
          description="Ders başarı ortalaması"
          color="success"
        />

        <StatCard
          title="Başarı Oranı"
          value={`%${teacherClassStats.successRate}`}
          icon={CheckCircleIcon}
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
              placeholder="Öğrenci, kulüp, okul no veya veli ara..."
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

        <TeacherStudentReportTable
          students={filteredStudents}
          className={teacherClass.className}
        />
      </section>
    </div>
  );
}

export default TeacherReportsPage;