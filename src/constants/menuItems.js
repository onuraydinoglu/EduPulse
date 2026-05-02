import {
  HomeIcon,
  BuildingOfficeIcon,
  UsersIcon,
  AcademicCapIcon,
  BookOpenIcon,
  RectangleStackIcon,
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon,
  Squares2X2Icon,
  ChartBarIcon,
  RectangleGroupIcon,
  DocumentChartBarIcon,
  IdentificationIcon,
  UserGroupIcon,
  UserPlusIcon, // ✅ EKLENDİ
} from "@heroicons/react/24/outline";

export const menuItems = [
  {
    title: "Anasayfa",
    path: "/dashboard",
    icon: HomeIcon,
    roles: ["superadmin", "schooladmin", "teacher", "officer"],
  },

  {
    title: "Kullanıcılar",
    icon: UserGroupIcon,
    roles: ["schooladmin"],
    children: [
      {
        title: "Öğretmenler",
        path: "/dashboard/teachers",
        icon: UsersIcon,
        roles: ["schooladmin"],
      },
      {
        title: "Öğrenciler",
        path: "/dashboard/students",
        icon: AcademicCapIcon,
        roles: ["schooladmin"],
      },
      {
        title: "Memurlar",
        path: "/dashboard/officers",
        icon: IdentificationIcon,
        roles: ["schooladmin"],
      },
    ],
  },

  {
    title: "Akademik Yönetim",
    icon: RectangleStackIcon,
    roles: ["schooladmin", "officer", "teacher"],
    children: [
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
        title: "Ders Atamaları",
        path: "/dashboard/teacher-lessons",
        icon: AcademicCapIcon,
        roles: ["schooladmin"],
      },
    ],
  },

  {
    title: "Sınav Yönetimi",
    icon: ClipboardDocumentCheckIcon,
    roles: ["schooladmin", "teacher"],
    children: [
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
    ],
  },

  // ✅ BURASI ÖNEMLİ
  {
    title: "Sosyal Etkinlikler",
    icon: Squares2X2Icon,
    roles: ["schooladmin"],
    children: [
      {
        title: "Kulüpler",
        path: "/dashboard/clubs",
        icon: Squares2X2Icon,
        roles: ["schooladmin"],
      },
      {
        title: "Kulüp Üyeleri",
        path: "/dashboard/club-members",
        icon: UserPlusIcon,
        roles: ["schooladmin"],
      },
    ],
  },

  {
    title: "Raporlar",
    icon: ChartBarIcon,
    roles: ["schooladmin", "teacher"],
    children: [
      {
        title: "Müdür Raporları",
        path: "/dashboard/reports/principal",
        icon: ChartBarIcon,
        roles: ["schooladmin"],
      },
      {
        title: "Sınıf Raporu",
        path: "/dashboard/reports/teacher",
        icon: ChartBarIcon,
        roles: ["teacher"],
      },
    ],
  },

  {
    title: "Sistem",
    icon: BuildingOfficeIcon,
    roles: ["superadmin"],
    children: [
      {
        title: "Okullar",
        path: "/dashboard/schools",
        icon: BuildingOfficeIcon,
        roles: ["superadmin"],
      },
    ],
  },
];
