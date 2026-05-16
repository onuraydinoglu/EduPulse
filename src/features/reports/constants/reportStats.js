import {
    AcademicCapIcon,
    BuildingOffice2Icon,
    ChartBarIcon,
    CheckCircleIcon,
    HomeModernIcon,
    UserGroupIcon,
    UserPlusIcon,
} from "@heroicons/react/24/outline";

export const getPrincipalReportStats = (schoolInfo) => [
    {
        title: "Toplam Öğretmen",
        value: schoolInfo.teacherCount,
        description: "Okuldaki öğretmen sayısı",
        color: "primary",
        icon: UserGroupIcon,
    },
    {
        title: "Toplam Öğrenci",
        value: schoolInfo.studentCount,
        description: "Okuldaki öğrenci sayısı",
        color: "info",
        icon: AcademicCapIcon,
    },
    {
        title: "Aktif Sınıf",
        value: schoolInfo.classCount,
        description: "Takip edilen sınıf sayısı",
        color: "success",
        icon: BuildingOffice2Icon,
    },
    {
        title: "Kulüpler",
        value: schoolInfo.clubCount,
        description: "Okuldaki aktif kulüp sayısı",
        color: "warning",
        icon: UserPlusIcon,
    },
];

export const getTeacherReportStats = (teacherClass, teacherClassStats) => [
    {
        title: "Sorumlu Sınıf",
        value: teacherClass.className,
        icon: HomeModernIcon,
        description: "Öğretmenin kendi sınıfı",
        color: "primary",
    },
    {
        title: "Toplam Öğrenci",
        value: teacherClassStats.studentCount,
        icon: UserGroupIcon,
        description: "Sınıftaki öğrenci sayısı",
        color: "info",
    },
    {
        title: "Sınıf Ortalaması",
        value: `%${teacherClassStats.average}`,
        icon: ChartBarIcon,
        description: "Ders başarı ortalaması",
        color: "success",
    },
    {
        title: "Başarı Oranı",
        value: `%${teacherClassStats.successRate}`,
        icon: CheckCircleIcon,
        description: "Genel başarı yüzdesi",
        color: "warning",
    },
];