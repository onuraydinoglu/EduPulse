import {
  HomeIcon,
  BuildingOfficeIcon,
  UsersIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  Squares2X2Icon,
  ChartBarIcon,
  RectangleGroupIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";

export const menuItems = [
  {
    title: "Anasayfa",
    path: "/dashboard",
    icon: HomeIcon,
    roles: ["admin", "principal", "teacher"],
  },
  {
    title: "Okullar",
    path: "/dashboard/schools",
    icon: BuildingOfficeIcon,
    roles: ["admin"],
  },
  {
    title: "Öğretmenler",
    path: "/dashboard/teachers",
    icon: UsersIcon,
    roles: ["principal"],
  },
  {
    title: "Sınıf Raporu",
    path: "/dashboard/reports/teacher",
    icon: ChartBarIcon,
    roles: ["teacher"],
  },
  {
    title: "Sınıflar",
    path: "/dashboard/classes",
    icon: RectangleGroupIcon,
    roles: ["principal"],
  },
  {
    title: "Öğrenciler",
    path: "/dashboard/students",
    icon: AcademicCapIcon,
    roles: ["principal"],
  },
  {
    title: "Sınavlar",
    path: "/dashboard/exams",
    icon: ClipboardDocumentListIcon,
    roles: ["principal", "teacher"],
  },
  {
    title: "Deneme Sınavları",
    path: "/dashboard/trial-exams",
    icon: DocumentChartBarIcon,
    roles: ["principal", "teacher"],
  },
  {
    title: "Kulüpler",
    path: "/dashboard/clubs",
    icon: Squares2X2Icon,
    roles: ["principal"],
  },
  {
    title: "Müdür Raporları",
    path: "/dashboard/reports/principal",
    icon: ChartBarIcon,
    roles: ["principal"],
  },
];
