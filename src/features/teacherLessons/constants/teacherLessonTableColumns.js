import {
    AcademicCapIcon,
    BookOpenIcon,
    CheckCircleIcon,
    ClipboardDocumentListIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";

import {
    getTeacherLessonClassroomName,
    getTeacherLessonIsActive,
    getTeacherLessonLessonName,
    getTeacherLessonStatusLabel,
    getTeacherLessonTeacherName,
} from "../utils/teacherLessonFormatters";

export const teacherLessonPdfColumns = [
    {
        header: "#",
        accessor: "index",
    },
    {
        header: "Öğretmen",
        accessor: getTeacherLessonTeacherName,
    },
    {
        header: "Ders",
        accessor: getTeacherLessonLessonName,
    },
    {
        header: "Sınıf",
        accessor: getTeacherLessonClassroomName,
    },
    {
        header: "Durum",
        accessor: getTeacherLessonStatusLabel,
    },
];

export const getTeacherLessonStats = (teacherLessons = []) => {
    const activeCount = teacherLessons.filter((item) => {
        return getTeacherLessonIsActive(item);
    }).length;

    const passiveCount = teacherLessons.length - activeCount;

    const uniqueTeacherCount = new Set(
        teacherLessons
            .map((item) => item.teacherId || item.TeacherId)
            .filter(Boolean)
    ).size;

    return [
        {
            title: "Toplam Atama",
            value: teacherLessons.length,
            description: "Sistemde kayıtlı ders ataması",
            icon: ClipboardDocumentListIcon,
            color: "primary",
        },
        {
            title: "Aktif Atama",
            value: activeCount,
            description: "Aktif durumda olan atama",
            icon: CheckCircleIcon,
            color: "success",
        },
        {
            title: "Pasif Atama",
            value: passiveCount,
            description: "Pasif durumda olan atama",
            icon: XCircleIcon,
            color: "error",
        },
        {
            title: "Atanan Öğretmen",
            value: uniqueTeacherCount,
            description: "Ders ataması bulunan öğretmen",
            icon: AcademicCapIcon,
            color: "warning",
        },
    ];
};

export const teacherLessonTableHeaders = [
    "Öğretmen",
    "Ders",
    "Sınıf",
    "Durum",
    "İşlemler",
];

export const teacherLessonHeaderIcon = BookOpenIcon;