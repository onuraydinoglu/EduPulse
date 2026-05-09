import {
    AcademicCapIcon,
    CheckCircleIcon,
    ClipboardDocumentCheckIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";

import {
    getExamAverageLabel,
    getExamClassroomName,
    getExamLessonName,
    getExamStatusLabel,
    getExamStudentFullName,
} from "../utils/examFormatters";

export const examPdfColumns = [
    {
        header: "#",
        accessor: "index",
    },
    {
        header: "Öğrenci",
        accessor: getExamStudentFullName,
    },
    {
        header: "Sınıf",
        accessor: getExamClassroomName,
    },
    {
        header: "Ders",
        accessor: getExamLessonName,
    },
    {
        header: "Ortalama",
        accessor: getExamAverageLabel,
    },
    {
        header: "Durum",
        accessor: getExamStatusLabel,
    },
];

export const getExamStats = (exams = []) => {
    const activeCount = exams.filter((exam) => {
        return exam.isActive !== false && exam.IsActive !== false;
    }).length;

    const passiveCount = exams.length - activeCount;

    const passedCount = exams.filter((exam) => {
        const average = Number(exam.average ?? exam.Average ?? 0);
        return average >= 50;
    }).length;

    return [
        {
            title: "Toplam Not Kaydı",
            value: exams.length,
            description: "Sistemde kayıtlı not girişi",
            icon: ClipboardDocumentCheckIcon,
            color: "primary",
        },
        {
            title: "Aktif Kayıt",
            value: activeCount,
            description: "Aktif durumda olan notlar",
            icon: CheckCircleIcon,
            color: "success",
        },
        {
            title: "Pasif Kayıt",
            value: passiveCount,
            description: "Pasif durumda olan notlar",
            icon: XCircleIcon,
            color: "error",
        },
        {
            title: "Başarılı Öğrenci",
            value: passedCount,
            description: "Ortalaması 50 ve üzeri",
            icon: AcademicCapIcon,
            color: "info",
        },
    ];
};

export const examTableHeaders = [
    "Öğrenci",
    "Sınıf",
    "Ders",
    "Sınavlar",
    "Ortalama",
    "Durum",
    "İşlemler",
];

export const examHeaderIcon = ClipboardDocumentCheckIcon;