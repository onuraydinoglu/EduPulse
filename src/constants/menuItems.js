import {
  HomeIcon,
  BuildingOfficeIcon,
  UsersIcon,
  AcademicCapIcon,
  BookOpenIcon,
  RectangleStackIcon,
  Squares2X2Icon,
  ChartBarIcon,
  RectangleGroupIcon,
  IdentificationIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon
} from "@heroicons/react/24/outline";

export const menuItems = [
  {
    title: "Anasayfa",
    path: "/dashboard",
    icon: HomeIcon,
    roles: ["superadmin", "schooladmin", "teacher", "officer", "student"],
  },

  {
    title: "Kullanıcılar",
    icon: UserGroupIcon,
    roles: ["schooladmin", "officer"],
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
    roles: ["schooladmin", "officer"],
    children: [
      {
        title: "Dersler",
        path: "/dashboard/lessons",
        icon: BookOpenIcon,
        roles: ["schooladmin", "officer"],
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
    title: "Sınıflar",
    path: "/dashboard/classes",
    icon: RectangleGroupIcon,
    roles: ["schooladmin", "officer", "teacher"],
  },

  {
    title: "Sınavlarım",
    path: "/dashboard/student-exams",
    icon: ClipboardDocumentCheckIcon,
    roles: ["student"],
  },

  {
    title: "Deneme Sınavı",
    path: "/dashboard/trial-exams",
    icon: ChartBarIcon,
    roles: ["student"],
  },

  {
    title: "Kulüpler",
    path: "/dashboard/clubs",
    icon: Squares2X2Icon,
    roles: ["schooladmin", "officer", "teacher", "student"],
  },
  {
    title: "Etkinlikler",
    path: "/dashboard/events",
    icon: CalendarDaysIcon,
    roles: ["schooladmin", "officer", "teacher", "student"],
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