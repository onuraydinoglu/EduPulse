import {
    AcademicCapIcon,
    CheckCircleIcon,
    UserGroupIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";

import {
    getClubAdvisorTeacherId,
    getClubAdvisorTeacherName,
    getClubMemberCount,
    getClubName,
} from "../utils/clubFormatters";

export const clubPdfColumns = [
    {
        header: "#",
        accessor: "index",
    },
    {
        header: "Kulüp",
        accessor: getClubName,
    },
    {
        header: "Sorumlu Öğretmen",
        accessor: getClubAdvisorTeacherName,
    },
    {
        header: "Üye Sayısı",
        accessor: getClubMemberCount,
    },
];

export const getClubStats = (clubs = []) => {
    const totalMemberCount = clubs.reduce((total, club) => {
        return total + Number(getClubMemberCount(club) || 0);
    }, 0);

    const assignedTeacherCount = clubs.filter((club) => {
        return getClubAdvisorTeacherId(club);
    }).length;

    const activeClubCount = clubs.filter((club) => {
        return club.isActive !== false && club.IsActive !== false;
    }).length;

    return [
        {
            title: "Toplam Kulüp",
            value: clubs.length,
            description: "Sistemde kayıtlı kulüp",
            icon: UserGroupIcon,
            color: "primary",
        },
        {
            title: "Üye Sayısı",
            value: totalMemberCount,
            description: "Kulüplere bağlı toplam üye",
            icon: UsersIcon,
            color: "success",
        },
        {
            title: "Aktif Kulüp",
            value: activeClubCount,
            description: "Aktif durumda olan kulüp",
            icon: CheckCircleIcon,
            color: "warning",
        },
        {
            title: "Danışman Atanan",
            value: assignedTeacherCount,
            description: "Öğretmen atanmış kulüp",
            icon: AcademicCapIcon,
            color: "info",
        },
    ];
};

export const clubTableHeaders = [
    "Kulüp",
    "Sorumlu Öğretmen",
    "Üye Sayısı",
    "İşlemler",
];