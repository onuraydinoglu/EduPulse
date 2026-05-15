import {
    AcademicCapIcon,
    BookOpenIcon,
    ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

import {
    getTeacherLessonClassroomName,
    getTeacherLessonLessonName,
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
];

export const getTeacherLessonStats = (teacherLessons = []) => {
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
    "İşlemler",
];

export const teacherLessonHeaderIcon = BookOpenIcon;