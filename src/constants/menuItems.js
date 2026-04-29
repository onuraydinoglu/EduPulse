import {
  HomeIcon,
  BuildingOfficeIcon,
  UsersIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  Squares2X2Icon,
  ChartBarIcon,
  RectangleGroupIcon,
  DocumentChartBarIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";

export const menuItems = [
  {
    title: "Anasayfa",
    path: "/dashboard",
    icon: HomeIcon,
    roles: ["superadmin", "schooladmin", "teacher", "officer"],
  },
  {
    title: "Okullar",
    path: "/dashboard/schools",
    icon: BuildingOfficeIcon,
    roles: ["superadmin"],
  },
  {
    title: "Öğretmenler",
    path: "/dashboard/teachers",
    icon: UsersIcon,
    roles: ["schooladmin"],
  },
  {
    title: "Memurlar",
    path: "/dashboard/officers",
    icon: IdentificationIcon,
    roles: ["schooladmin"],
  },
  {
    title: "Sınıf Raporu",
    path: "/dashboard/reports/teacher",
    icon: ChartBarIcon,
    roles: ["teacher"],
  },
  {
    title: "Dersler",
    path: "/dashboard/lessons",
    icon: BookOpenIcon,
    roles: ["schooladmin", "officer", "teacher"],
  },
  {
    title: "Sınıflar",
    path: "/dashboard/classes",
    icon: RectangleGroupIcon,
    roles: ["schooladmin"],
  },
  {
    title: "Öğrenciler",
    path: "/dashboard/students",
    icon: AcademicCapIcon,
    roles: ["schooladmin"],
  },
  {
    title: "Sınavlar",
    path: "/dashboard/exams",
    icon: ClipboardDocumentListIcon,
    roles: ["schooladmin", "teacher"],
  },
  {
    title: "Deneme Sınavları",
    path: "/dashboard/trial-exams",
    icon: DocumentChartBarIcon,
    roles: ["schooladmin", "teacher"],
  },
  {
    title: "Kulüpler",
    path: "/dashboard/clubs",
    icon: Squares2X2Icon,
    roles: ["schooladmin"],
  },
  {
    title: "Müdür Raporları",
    path: "/dashboard/reports/principal",
    icon: ChartBarIcon,
    roles: ["schooladmin"],
  },
];
