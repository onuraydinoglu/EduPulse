import {
    UserGroupIcon,
    AcademicCapIcon,
    CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";

import {
    getClubAdvisorTeacherName,
    getClubIsActive,
    getClubMemberCount,
    getClubName,
} from "../utils/clubFormatters";

export const getClubStats = (clubs = []) => {
    const activeCount = clubs.filter((club) => getClubIsActive(club)).length;
    const passiveCount = clubs.filter((club) => !getClubIsActive(club)).length;
    const totalMembers = clubs.reduce(
        (total, club) => total + Number(getClubMemberCount(club) || 0),
        0,
    );

    return [
        {
            title: "Toplam Kulüp",
            value: clubs.length,
            icon: UserGroupIcon,
            color: "blue",
        },
        {
            title: "Aktif Kulüp",
            value: activeCount,
            icon: CheckCircleIcon,
            color: "green",
        },
        {
            title: "Pasif Kulüp",
            value: passiveCount,
            icon: XCircleIcon,
            color: "red",
        },
        {
            title: "Toplam Üye",
            value: totalMembers,
            icon: AcademicCapIcon,
            color: "purple",
        },
    ];
};

export const clubPdfColumns = [
    {
        header: "Kulüp",
        accessor: (club) => getClubName(club),
    },
    {
        header: "Sorumlu Öğretmen",
        accessor: (club) => getClubAdvisorTeacherName(club),
    },
    {
        header: "Üye Sayısı",
        accessor: (club) => getClubMemberCount(club),
    },
    {
        header: "Durum",
        accessor: (club) => (getClubIsActive(club) ? "Aktif" : "Pasif"),
    },
];